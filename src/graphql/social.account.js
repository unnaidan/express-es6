import { gql } from 'apollo-server-express'
import { UserService, SocialAccountService } from './../services'

const typeDef = gql`
    type SocialAccount {
        user: User!
        provider: String!
        providerId: String!
    }

    extend type Mutation {
        addSocialAccount(user: String!, provider: String!, providerId: String!): SocialAccount
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
            return SocialAccountService.store(args)
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
            return UserService.find(socialAccount.user)
        }
    }
}

export {
    typeDef,
    resolvers
}
