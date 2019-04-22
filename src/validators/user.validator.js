/**
 * Validation rules that apply to the request.
 */
const update = {
    name: {
        isEmpty: {
            errorMessage: 'Please enter a name',
            negated: true
        }
    },
    email: {
        isEmpty: {
            errorMessage: 'Please enter an email address',
            negated: true
        },
        isEmail: {
            errorMessage: 'Please enter a valid email address'
        }
    }
}

export {
    update
}
