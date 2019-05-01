import { gql } from 'apollo-server-express'
import { UserService, SocialAccountService } from './../services'

const typeDef = gql`
    type User {
        _id: String!
        name: String
        email: String!
        socialAccounts: [SocialAccount]
    }

    extend type Query {
        user(_id: String!): User
        users(page: Int, perPage: Int, sortBy: String, sortOrder: String): [User]
    }

    extend type Mutation {
        register(email: String!, password: String!): User
        updateUser(_id: String!, name: String, email: String): User
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
            return UserService.find(_id)
        },

        /**
         * Return users.
         * 
         * @returns {Array}
         */
        users(parent, args) {
            return UserService.get(args)
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
            return UserService.store({
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
            return UserService.update(_id, { name, email }, { new: true })
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
            return SocialAccountService.getByUser(user)
        }
    }
}

export {
    typeDef,
    resolvers
}
