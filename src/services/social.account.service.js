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

/**
 * Remove the model from storage
 *
 * @param {string} id 
 * @returns {Promise}
 */
const destroy = async (id) => {
    return await SocialAccount.findByIdAndRemove(id)
}

export default {
    getByUser,
    store,
    destroy
}
