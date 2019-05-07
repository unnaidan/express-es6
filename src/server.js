import 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import { ApolloServer } from 'apollo-server-express'
import i18n from 'i18n'
import passport from 'passport'
import helmet from 'helmet'
import compression from 'compression'
import rateLimit from 'express-rate-limit'
import cors from 'cors'
import schema from './graphql'
import authMiddleware from './middlewares/auth.middleware'
import errorHandler from './middlewares/error.handler.middleware'
import appRoute from './routes/app.route'
import authenticateRoute from './routes/authenticate.route'
import './database/connect'
import './config/passport'
import './config/i18n'

const app = express()

app.use(cors())
app.use(helmet())
app.use(compression())
app.use(cookieParser())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(bodyParser.json())
app.use(passport.initialize())

app.use(
    rateLimit({
        windowMs: 1 * 60 * 1000, // 1 minutes
        max: 60 // limit each IP to 60 requests per windowMs
    })
)

app.use(i18n.init)

// Serving static files
app.use(express.static('public'))

// Set locale
app.use((req, res, next) => {
    i18n.setLocale(req.get('X-Language') || 'mn')
    next()
})

// Attach authenticated user to request
app.use(authMiddleware)

const server = new ApolloServer({
    schema,
    context: ({ req }) => ({
        user: req.user
    })
})

server.applyMiddleware({ app })

// Authentication routes
app.use('/api', authenticateRoute)
// Application routes
app.use('/api', appRoute)

// Handle 404 error
app.use((req, res, next) => {
    const err = new Error('No HTTP resource was found that matches the request URI')
    next(err)
})

// Handle all errors
app.use(errorHandler)

const port = process.env.PORT || e000

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
