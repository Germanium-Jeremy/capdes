import jwt from 'jsonwebtoken';
import { Request, Response } from "express";
import validator from '../schema/schema'
import Tables from '../models/model'
import bcrypt from 'bcrypt'
import nodemailer from 'nodemailer'

const JWT_SECRET = process.env.JWT_SECRET as string

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASS,
    },
    debug: true,
    logger: true
})




const testing = async (): Promise<void> => {
    try {
        const info = await transporter.sendMail({
            from: '"Wilson Mwesigwa" bugiriwilson651@gmail.com', // sender address
            to: "bugiriwilson651@gmail.com", // recipient(s)
            subject: "Hello from Gmail", // subject line
            text: "Hello world!", // plain text
            html: "<b>Hello world! this is car-apps-</b>", // HTML body
        });
        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};


const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    return hash
}

const generateJWT = (id: string) => {
    const token = jwt.sign({id}, JWT_SECRET , { expiresIn: "7d" })
    return token
}


const signUp = async (req: Request, res: Response): Promise<void> => {
    try {
        const { error, value } = validator.registrationSchema.validate(req.body)
        if (error) {
            res.status(400).json({ message: error.message })
            return
        }
        const { names, email, password, phoneNumber } = value
        const isRegistered = await Tables.User.findOne({ email: email });
        if (isRegistered) {
            res.status(400).json({ message: 'user already exists' })
            return
        }

        const hashedPassword = await hashPassword(password)
        const user = new Tables.User({ names, email, password: hashedPassword, phoneNumber, role: 'user' })
        await user.save()
        res.status(200).json({ message: 'signup success' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error })
    }
}

const registerMechanic = async (req: Request, res: Response) => {
    try {
        const { error, value } = validator.garageStaffSchema.validate(req.body)
        if (error) {
            res.status(400).json({ message: error.message })
            return
        }
        const { companyId, whatsappNumber, userId } = value

        const mechanic = new Tables.Mechanic({ details: userId, garage: companyId, whatsappNumber })
        await mechanic.save()
        await Tables.User.findByIdAndUpdate(userId, { role: 'mechanic' })

        res.status(200).json({ message: 'signup success' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error })
    }
}

const registerGarageOwner = async (req: Request, res: Response) => {
    try {
        const { error, value } = validator.garageStaffSchema.validate(req.body)
        if (error) {
            res.status(400).json({ message: error.message })
            return
        }
        const { companyId, whatsappNumber, userId } = value

        const mechanic = new Tables.Mechanic({ details: userId, garage: companyId, whatsappNumber })
        await mechanic.save()
        await Tables.User.findByIdAndUpdate(userId, { role: 'owner' })

        res.status(200).json({ message: 'signup success' })
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
        const { name } = value

        const isRegistered = await Tables.Garage.findOne({ name: name }).select('name')
        if (isRegistered) {
            res.status(400).json({ message: 'Garage already exists' })
            return
        }
        const newGarage = new Tables.Garage(value)
        await newGarage.save()

        res.status(200).json({ message: newGarage._id })

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'internal server error' })
    }
}

const signIn = async (req: Request, res: Response) => {
    try {
        const { error, value } = validator.signInSchema.validate(req.body)
        if (error) {
            res.status(400).json({ message: error.message })
            return
        }
        const { email, password } = value
        const isRegistered = await Tables.User.findOne({ email: email }).select('id password')
        if (!isRegistered) {
            res.status(400).json({ message: 'invalid email or password' })
            return
        }
        const isAuthorized = await bcrypt.compare(password, isRegistered?.password || '')
        if (!isAuthorized) {
            res.status(400).json({ message: 'invalid email or password' })
            return
        }
        const token = generateJWT(isRegistered?.id)
        res.status(200).json({ token })

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'internal server error'+JWT_SECRET })
    }
}

export default {
    testing,
    signUp,
    registerMechanic,
    registerGarageOwner,
    registerGarage,
    signIn
}
