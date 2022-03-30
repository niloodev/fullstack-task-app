// next-auth import and routes
import NextAuth from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'

// import database adapter
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'

// import mongodb variables
import ClientPromise from '../../../lib/mongodb'

export default NextAuth({
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
    ],
    adapter: MongoDBAdapter(ClientPromise),
})
