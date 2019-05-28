import User from '../../models/user'

const validator = {
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
const register = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await User.create({
            email,
            password: User.hashPassword(password)
        })

        const token = user.generateToken()
        res.json({ token })
    } catch (e) {
        next(e)
    }
}

export default {
    validator,
    register
}
