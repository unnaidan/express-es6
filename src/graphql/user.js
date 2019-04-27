import { gql } from 'apollo-server-express'
import { User, SocialAccount } from './../models'

const typeDef = gql`
    type User {
        _id: String
        name: String
        email: String
        socialAccounts: [SocialAccount]
    }

    extend type Query {
        user(_id: String): User
        users: [User]
    }

    extend type Mutation {
        register(email: String, password: String): User
        updateUser(_id: String, name: String, email: String): User
    }
`

const resolvers = {
    Query: {
        /**
         * Find user by id.
         * 
         * @param {*} parent
         * @param {Object} args
         * @returns {User}
         */
        user(parent, args) {
            const { _id } = args
            return User.findOne({ _id })
        },

        /**
         * Return users.
         * 
         * @param {*} parent
         * @param {Object} args
         * @returns {Array}
         */
        users() {
            return User.find({})
        }
    },
    Mutation: {
        /**
         * Create new user account.
         * 
         * @param {*} parent
         * @param {Object} args
         * @returns {User}
         */
        register(parent, args) {
            const { email, password } = args
            return User.create({
                email,
                password: User.hashPassword(password)
            })
        },
        /**
         * Update user.
         * 
         * @param {*} parent
         * @param {Object} args
         * @returns {User}
         */
        updateUser(parent, args) {
            const { _id, name, email } = args
            return User.findByIdAndUpdate(_id, { name, email }, { new: true })
        }
    },
    User: {
        /**
         * Return social accounts by user id.
         * 
         * @param {User} user
         * @returns {Array}
         */
        socialAccounts(user) {
            return SocialAccount.find({ user })
        }
    }
}

export {
    typeDef,
    resolvers
}
