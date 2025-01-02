"use client";

import FormError from "./form-error";
import useCurrentUser from "@/hooks/useCurrentUser";

interface RoleGateProps {
    children: React.ReactNode;
    allowedRole: "ADMIN" | "USER";
}

const RoleGate = ({
    children,
    allowedRole
}: RoleGateProps) => {
    const user = useCurrentUser();

    if (user?.role !== allowedRole) {
        return <FormError message="You do not have permission to access this page" />
    }

    return (
        <>
            {children}
        </>
    )
}

export default RoleGate