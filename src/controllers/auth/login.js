import createError from 'http-errors'
import { user as userService } from '../../services'

const schema = {
    email: {
        isEmpty: {
            errorMessage: 'Please enter an email address',
            negated: true
        }
    },
    password: {
        isEmpty: {
            errorMessage: 'Please enter a password',
            negated: true
        }
    }
}

/**
 * Login with email, password
 *
 * @public
 */
const index = async (req, res, next) => {
    try {
        const {
            email,
            password
        } = req.body

        const user = await userService.findByEmail(email)

        if (!user || !user.validPassword(password)) {
            throw new createError(422, 'Validation errors')
        }

        const token = user.generateToken()
        res.json({ token })
    } catch (e) {
        next(e)
    }
}

export default {
    schema,
    index
}
