import { Response, Request } from 'express'
import model from '../models/model'

// GARAGES
const getGarages = async (req: Request, res: Response) => {
    try {
        const garages = await model.Garage.find()
            .select('garageName owner location tel license registrationProof workingTime')
            .populate({
                path: 'owner',
                select: 'names email phoneNumber',
                model: 'User'
            })

        if (!garages) {
            res.status(404).json({ message: 'No garages found' })
            return
        }
        res.status(200).json(garages)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error fetching garages' })
    }
}

const getGarage = async (req: Request, res: Response) => {
    try {
        const { garageId } = req.params
        const garage = await model.Garage.findById(garageId)
            .select('garageName owner location tel license registrationProof workingTime')
            .populate({
                path: 'owner',
                select: 'names email phoneNumber',
                model: 'User'
            })

        if (!garage) {
            res.status(404).json({ message: 'Garage not found' })
            return
        }

        res.status(200).json(garage)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error fetching garage' })
    }
}

const updateGarage = async (req: Request, res: Response) => {
    try {
        const { garageId } = req.params
        const updates = req.body
        const garage = await model.Garage.findByIdAndUpdate(garageId, updates, { new: true })
        if (!garage) return res.status(404).json({ message: 'Garage not found' })
        res.status(200).json(garage)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error updating garage' })
    }
}

const deleteGarage = async (req: Request, res: Response) => {
    try {
        const { garageId } = req.params
        const garage = await model.Garage.findByIdAndDelete(garageId)
        if (!garage) return res.status(404).json({ message: 'Garage not found' })
        res.status(200).json({ message: 'Garage deleted successfully' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error deleting garage' })
    }
}


export default {
    getGarages,
    updateGarage,
    deleteGarage,
    getGarage
}