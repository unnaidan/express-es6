import { user as userService } from './../../services'

const schema = {
    email: {
        isEmpty: {
            errorMessage: 'Please enter an email address',
            negated: true
        },
        isEmail: {
            errorMessage: 'Please enter a valid email address'
        }
    },
    password: {
        isEmpty: {
            errorMessage: 'Please enter a password',
            negated: true
        },
        isLength: {
            errorMessage: 'Password must be at least six characters',
            options: { min: 6 }
        }
    }
}

/**
 * Create new user
 *
 * @public
 */
const index = async (req, res, next) => {
    try {
        const {
            email,
            password
        } = req.body

        const user = await userService.store({
            email,
            password
        })

        res.json({ user })
    } catch (e) {
        next(e)
    }
}

export default {
    schema,
    index
}
