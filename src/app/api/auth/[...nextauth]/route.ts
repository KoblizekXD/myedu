import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'School Login',
            id: 'school_login',
            credentials: {
                identity: { label: "Email/Identita", type: "text" },
                password: { label: "Heslo", type: "password" }
            },
            async authorize(credentials, req) {
                return null
            }
        })
    ],
    pages: {
        signIn: '/login',
        signOut: '/logout',
    }
})

export { handler as GET, handler as POST }