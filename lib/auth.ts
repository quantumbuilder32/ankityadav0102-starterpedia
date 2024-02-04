import { DrizzleAdapter } from "@auth/drizzle-adapter";
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import config from "@/db/config"

import { db } from "@/db/db"

export const authOptions = {
    adapter: DrizzleAdapter(db) as any,
    secret: config.NEXTAUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: config.GOOGLE_CLIENT_ID,
            clientSecret: config.GOOGLE_CLIENT_SECRET,
        }),
        GithubProvider({
            clientId: config.GITHUB_ID,
            clientSecret: config.GITHUB_SECRET
        })
    ],
}