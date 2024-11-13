import { Router } from "express";
import controller from '../controllers/controller'

const router = Router()

router.get('/', controller.testing)

router.post('/signUp', controller.signUp)
router.post('/registerMechanic', controller.registerMechanic)
router.post('/registerGarageOwner', controller.registerGarageOwner)
router.post('/registerGarage', controller.registerGarage)
router.post('/signIn', controller.signIn)

export default router