import { Request, Response } from "express"
import model from "../models/model"


const getMechanics = async (req: Request, res: Response) => {
    try {
        const mechanics = await model.GarageStaff
            .find()
            .select('details garage')
            .populate([
                { path: 'details', select: 'email phoneNumber names', model: 'User' },
                { path: 'garage', select: 'garageName owner location', model: 'Garage' }
            ])

        if (!mechanics) {
            res.status(404).json({ message: 'No mechanics found' })
            return
        }
        res.status(200).json(mechanics)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error fetching mechanics' })
    }
}

const getMechanic = async (req: Request, res: Response) => {
    try {
        const { mechanicId } = req.params
        const mechanic = await model.GarageStaff.findById(mechanicId)
            .select('details garage')
            .populate([
                { path: 'details', select: 'email phoneNumber names', model: 'User' },
                { path: 'garage', select: 'garageName owner location', model: 'Garage' }
            ])
        if (!mechanic) {
            res.status(404).json({ message: 'Mechanic not found' })
            return
        }
        res.status(200).json(mechanic)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error fetching mechanic' })
    }
}


const updateMechanic = async (req: Request, res: Response) => {
    try {
        const { mechanicId } = req.params
        const updates = req.body
        const mechanic = await model.GarageStaff.findByIdAndUpdate(mechanicId, updates, { new: true })
        if (!mechanic) return res.status(404).json({ message: 'Mechanic not found' })
        res.status(200).json(mechanic)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error updating mechanic' })
    }
}

const deleteMechanic = async (req: Request, res: Response) => {
    try {
        const { mechanicId } = req.params
        const mechanic = await model.GarageStaff.findByIdAndDelete(mechanicId)
        if (!mechanic) return res.status(404).json({ message: 'Mechanic not found' })
        res.status(200).json({ message: 'Mechanic deleted successfully' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error deleting mechanic' })
    }
}

export default {
    getMechanics,
    getMechanic,
    updateMechanic,
    deleteMechanic,
}