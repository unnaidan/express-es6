import express from 'express'
import upload from './../config/multer'
import imageController from './../controllers/image'

const router = express.Router()

router.post('/upload/image', upload.single('image'), imageController.upload)

export default router
