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
        }
    }
}

/**
 * Login with email, password
 *
 * @public
 */
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })

        if (!user || !user.validPassword(password)) {
            const errors = {
                email: 'Sorry, your password was incorrect'
            }
            
            return res.status(422).json({ errors })
        }

        const token = user.generateToken()
        res.json({ token })
    } catch (e) {
        next(e)
    }
}

export default {
    validator,
    login
}
