import express from 'express'
import validate from './../middlewares/validate'
import login from './../controllers/auth/login'
import register from './../controllers/auth/register'

const router = express.Router()

router.post('/login', validate(login.schema), login.index)
router.post('/register', validate(register.schema), register.index)

export default router
