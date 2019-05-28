import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'

const { Schema } = mongoose

const options = {
    timestamps: true
}

// Mongoose schema
const userSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    }
}, options)

class UserClass {
    /**
     * Compare password
     * 
     * @param {string} password
     * @returns {boolean}
     */
    validPassword(password) {
        return bcrypt.compareSync(password, this.password)
    }

    /**
     * Generate token
     * 
     * @returns {string}
     */
    generateToken() {
        const options = {
            expiresIn: process.env.TOKEN_LIFETIME
        }

        const payload = this.toJSON()
        const token = jwt.sign(payload, process.env.SECRET, options)

        return token
    }

    /**
     * Hash password
     * 
     * @param {string} password
     * @returns {string}
     */
    static hashPassword(password) {
        const salt = bcrypt.genSaltSync(10)

        return bcrypt.hashSync(password, salt)
    }

    /**
     * Return a listing of the model
     *
     * @param {Object} params
     * @returns {Promise}
     */
    static get(params) {
        const {
            page = 1,
            perPage = 10,
            sortBy = 'createdAt',
            sortOrder = 'desc'
        } = params

        return this.find({})
            // Sort
            .sort({
                [sortBy]: sortOrder
            })
            // Pagination
            .skip(perPage * (page - 1))
            .limit(perPage)
            .select('-password')
            .exec()
    }
}

userSchema.loadClass(UserClass)

const User = mongoose.model('User', userSchema)

export default User
