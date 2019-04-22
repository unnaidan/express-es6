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
    }
}

/**
 * Send password reset link
 *
 * @public
 */
const sendResetLinkEmail = async (req, res, next) => {
    try {
        const { email } = req.body
        const user = await User.findOne({ email })

        if (!user) {
            const errors = {
                email: 'We can\'t find a user with that e-mail address'
            }
            
            return res.status(422).json({ errors })
        }

        // Generate token
        const token = PasswordReset.generateToken()

        await PasswordReset.create({
            email,
            token
        })

        // Send email with token

        res.json({
            success: true
        })
    } catch (e) {
        next(e)
    }
}

export default {
    validator,
    sendResetLinkEmail
}
