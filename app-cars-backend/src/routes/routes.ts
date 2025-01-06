import { Router } from "express";
import controller from '../controllers/controller'
import appController from "../controllers/appController";

const router = Router()

router.get('/', controller.testing)
//basic creating
router.post('/signUp', controller.signUp)
router.post('/registerMechanic', controller.registerMechanic)
router.post('/registerGarageOwner', controller.registerGarageOwner)
router.post('/registerGarage', controller.registerGarage)
router.post('/signIn', controller.signIn)

//app routes
router.get('/testing', appController.testing)

router.get('/getMechanics', appController.getMechanics)

export default router