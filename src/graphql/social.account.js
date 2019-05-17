import { gql } from 'apollo-server-express'
import { user as userService } from './../services'

const typeDef = gql`
    type SocialAccount {
        user: User!
        provider: String!
        providerId: String!
    }
`

const resolvers = {
    SocialAccount: {
        /**
         * Return social accounts by user id.
         * 
         * @param {SocialAccount} socialAccount
         * @returns {User}
         */
        user(socialAccount) {
            return userService.find(socialAccount.user)
        }
    }
}

export {
    typeDef,
    resolvers
}
