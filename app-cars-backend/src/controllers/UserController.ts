import { Response, Request } from 'express';
import model from '../models/model';
import authController from './AuthController';
import emailController from './EmailController';


const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await model.User.find().select('email phoneNumber names');
        if (!users) {
            res.status(404).json({ message: 'No users found' });
            return
        }
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching users' });
    }
}

const getUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const user = await model.User.findById(userId).select('names email phoneNumber');
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching user' });
    }
}


const getCurrentUser = async (req: Request, res: Response) => {
    try {
        const { userId } = res.locals
        const user = await model.User.findById(userId).select('names email phoneNumber');
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return
        }
        const isMechanic = await model.GarageStaff.findOne({ details: user._id }).select('-details').populate('garage')
        const isGarageOwner = await model.GarageOwner.findOne({ details: user._id }).select('-details').populate('garage')
        if (isGarageOwner) {
            res.status(200).json({ ...user.toObject(), ...isGarageOwner.toObject() });
        }
        if (isMechanic) {
            res.status(200).json({ ...user.toObject(), ...isMechanic.toObject() });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching user' });
    }
}

const updateUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const updates = req.body;
        const user = await model.User.findByIdAndUpdate(userId, updates, { new: true });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating user' });
    }
}

const deleteUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const user = await model.User.findByIdAndDelete(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting user' });
    }
}



const getResetCode = async (req: Request, res: Response) => {
    try {
        const { email } = req.body as { email: string }
        const userData = await model.User.findOne({ email: email }).select('email names')
        if (!userData) {
            res.status(404).json({ message: 'Invalid user' });
            return
        }

        const resetCode =  authController.generateResetCode(userData._id.toString())

        const emailObject = {
            name: userData.names || '',
            email: userData.email || '',
            message: `This is reset code ${resetCode}`,
            title: 'Reset Code'
        }

        await model.User.findByIdAndUpdate(userData._id, { recoverMode: true })
        await emailController.sendEmail(emailObject)
        res.status(200).json({ message: 'Reset code sent to your email' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Error resetting password" })
    }
}



export default {
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    getResetCode,
    getCurrentUser
}