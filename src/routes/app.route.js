import express from 'express'
import passport from 'passport'

const router = express.Router()

// Check authentication
router.use(passport.authenticate('bearer', { session: false }))

export default router
