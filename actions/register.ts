"use server";

import { RegisterSchema } from "@/schema";
import z from "zod";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedData = RegisterSchema.safeParse(values);

    if (!validatedData.success) {
        return { error: "Invalid fields!" };
    }

    return { success: "Email sent!" };
}