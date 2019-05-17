import passport from 'passport'

export default (req, res, next) => {
    passport.authenticate('bearer', { session: false }, (err, user) => {
        if (err) return next(err)
        if (user) req.user = user
        next()
    })(req, res, next)
}
