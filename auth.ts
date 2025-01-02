import NextAuth from "next-auth"

import authConfig from "./auth.config";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import { getUserById } from "./data/user";
import { DEFAULT_LOGIN_REDIRECT } from "./routes";

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    session: { strategy: 'jwt' },
    adapter: PrismaAdapter(db),
    pages: {
        signIn: '/auth/sign-in',
    },
    events: {
        async linkAccount({ user }) {
            await db.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() },
            })
        }
    },
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider !== "credentials") return true;

            const existingUser = await getUserById(user.id);

            if (!existingUser?.emailVerified) return false;

            // TODO: Send verification email

            return true;
        },
        async session({ session, token }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }
            if (token.role && session.user) {
                session.user.role = token.role as string;
            }
            return session;
        },
        async jwt({ token, session }) {
            if (!token.sub) return token;

            const existingUser = await getUserById(token.sub);

            if (!existingUser) return token;

            token.role = existingUser.role;

            return token;
        }
    }
})