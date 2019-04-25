import mongoose from 'mongoose'

const { Schema } = mongoose

const options = {
    timestamps: true
}

// Mongoose schema
const socialAccountSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    provider: {
        type: String,
        required: true
    },
    providerId: {
        type: String,
        required: true
    }
}, options)

class SocialAccountClass {
    //
}

socialAccountSchema.loadClass(SocialAccountClass)

const SocialAccount = mongoose.model('SocialAccount', socialAccountSchema)

export default SocialAccount
