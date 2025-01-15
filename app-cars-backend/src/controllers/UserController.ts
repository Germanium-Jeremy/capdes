

import { Response, Request } from 'express';
import model from '../models/model';

const getUsers = async (req: Request, res: Response) => {

    try {
        const users = await model.User.find().select('email address phoneNumber names');
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching users' });
    }
}

const getMechanics = async (req: Request, res: Response) => {
    try {
        const mechanics = await model.GarageStaff
            .find()
            .select('details garage')
            .populate([{
                path: 'details',
                select: 'email address phoneNumber names -_id',
                model: 'User'
            },
            {
                path: 'garage',
                select: 'garageName owner location tel license registrationProof workingTime',
                model: 'Garage'
            }])
        res.status(200).json(mechanics);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching mechanics' });
    }
}

const getGarages = async (req: Request, res: Response) => {
    try {
        const garages = await model.Garage.find()
            .select('garageName owner location tel license registrationProof workingTime')
            .populate({
                path: 'owner',
                select: 'names email phoneNumber',
                model: 'User'
            })
        res.status(200).json(garages)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error fetching garages' })
    }
}

export default {
    getUsers,
    getMechanics,
    getGarages
};