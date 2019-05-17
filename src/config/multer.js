import multer from 'multer'
import multerS3 from 'multer-s3'
import aws from 'aws-sdk'
import mime from 'mime'

/**
 * AWS S3 config
 */
const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_DEFAULT_REGION
})

/**
 * Generate unique file name
 * 
 * @param {Object} req 
 * @param {Object} file 
 * @param {Function} done 
 */
const generateFileName = (тimeType) => {
    // Unique string
    const unique = Date.now().toString()
    // Original file extension
    const ext = mime.getExtension(тimeType)

    return `${unique}.${ext}`
}

/**
 * File key
 * 
 * @param {Object} req 
 * @param {Object} file 
 * @param {Function} done 
 */
const key = (req, file, done) => {
    done(null, generateFileName(file.mimetype))
}

const storage = multerS3({
    s3,
    key,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    bucket: process.env.AWS_BUCKET
})

export default multer({ storage })
