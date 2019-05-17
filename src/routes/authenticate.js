import express from 'express'
import validate from './../middlewares/validate'
import forgotPassword from './../controllers/auth/forgot.password'
import login from './../controllers/auth/login'
import register from './../controllers/auth/register'
import resetPassword from './../controllers/auth/reset.password'

const router = express.Router()

router.post('/login', validate(login.validator), login.login)
router.post('/register', validate(register.validator), register.register)
router.post('/forgot/password/email', validate(forgotPassword.validator), forgotPassword.sendResetLinkEmail)
router.post('/reset/password', validate(resetPassword.validator), resetPassword.reset)

export default router
