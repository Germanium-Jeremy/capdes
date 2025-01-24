import { Response, Request } from 'express';
import model from '../models/model';


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

export default {
    getUsers,
    getUser,
    updateUser,
    deleteUser,
};
