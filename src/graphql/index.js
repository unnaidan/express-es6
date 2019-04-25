import { gql } from 'apollo-server-express'
import {User, SocialAccount } from './../models'

const typeDefs = gql`
    type User {
        _id: String
        name: String
        email: String
        socialAccounts: [SocialAccount]
    }

    type SocialAccount {
        user: User
        provider: String
        providerId: String
    }

    type Query {
        user(_id: String): User
        users: [User]
    }

    type Mutation {
        addUser(email: String, password: String): User
        updateUser(_id: String, name: String, email: String): User
        addSocialAccount(user: String, provider: String, providerId: String): SocialAccount
    }
`

const resolvers = {
    Query: {
        user(parent, { _id }) {
            return User.findOne({ _id })
        },
        users() {
            return User.find({})
        }
    },
    Mutation: {
        addUser(parent, { email, password }) {
            return User.create({
                email,
                password: User.hashPassword(password)
            })
        },
        updateUser(parent, { _id, name, email }) {
            return User.findByIdAndUpdate(_id, { name, email }, { new: true })
        },
        addSocialAccount(parent, args) {
            return SocialAccount.create(args)
        }
    },
    User: {
        socialAccounts(user) {
            return SocialAccount.find({ user })
        }
    }
}

export {
    typeDefs,
    resolvers
}
