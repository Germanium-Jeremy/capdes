import { Request, Response } from "express"
import validator from "../validator/validator"
import model from "../models/model"


const saveHelpSupport = async (req: Request, res: Response) => {
    try {
        const userId = res.locals.userId
        const { error, value } = validator.helpSupportSchema.validate(req.body)
        if (error) {
            res.status(400).json({ message: error.details })
            return
        }
        const { title, type, body } = value

        const newDataToSave = new model.HelpSupport({
            title,
            type,
            body,
            sender: userId
        })
        await newDataToSave.save()

        res.status(200).json({ message: "Problem saved successfully" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Error saving problem" })
    }
}

export default {
    saveHelpSupport
}