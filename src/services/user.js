import { User } from './../models'

/**
 * Return the models.
 * 
 * @param {Object} params 
 * @returns {Promise}
 */
const get = async (params) => {
    return await User.get(params)
}

/**
 * Return the model.
 * 
 * @param {string} id 
 * @returns {Promise}
 */
const find = async (id) => {
    return await User.findById(id, '-password')
}

/**
 * Find model by email.
 * 
 * @param {string} email 
 * @returns {Promise}
 */
const findByEmail = async (email) => {
    return await User.findOne({ email })
}

/**
 * Store the model in storage.
 * 
 * @param {Object} params 
 * @returns {Promise}
 */
const store = async (params) => {
    const {
        email,
        password
    } = params

    const data = {
        email,
        password: password && User.hashPassword(password) || null
    }

    return await User.create(data)
}

/**
 * Update the model in storage.
 * 
 * @param {string} id 
 * @param {Object} params 
 * @returns {Promise}
 */
const update = async (id, params) => {
    const {
        name,
        surname,
        email
    } = params

    const data = {
        name,
        surname,
        email
    }

    return await User.findByIdAndUpdate(id, data, { new: true })
}

/**
 * Remove the model from storage
 *
 * @param {string} id 
 * @returns {Promise}
 */
const destroy = async (id) => {
    return await User.findByIdAndRemove(id)
}

export default {
    get,
    find,
    findByEmail,
    store,
    update,
    destroy
}
