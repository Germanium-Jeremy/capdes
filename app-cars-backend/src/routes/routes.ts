import { Request, Response, Router } from "express"
import registerController from '../controllers/RegistrationController'
import authController from "../controllers/AuthController"
import userController from "../controllers/UserController"
import garageController from "../controllers/GarageController"
import garageStaffController from "../controllers/GarageStaffController"

const router = Router()

//registration routes
router.post('/signUp', registerController.signUp)
router.post('/registerMechanic', registerController.registerMechanic)
router.post('/registerGarage', registerController.registerGarage)


//auth routes
router.post('/signIn', authController.signIn)
router.get('/test', authController.checkToken)


//users routes
router.get('/users', authController.checkToken, userController.getUsers)
router.get('/user/:userId', authController.checkToken, userController.getUser)


//mechanics routes
router.get('/mechanics', authController.checkToken, garageStaffController.getMechanics)
router.get('/mechanic/:mechanicId', authController.checkToken, garageStaffController.getMechanic)


//garages routes
router.get('/garages', authController.checkToken, garageController.getGarages)
router.get('/garage/:garageId', authController.checkToken, garageController.getGarage)




router.get('*', (req: Request, res: Response) => { res.status(404).send('Not Found') })


export default router