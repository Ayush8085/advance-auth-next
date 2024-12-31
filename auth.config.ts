import type { NextAuthConfig } from "next-auth"
import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials"
import { LoginSchema } from "./schema"
import { getUserByEmail } from "./data/user";

// Notice this is only an object, not a full Auth.js instance
export default {
    providers: [
        Credentials({
            credentials:{
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                const validatedFields = LoginSchema.safeParse(credentials);

                console.log("----- auth.config.ts -----");
                

                if (validatedFields.success) {
                    const { email, password } = validatedFields.data;

                    const user = await getUserByEmail(email);

                    if (!user || !user.password) {
                        console.log('User or password missing');
                        return null;
                    }


                    const passwordMatch = await bcrypt.compare(password, user.password);

                    if (passwordMatch) {
                        return user;
                    }
                }

                return null;
            }
        })
    ],
} satisfies NextAuthConfig