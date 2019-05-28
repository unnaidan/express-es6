export default (err, req, res, next) => {
    const {
        status = 500,
        message = 'Internal server error',
        errors
    } = err

    res.status(status).json({
        message,
        errors: errors || undefined
    })
}
