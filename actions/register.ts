"use server";

import { RegisterSchema } from "@/schema";
import z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/mail";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedData = RegisterSchema.safeParse(values);

    if (!validatedData.success) {
        return { error: "Invalid fields!" };
    }

    const { name, email, password } = validatedData.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existsUser = await getUserByEmail(email);

    if (existsUser) {
        return { error: "Email already exists!" };
    };

    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        }
    });

    const verificationToken = await generateVerificationToken(email);

    await sendVerificationEmail(verificationToken.email, verificationToken.token);

    return { success: "Confirmation email sent!" };
}