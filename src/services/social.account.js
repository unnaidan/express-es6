import { SocialAccount } from './../models'

/**
 * Return the models by user.
 * 
 * @param {string} user 
 * @returns {Promise}
 */
const getByUser = async (user) => {
    return await SocialAccount.find({ user })
}

/**
 * Return the model by provder.
 * 
 * @param {string} provider 
 * @param {string} id 
 * @returns {Promise}
 */
const findByProvider = async (provider, id) => {
    return await SocialAccount.findOne({
        provider,
        providerId: id
    })
}

/**
 * Store the model in storage.
 * 
 * @param {Object} params 
 * @returns {Promise}
 */
const store = async (params) => {
    const {
        user,
        provider,
        providerId
    } = params
    return await SocialAccount.create({
        user,
        provider,
        providerId
    })
}

export default {
    getByUser,
    findByProvider,
    store
}
