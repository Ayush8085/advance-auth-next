import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { FaUser } from "react-icons/fa"
import useCurrentUser from "@/hooks/useCurrentUser";
import { signOut } from "@/auth";
import { logout } from "@/actions/logout";
import { Button } from "./ui/button";
import { LogOutIcon } from "lucide-react";

const UserButton = () => {
    const user = useCurrentUser();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src={user?.image ? user.image : ""} />
                    <AvatarFallback className="bg-primary">
                        <FaUser className="text-white" />
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-40" align="end">
                <form action={logout}>
                    <DropdownMenuItem>
                        <Button type="submit" variant={"ghost"} className="w-full">
                            <LogOutIcon className="mr-2" />
                            Logout
                        </Button>
                    </DropdownMenuItem>
                </form>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserButton