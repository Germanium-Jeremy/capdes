import { Request, Response } from 'express'
import emailController from './EmailController'


const testEmail = async (req: Request, res: Response) => {
    try {
        const testEmail = {
            name: "test",
            email: "wigothehacker@gmail.com",
            message: "This is a test email",
            title: 'This is a reset code'
        }
        await emailController.sendEmail(testEmail)
        res.status(200).json({ message: "Email sent successfully" })

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Error sending email" })

    }
}

export default {
    testEmail

}