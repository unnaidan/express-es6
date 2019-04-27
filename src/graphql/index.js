import { merge } from 'lodash'
import { gql } from 'apollo-server-express'
import { makeExecutableSchema } from 'graphql-tools';
import {
    typeDef as User,
    resolvers as userResolvers
} from './user'
import {
    typeDef as SocialAccount,
    resolvers as socialAccountResolvers
} from './social.account'

const Query = gql`
    type Query {
        _empty: String
    }

    type Mutation {
        test(arg: String): String
    }
`

const resolvers = {
    Mutation: {
        test(parent, arg) {
            return arg
        }
    }
}

const schema = makeExecutableSchema({
    typeDefs: [
        User,
        SocialAccount,
        Query
    ],
    resolvers: merge(
        resolvers,
        userResolvers,
        socialAccountResolvers
    )
})

export default schema
