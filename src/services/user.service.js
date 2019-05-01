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
 * Store the model in storage.
 * 
 * @param {Object} params 
 * @returns {Promise}
 */
const store = async (params) => {
    const { name, email } = params
    return await User.create({ name, email })
}

/**
 * Update the model in storage.
 * 
 * @param {string} id 
 * @param {Object} params 
 * @returns {Promise}
 */
const update = async (id, params) => {
    const  { name, email } = params
    return await User.findByIdAndUpdate(id, { name, email }, { new: true })
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
    store,
    update,
    destroy
}
