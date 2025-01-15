import { Request, Response, Router } from "express";
import registerController from '../controllers/RegistrationController'
import authController from "../controllers/AuthController";
import userController from "../controllers/UserController";

const router = Router()

//registration routes
router.post('/signUp', registerController.signUp)
router.post('/registerMechanic', registerController.registerMechanic)
router.post('/registerGarage', registerController.registerGarage)


//auth routes
router.post('/signIn', authController.signIn)
router.get('/test', authController.checkToken)

//users routes
router.get('/users', authController.checkToken,userController.getUsers)

//mechanics routes
router.get('/mechanics', authController.checkToken,userController.getMechanics)

//garages routes
router.get('/garages', authController.checkToken, userController.getGarages)





router.get('*', (req: Request, res: Response) => { res.status(404).send('Not Found') })


export default router