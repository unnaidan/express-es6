import multer from 'multer'
import multerS3 from 'multer-s3'
import aws from 'aws-sdk'
import uniqueString from 'unique-string'
import mime from 'mime'

const {
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
    AWS_DEFAULT_REGION
} = process.env

const s3 = new aws.S3({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: AWS_DEFAULT_REGION
})

const fileFilter = (req, file, done) => {
    const types = [
        'image/gif',
        'image/jpeg',
        'image/png',
        'image/webp',
        'image/svg+xml',
        'image/x-icon'
    ]

    done(null, types.includes(file.mimetype))
}

const key = (req, file, done) => {
    done(null, `uploads/${uniqueString()}.${mime.getExtension(file.mimetype)}`)
}

const storage = multerS3({
    s3,
    key,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    bucket: AWS_BUCKET
})

export default multer({
    fileFilter,
    storage
})
