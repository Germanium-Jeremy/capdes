import { Request, Response, Router } from "express"
import registerController from '../controllers/RegistrationController'
import authController from "../controllers/AuthController"
import userController from "../controllers/UserController"
import garageController from "../controllers/GarageController"
import garageStaffController from "../controllers/GarageStaffController"
import appOwnerController from "../controllers/AppOwnerController"
import testController from "../controllers/Email.test"
import { TestData } from "../controllers/InitialData.test"

const router = Router()


//registration routes
router.post('/signUp', registerController.signUp)
router.post('/registerMechanic', registerController.registerMechanic)
router.post('/registerGarage', registerController.registerGarage)
router.post('/registerGoogleUser', registerController.registerGoogleUser)


//auth routes
router.post('/signIn', authController.signIn)
router.get('/test', authController.checkToken)
router.put('/saveNewPassword',authController.checkResetToken,  authController.resetPassword)
router.post('/checkResetCode',authController.checkResetCode)


//users routes
router.get('/users', authController.checkToken, userController.getUsers)
router.get('/currentUser', authController.checkToken, userController.getCurrentUser)
router.get('/user/:userId', authController.checkToken, userController.getUser)
router.post('/getResetCode', userController.getResetCode)


//mechanics routes
router.get('/mechanics', authController.checkToken, garageStaffController.getMechanics)
router.get('/mechanic/:mechanicId', authController.checkToken, garageStaffController.getMechanic)


//garages routes
router.get('/garages', garageController.getGarages)
router.get('/garage/:garageId',garageController.getGarage)


//help support routes
router.post('/helpSupport', authController.checkToken, appOwnerController.saveHelpSupport)
// router.get('/helpSupport/:helpSupportId', authController.checkToken, appOwnerController.getHelpSupport)


//testing routes
router.get('/testEmail', testController.testEmail)

router.get('/testData',TestData)
router.get('*', (req: Request, res: Response) => { res.status(404).send('Api not found') })

export default router
