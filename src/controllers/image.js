import createError from 'http-errors'

/**
 * Upload image to s3 storage
 *
 * @public
 */
const upload = async (req, res, next) => {
    if (!req.file) {
        throw new createError(500, 'Unprocessable entity')
    }

    res.json({
        path: req.file.filename
    })
}

export default {
    upload
}
