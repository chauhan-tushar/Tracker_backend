import express  from 'express'
import { getRegisterUser, singIn, singUp } from '../Controllers/UserController.js'

const router = express.Router()


router.post('/login',singIn)
router.post('/register',singUp)
router.get('/getRegister',getRegisterUser)

export default router