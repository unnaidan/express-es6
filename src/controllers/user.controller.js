import User from './../models/User'

/**
 * Return a listing of the model
 *
 * @public
 */
const index = async (req, res, next) => {
    try {
        const users = await User.get(req.query)
        res.json({ users })
    } catch (e) {
        next(e)
    }
}

/**
 * Return the model
 *
 * @public
 */
const show = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id, '-password')
        res.json({ user })
    } catch (e) {
        next(e)
    }
}

/**
 * Update the model in storage
 *
 * @public
 */
const update = async (req, res, next) => {
    try {
        const { name, email } = req.body
        const user = await User.findByIdAndUpdate(req.params.id, { name, email }, { new: true })
        res.json({ user })
    } catch (e) {
        next(e)
    }
}

/**
 * Remove the model from storage
 *
 * @public
 */
const destroy = async (req, res, next) => {
    try {
        const user = await User.findByIdAndRemove(req.params.id)
        res.json({ user })
    } catch (e) {
        next(e)
    }
}

export default {
    index,
    update,
    destroy,
    show
}
