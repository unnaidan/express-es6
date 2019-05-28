import QRCode from 'qrcode'

/**
 * Upload image to s3 storage
 *
 * @public
 */
const upload = async (req, res, next) => {
    res.json({
        path: req.file.location
    })
}

/**
 * Generate QR code
 *
 * @public
 */
const generateQR = async (req, res, next) => {
    try {
        const { text } = req.params
        const data = await QRCode.toDataURL(text)

        // Convert to buffer
        const image = Buffer.from(data.split(',').pop(), 'base64')

        res.append('Content-Type', 'image/png')
        res.end(image)
    } catch (e) {
        next(e)
    }
}

export default {
    upload,
    generateQR
}
