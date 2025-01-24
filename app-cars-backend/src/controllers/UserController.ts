import { Response, Request } from 'express';
import model from '../models/model';
import authController from './AuthController';


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

const updateUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const updates = req.body;
        const user = await model.User.findByIdAndUpdate(userId, updates, { new: true });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
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
        const userData = await model.User.findOne({ email: email }).select(' email ')
        if (!userData) {
            res.status(404).json({ message: 'Invalid user' });
            return
        }

        const resetCode = await authController.generateResetCode(userData._id.toString())
        res.status(200).json({ resetCode: resetCode })

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Error resetting password" })
    }
}

const checkResetCode = async (req: Request, res: Response) => {
    try {
        res.status(200).json({})
    } catch (error) {

    }
}

const resetPassword = async (req: Request, res: Response) => {
    try {


    } catch (error) {

    }
}

export default {
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    resetPassword,
};
