"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import Link from "next/link";
import { signIn } from "next-auth/react";

interface CardWrapperProps {
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref: string;
    showSocial?: boolean;
}


export const CardWrapper = ({
    children,
    headerLabel,
    backButtonLabel,
    backButtonHref,
    showSocial
}: CardWrapperProps) => {
    const onClick = (provider: "google" | "github") => {
        console.log("clicked");
        signIn(provider);
    }

    return (
        <Card className="w-[400px] shadow-md">
            <CardHeader>
                <div className="flex flex-col gap-2 justify-center items-center">
                    <h1 className="text-3xl font-semibold">
                        🔐Auth
                    </h1>
                    <h2 className="text-xl font-medium text-slate-500">
                        {headerLabel}
                    </h2>
                </div>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            <CardFooter>
                {showSocial && (
                    <div className="w-full flex items-center gap-x-2">
                        <Button variant="outline" className="w-full" onClick={() => onClick("google")}>
                            <FcGoogle className="h-5 w-5" />
                        </Button>

                        <Button variant="outline" className="w-full" onClick={() => onClick("github")}>
                            <FaGithub className="h-5 w-5" />
                        </Button>

                    </div>
                )}
            </CardFooter>

            <CardFooter>
                <Button variant={"link"} className="w-full">
                    <Link href={backButtonHref}>{backButtonLabel}</Link>
                </Button>
            </CardFooter>
        </Card>
    )
}