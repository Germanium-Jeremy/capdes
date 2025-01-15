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
};

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
};

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
};

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
};

// MECHANICS
const getMechanics = async (req: Request, res: Response) => {
    try {
        const mechanics = await model.GarageStaff
            .find()
            .select('details garage')
            .populate([
                { path: 'details', select: 'email phoneNumber names', model: 'User' },
                { path: 'garage', select: 'garageName owner location', model: 'Garage' }
            ]);
        if (!mechanics) {
            res.status(404).json({ message: 'No mechanics found' });
            return
        }
        res.status(200).json(mechanics);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching mechanics' });
    }
};

const getMechanic = async (req: Request, res: Response) => {
    try {
        const { mechanicId } = req.params;
        const mechanic = await model.GarageStaff.findById(mechanicId)
            .select('details garage')
            .populate([
                { path: 'details', select: 'email phoneNumber names', model: 'User' },
                { path: 'garage', select: 'garageName owner location', model: 'Garage' }
            ]);
        if (!mechanic) {
            res.status(404).json({ message: 'Mechanic not found' });
            return
        }
        res.status(200).json(mechanic);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching mechanic' });
    }
}


const updateMechanic = async (req: Request, res: Response) => {
    try {
        const { mechanicId } = req.params;
        const updates = req.body;
        const mechanic = await model.GarageStaff.findByIdAndUpdate(mechanicId, updates, { new: true });
        if (!mechanic) return res.status(404).json({ message: 'Mechanic not found' });
        res.status(200).json(mechanic);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating mechanic' });
    }
};

const deleteMechanic = async (req: Request, res: Response) => {
    try {
        const { mechanicId } = req.params;
        const mechanic = await model.GarageStaff.findByIdAndDelete(mechanicId);
        if (!mechanic) return res.status(404).json({ message: 'Mechanic not found' });
        res.status(200).json({ message: 'Mechanic deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting mechanic' });
    }
};

// GARAGES
const getGarages = async (req: Request, res: Response) => {
    try {
        const garages = await model.Garage.find()
            .select('garageName owner location tel license registrationProof workingTime')
            .populate({
                path: 'owner',
                select: 'names email phoneNumber',
                model: 'User'
            });
        if (!garages) {
            res.status(404).json({ message: 'No garages found' });
            return
        }
        res.status(200).json(garages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching garages' });
    }
};

const updateGarage = async (req: Request, res: Response) => {
    try {
        const { garageId } = req.params;
        const updates = req.body;
        const garage = await model.Garage.findByIdAndUpdate(garageId, updates, { new: true });
        if (!garage) return res.status(404).json({ message: 'Garage not found' });
        res.status(200).json(garage);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating garage' });
    }
};

const deleteGarage = async (req: Request, res: Response) => {
    try {
        const { garageId } = req.params;
        const garage = await model.Garage.findByIdAndDelete(garageId);
        if (!garage) return res.status(404).json({ message: 'Garage not found' });
        res.status(200).json({ message: 'Garage deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting garage' });
    }
};

export default {
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    getMechanics,
    getMechanic,
    updateMechanic,
    deleteMechanic,
    getGarages,
    updateGarage,
    deleteGarage,
};
