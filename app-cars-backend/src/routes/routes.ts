import { Request, Response, Router } from "express";
import userController from '../controllers/RegistrationController'

const router = Router()

//basic creating
router.post('/signUp', userController.signUp)
router.post('/registerMechanic', userController.registerMechanic)
router.post('/registerGarage', userController.registerGarage)
router.get('*', (req: Request, res: Response) => { res.status(404).send('Not Found') })


export default router