import { auth, signOut } from "@/auth"
import { Button } from "@/components/ui/button";

const Settings = async () => {
    const session = await auth();

    return (
        <div className="bg-white p-10 rounded-xl">
            <form action={async () => {
                "use server";

                await signOut({ redirectTo: "/auth/sign-in" });
            }}>
                <Button type="submit">Sign Out</Button>
            </form>
        </div>
    )
}

export default Settings