import jwt from 'jsonwebtoken'
import passport from 'passport'
import passportHttpBearer from 'passport-http-bearer'
import User from './../models/user'

const BearerStrategy = passportHttpBearer.Strategy

// Verify bearer token middleware, load user
passport.use(new BearerStrategy(async (token, callback) => {
    try {
        const payload = jwt.verify(token, process.env.SECRET)
        const user = await User.findById(payload._id)

        callback(null, user || false)
    } catch (err) {
        callback(err)
    }
}))
