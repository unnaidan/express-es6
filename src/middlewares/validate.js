import {
    checkSchema,
    validationResult
} from 'express-validator/check'
import createError from 'http-errors'

const result = validationResult.withDefaults({
    formatter: ({ msg }) => msg
})

export default schema => [
    checkSchema(schema),
    (req, res, next) => {
        const errors = result(req)

        if (!errors.isEmpty()) {
            throw new createError(422, 'Validation errors', {
                errors: errors.mapped()
            })
        }

        next()
    }
]
