import { Router } from "express";
import userController from '../controllers/RegistrationController'

const router = Router()

router.get('/', userController.testing)
//basic creating
router.post('/signUp', userController.signUp)
router.post('/registerMechanic', userController.registerMechanic)
router.post('/registerGarageOwner', userController.registerGarageOwner)
router.post('/registerGarage', userController.registerGarage)
router.post('/signIn', userController.signIn)

export default router