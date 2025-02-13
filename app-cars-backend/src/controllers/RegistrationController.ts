import { Request, Response } from "express";
import validator from '../validator/validator'
import model from '../models/model'
import authController from './AuthController';
import { GoogleUser } from "../interfaces/UserInterfaces";


const signUp = async (req: Request, res: Response) => {
    try {
        const { error, value } = validator.regularUserSchema.validate(req.body)
        if (error) {
            res.status(400).json({ message: error.message })
            return
        }

        const { names, email, password, phoneNumber } = value
        const isRegistered = await model.User.findOne({ email: email });
        if (isRegistered) {
            res.status(400).json({ message: 'Account already exists' })
            return
        }

        const hashedPassword = await authController.hashPassword(password)

        const user = new model.User({ names, email, password: hashedPassword, phoneNumber })
        await user.save()
        res.status(200).json({ message: 'signup success', userId: user.toObject()._id })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error })
    }
}

const registerGoogleUser = async (req: Request, res: Response) => {
    try {
        const { error, value } = validator.googleUserSchema.validate(req.body)
        if (error) {
            res.status(400).json({ message: error.message })
            return
        }

        const userData: GoogleUser = value
        const isRegistered = await model.GoogleUser.findOne({ googleId: userData.googleId });
        if (isRegistered) {
            res.status(400).json({ message: 'Account already exists' })
            return
        }

        const user = new model.GoogleUser(userData)
        await user.save()
        res.status(200).json({ message: 'signup success', userId: user.toObject()._id })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error })
    }
}

const registerMechanic = async (req: Request, res: Response) => {
    try {
        const { error, value } = validator.mechanicSchema.validate(req.body)
        if (error) {
            res.status(400).json({ message: error.message })
            return
        }
        const { garageId, userId } = value

        const doesGarageExist = await model.Garage.findById(garageId)
        if (!doesGarageExist) {
            res.status(400).json({ message: 'Garage does not exist ' })
            return
        }

        const mechanic = new model.GarageStaff({
            details: userId,
            garage: garageId
        })
        await mechanic.save()
        await model.Garage.findByIdAndUpdate(garageId, { $addToSet: { waitList: userId } })

        res.status(200).json({ message: 'Registration successfull' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error })
    }
}


const registerGarage = async (req: Request, res: Response) => {
    try {
        const { error, value } = validator.garageSchema.validate(req.body)
        if (error) {
            res.status(400).json({ message: error.message })
            return
        }

        const { owner, garageName, location, tel, license, registrationProof, workingTime } = value

        const isRegistered = await model.Garage.findOne({ name: value.name }).select('name')
        if (isRegistered) {
            res.status(400).json({ message: 'Garage already exists' })
            return
        }

        const newGarage = new model.Garage({
            garageName,
            owner,
            location,
            tel,
            license,
            registrationProof,
            workingTime
        })
        await newGarage.save()
        const newGarageStaff = new model.GarageOwner({
            details: owner,
            garage: newGarage._id,
        })
        await newGarageStaff.save()
        res.status(200).json({ message: newGarage._id })

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'internal server error' })
    }
}

export default {
    signUp,
    registerMechanic,
    registerGarage,
    registerGoogleUser
}
