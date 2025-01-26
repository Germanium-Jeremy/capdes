import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import model from '../models/model';
import bcrypt from 'bcrypt'

const refreshToken = (id: string): string => {
    return jwt.sign({ id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
}

const generateResetToken = (id: string): string => {
    return jwt.sign({ id }, process.env.JWT_SECRET as string, { expiresIn: '0.5h' })
}

const generateResetCode = async (userId: string) => {
    const salt = await bcrypt.genSalt(100)
    const result = await bcrypt.hash(userId, salt)
    const resetCode = result.slice(0, 5)
    return resetCode
}

const hashPassword = async (password: string): Promise<string> => {
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
            res.locals = { userId: decodedToken?.id }
            next();
        });
    } catch (error: any) {
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

        const user = await model.User.findOne({ email }).select('password') as unknown as { email: string, password: string, _id: string }
        if (!user) {
            res.status(401).json({ message: 'Invalid email or password' });
            return
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Incorrect password' });
            return
        }

        const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '7d' });
        res.status(200).json({ message: 'Login successful', accessToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}


const resetCode = async (req: Request, res: Response) => {
    try {
        const userId = res.locals.userId
        const { oldPassword, newPassword } = req.body as { oldPassword: string, newPassword: string }

        if (!oldPassword || !newPassword) {
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

        const isOldPasswordTrue = await bcrypt.compare(oldPassword, userData.password)
        if (!isOldPasswordTrue) {
            res.status(401).json({ message: 'Password incorrect' })
            return
        }

        if (oldPassword === newPassword) {
            res.status(400).json({ message: 'Old password and new password cannot be the same' })
            return
        }

        const newPassWordToBeSaved = await hashPassword(newPassword)
        await model.User.findByIdAndUpdate(userId, { password: newPassWordToBeSaved })

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

        res.status(200).json({ message: 'Reset code correct' })
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
    resetCode,
    checkResetCode,
    checkResetToken,
}