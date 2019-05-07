import jwt from 'jsonwebtoken'
import passport from 'passport'
import { Strategy as BearerStrategy } from 'passport-http-bearer'
import { Strategy as FacebookStrategy } from 'passport-facebook'
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth'
import {
    UserService,
    SocialAccountService
} from './../services'

// const googleConfig = {
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: '/google/callback'
// }

// const facebookConfig = {
//     clientID: process.env.FACEBOOK_APP_ID,
//     clientSecret: process.env.FACEBOOK_APP_SECRET,
//     callbackURL: '/facebook/callback'
// }

passport.use(new BearerStrategy(async (token, done) => {
    try {
        const payload = jwt.verify(token, process.env.SECRET)
        const user = await UserService.find(payload._id)

        done(null, user || false)
    } catch (err) {
        done(err)
    }
}))

// passport.use(new GoogleStrategy(googleConfig, async (
//     accessToken,
//     refreshToken,
//     profile,
//     done
// ) => {
//     try {
//         let user = null
//         const { id, provider, emails } = profile

//         // Find or create user

//         done(null, user || false)
//     } catch (err) {
//         done(err)
//     }
// }))

// passport.use(new FacebookStrategy(facebookConfig, async (
//     accessToken,
//     refreshToken,
//     profile,
//     done
// ) => {
//     try {
//         let user = null
//         const { id, provider, emails } = profile

//         // Find or create user

//         done(null, user || false)
//     } catch (err) {
//         done(err)
//     }
// }))
