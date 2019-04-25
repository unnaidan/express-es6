import { User } from './../models'

/**
 * Return the model
 *
 * @public
 */
const show = async (id) => {
    return await User.findById(id, '-password')
}

/**
 * Update the model in storage
 *
 * @public
 */
const store = async ({ name, email }) => {
    return await User.create({ name, email })
}

/**
 * Update the model in storage
 *
 * @public
 */
const update = async (id, { name, email }) => {
    return await User.findByIdAndUpdate(id, { name, email }, { new: true })
}

/**
 * Remove the model from storage
 *
 * @public
 */
const destroy = async (id) => {
    return await User.findByIdAndRemove(id)
}

export default {
    show,
    store,
    update,
    destroy
}
