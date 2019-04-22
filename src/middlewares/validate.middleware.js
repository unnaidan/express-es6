import { checkSchema, validationResult } from 'express-validator/check'

const result = validationResult.withDefaults({
    formatter: err => err.msg
})

export default schema => [
    checkSchema(schema),
    (req, res, next) => {
        const errors = result(req)

        if (!errors.isEmpty()) {
            return res.status(422).json({
                errors: errors.mapped()
            })
        }

        next()
    }
]
