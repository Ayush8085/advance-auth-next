"use server";

import { currentUser } from "@/lib/auth";

export const admin = async () => {
    const user = await currentUser();

    if (user?.role === "ADMIN") {
        return { success: "Allowed!" };
    }

    return { error: "Forbidden!" };
}