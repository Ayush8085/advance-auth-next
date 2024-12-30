"use server";

import { RegisterSchema } from "@/schema";
import z from "zod";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import { error } from "console";
import { getUserByEmail } from "@/data/user";

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

    // TODO: Send verification email

    return { success: "User created!" };
}