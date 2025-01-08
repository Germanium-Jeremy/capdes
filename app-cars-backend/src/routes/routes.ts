import { Router } from "express";
import userController from '../controllers/RegistrationController'

const router = Router()

//basic creating
router.post('/signUp', userController.signUp)
router.post('/registerMechanic', userController.registerMechanic)
router.post('/registerGarage', userController.registerGarage)


export default router