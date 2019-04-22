import express from 'express'
import validate from './../middlewares/validate.middleware'
import forgotPassword from './../controllers/auth/forgot.password.controller'
import login from './../controllers/auth/login.controller'
import register from './../controllers/auth/register.controller'
import resetPassword from './../controllers/auth/reset.password.controller'

const router = express.Router()

router.post('/login', validate(login.validator), login.login)
router.post('/register', validate(register.validator), register.register)
router.post('/forgot/password/email', validate(forgotPassword.validator), forgotPassword.sendResetLinkEmail)
router.post('/reset/password', validate(resetPassword.validator), resetPassword.reset)

export default router
