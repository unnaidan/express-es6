import { gql } from 'apollo-server-express'
import { User, SocialAccount } from './../models'

const typeDef = gql`
    type SocialAccount {
        user: User
        provider: String
        providerId: String
    }

    extend type Mutation {
        addSocialAccount(user: String, provider: String, providerId: String): SocialAccount
    }
`

const resolvers = {
    Mutation: {
        /**
         * Create new social account.
         * 
         * @param {*} parent
         * @param {Object} args
         * @returns {SocialAccount}
         */
        addSocialAccount(parent, args) {
            return SocialAccount.create(args)
        }
    },
    SocialAccount: {
        /**
         * Return social accounts by user id.
         * 
         * @param {SocialAccount} socialAccount
         * @returns {User}
         */
        user(socialAccount) {
            return User.findById(socialAccount.user)
        }
    }
}

export {
    typeDef,
    resolvers
}
