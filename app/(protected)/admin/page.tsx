"use client";

import { admin } from "@/actions/admin";
import FormSuccess from "@/components/form-success";
import RoleGate from "@/components/role-gate";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "sonner";

const AdminPage = () => {
    const onServerActionClick = () => {
        admin()
            .then((data) => {
                if (data.error) {
                    toast.error(data.error);
                }

                if (data.success) {
                    toast.success(data.success);
                }
            })
    }

    const onApiRouteClick = () => {
        fetch("/api/admin")
            .then(response => {
                if (response.ok) {
                    toast.success("Allowed API Route");
                } else {
                    toast.error("Forbidden API Route");
                }
            })

    }

    return (
        <Card className="w-[500px] shadow-sm">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">
                    🔑 Admin
                </p>
            </CardHeader>

            <CardContent className="space-y-4">
                <RoleGate allowedRole="ADMIN">
                    <FormSuccess message="You have permission to access this page" />
                </RoleGate>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium">
                        Admin-only API Route
                    </p>
                    <Button onClick={onApiRouteClick}>
                        Click to test
                    </Button>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium">
                        Admin-only Server Action
                    </p>
                    <Button onClick={onServerActionClick}>
                        Click to test
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default AdminPage