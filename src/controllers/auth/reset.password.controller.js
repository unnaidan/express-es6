import { isEmpty } from 'lodash'
import User from '../../models/user'
import PasswordReset from '../../models/password.reset'

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
    token: {
        isEmpty: {
            errorMessage: 'Please enter a token',
            negated: true
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
 * Reset password
 *
 * @public
 */
const reset = async (req, res, next) => {
    try {
        const { email, token, password } = req.body
        const passwordReset = await PasswordReset.findOne({ email })

        let errors = {}

        if (!passwordReset) {
            errors = {
                email: 'Please enter a valid email address'
            }
        }

        if (!passwordReset.isValid(token) || !passwordReset.isAvailable()) {
            errors = {
                email: 'Password reset token is invalid'
            }
        }

        if (!isEmpty(errors)) {
            return res.status(422).json({ errors })
        }

        // Reset password
        await User.updateOne({ email }, {
            password: User.hashPassword(password)
        })

        // Delete password reset token
        await PasswordReset.deleteOne({ email })

        res.json({
            success: true
        })
    } catch (e) {
        next(e)
    }
}

export default {
    validator,
    reset
}
