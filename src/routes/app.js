import express from 'express'
import passport from 'passport'
import upload from './../config/multer'
import image from './../controllers/image'

const router = express.Router()

router.get('/qr/image/:text', image.generateQR)
router.post('/image/upload', upload.single('image'), image.upload)

// Check authentication
router.use(passport.authenticate('bearer', { session: false }))

export default router
