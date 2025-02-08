import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import model from '../models/model';
import crypto from 'crypto'
import bcrypt from 'bcrypt'

const refreshToken = (id: string): string => jwt.sign({ id }, process.env.JWT_SECRET as string, { expiresIn: '1h' })
const generateResetToken = (id: string) => jwt.sign({ id }, process.env.JWT_SECRET as string, { expiresIn: '0.5h' })


const generateResetCode = (userId: string) => {
    const randomValue = crypto.randomBytes(16).toString('hex')
    const dynamicInput = userId + randomValue;
    const hash = crypto.createHash('sha256').update(dynamicInput).digest('hex')
    const resetCode = hash.slice(0, 6)
    return resetCode.toUpperCase()
};

const hashPassword = async (password: string)=> {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    return hash
}

const checkToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.headers['token'] as string | undefined;
        if (!accessToken) {
            res.status(401).json({ message: 'Unauthorized: Access token is missing' });
            return
        }

        const decodedToken = jwt.decode(accessToken) as { id: string } | null;
        if (!decodedToken || !decodedToken.id) {
            res.status(401).json({ message: 'Unauthorized: Invalid token' });
            return
        }

        jwt.verify(accessToken, process.env.JWT_SECRET as string, (err, user) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    const newToken = refreshToken(decodedToken.id);
                    res.status(401).json({ message: 'Token expired', newToken });
                    return
                }
                res.status(403).json({ message: 'Forbidden: Invalid token' });
                return
            }
            res.locals = { userId: decodedToken.id };
            next()
        })
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
        return
    }
}

const checkResetToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const resetToken = req.headers['resetoken'] as unknown as string;
        if (!resetToken) {
            res.status(401).json({ message: 'Reset token is required' });
        }

        const decodedToken = jwt.decode(resetToken) as { id: string } | null;
        if (!decodedToken || !decodedToken.id) {
            res.status(401).json({ message: 'Unauthorized: Invalid token' });
            return
        }

        jwt.verify(resetToken, process.env.JWT_SECRET as string, (err, user) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    res.status(400).json({ message: 'Token expired request new reset code' })
                    return
                }
                res.status(403).json({ message: 'Forbidden: Invalid token' })
                return
            }
            res.locals = { userId: decodedToken.id }
            next()
        })
    } catch (error) {
        console.error(error);
        return
    }

}

const checkUser = async (req: Request, res: Response) => {
    try {
        const { userId } = res.locals.user
        const user = await model.User.findById(userId).select('_id')
        if (!user) {
            res.status(404).json({ message: 'User not found' })
            return
        }
        res.status(200).json({ message: 'User found' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error' })
    }
}

const signIn = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body as { email: string, password: string };

        if (!email || !password) {
            res.status(400).json({ message: 'Email and password are required' });
            return
        }

        const user = await model.User.findOne({ email }).select('password recoverMode') as unknown as { email: string, password: string, _id: string, recoverMode: boolean }
        if (!user) {
            res.status(401).json({ message: 'Invalid email or password' });
            return
        }
        if (user.recoverMode) {
            res.status(400).json({ message: 'Account in recovery mode' })
            return
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Incorrect password' });
            return
        }

        let role = 'user'
        const isMechanic = await model.GarageStaff.findOne({ details: user._id }).select('details')
        const isGarageOwner = await model.GarageOwner.findOne({ details: user._id }).select('details')
        if (isGarageOwner) role = 'garageOwner'
        if (isMechanic) role = 'mechanic'
        const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '7d' });
        res.status(200).json({ message: 'Login successful', accessToken, role });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}


const resetPassword = async (req: Request, res: Response) => {
    try {
        const userId = res.locals.userId
        const { newPassword } = req.body as { newPassword: string }

        if (!newPassword) {
            res.status(400).json({ message: 'Old password and new password are required' })
            return
        }

        const userData = await model.User.findById(userId).select('password recoverMode')
        if (!userData) {
            res.status(400).json({ message: 'User is required' })
            return
        }

        const isUserInRecovery = userData.toObject().recoverMode
        if (!isUserInRecovery) {
            res.status(400).json({ message: 'Account not in recovery mode' })
            return
        }

        if (!userData.password) {
            res.status(404).json({ message: 'User not found' })
            return
        }

        const newPassWordToBeSaved = await hashPassword(newPassword)
        await model.User.findByIdAndUpdate(userId, { password: newPassWordToBeSaved, recoverMode: false })

        res.status(200).json({ message: 'Password saved' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Password not saved' })
    }
}

const checkResetCode = async (req: Request, res: Response) => {
    try {
        const userId = res.locals.userId
        const { resetCode } = req.body as { resetCode: string }

        if (!resetCode) {
            res.status(400).json({ message: 'Reset code is required' })
            return
        }

        const findUser = await model.User.findById(userId)
        if (!findUser) {
            res.status(400).json({ message: 'User is required' })
            return
        }

        const isUserInRecovery = findUser.toObject().recoverMode
        if (!isUserInRecovery) {
            res.status(400).json({ message: 'Account not in recovery mode' })
            return
        }

        const isResetCodePresent = await model.ResetCode.findOne({ userId: userId })
        if (!isResetCodePresent) {
            res.status(404).json({ message: 'Reset code not found' })
            return
        }

        const isResetCodeTrue = resetCode === isResetCodePresent.code
        if (!isResetCodeTrue) {
            res.status(401).json({ message: 'Reset code incorrect' })
            return
        }
        await model.User.findByIdAndUpdate(userId, { password: 'null' })
        const resetToken = generateResetToken(userId)

        res.status(200).json({ message: 'Reset code correct', resetToken })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Reset code not correct' })
    }
}

export default {
    checkToken,
    hashPassword,
    checkUser,
    refreshToken,
    signIn,
    generateResetCode,
    resetPassword,
    checkResetCode,
    checkResetToken,
    generateResetToken
}