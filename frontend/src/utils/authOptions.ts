import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { JWT } from "next-auth/jwt"
import { client } from "@/utils"

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,

    providers: [
      CredentialsProvider({
        name: 'Credentials',
        credentials: {
          email: { label: "Email", type: "text" },
          password: { label: "Password", type: "password" }
        },
        
        async authorize (credentials:any, req:any) {
          console.log(credentials,'-credentials--res');
          
          if (typeof credentials !== "undefined") {
            let res:any = false
              res = await client('/auth/login', {body : credentials})
            
            if (res && res.success ) {
              return { ...res.data, apiToken: res.data.token }
            } else {
              return null
            }
          } else {
            return null
          }
        }
      })
    ],
    session: { strategy: "jwt" },
    callbacks: {
      async session ({ session, token, user }) {
        const sanitizedToken = Object.keys(token).reduce((p, c) => {
          // strip unnecessary properties
          if (
            c !== "iat" &&
            c !== "exp" &&
            c !== "jti" &&
            c !== "apiToken"
          ) {
            return { ...p, [c]: token[c] }
          } else {
            return p
          }
        }, {})
        
        return { ...session, user: sanitizedToken, apiToken: token.token }
      },
      async jwt ({ token, user, account, profile,trigger }) {
        if (trigger == 'update') {
            const res = await client('/auth/me', {}, token)
            if (res && res.success) {
              return res.data
            }
          }
        if (typeof user !== "undefined") {
          // user has just signed in so the user object is populated
          return user as unknown as JWT
        }
        return token
      }
    }
  }