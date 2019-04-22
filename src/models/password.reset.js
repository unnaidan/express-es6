import moment from 'moment'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import randomstring from 'randomstring'

const { Schema } = mongoose

const options = {
    timestamps: true
}

// Mongoose schema
const passwordResetSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    token: {
        type: String,
        required: true,
    }
}, options)

class passwordResetClass {
    /**
     * Compare token
     * 
     * @param {string} token
     * @return {boolean}
     */
    isValid(token) {
        return bcrypt.compareSync(token, this.token)
    }

    /**
     * Check token date
     * 
     * @return {boolean}
     */
    isAvailable() {
        // Token life time
        const expiresIn = process.env.PASSWORD_RESET_EXPIRE

        const expiryDate = moment(this.createdAt).add(expiresIn, 'minutes')
        const now = moment()

        return expiryDate.isAfter(now)
    }

    /**
     * Generate token
     * 
     * @return {string}
     */
    generateToken() {
        return randomstring.generate({
            length: 60,
            capitalization: 'lowercase'
        })
    }

    /**
     * Hash token
     * 
     * @param {string} token
     * @return {string}
     */
    static hashToken(token) {
        const salt = bcrypt.genSaltSync(10)

        return bcrypt.hashSync(token, salt)
    }
}

passwordResetSchema.loadClass(passwordResetClass)

const PasswordReset = mongoose.model('PasswordReset', passwordResetSchema)

export default PasswordReset
