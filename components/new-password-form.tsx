"use client";

import React, { useState } from 'react'
import { CardWrapper } from './card-wrapper'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { NewPasswordSchema } from '@/schema'
import FormError from './form-error';
import FormSuccess from './form-success';
import { useTransition } from 'react';
import { useSearchParams } from 'next/navigation';
import { newPassword } from '@/actions/new-password';

const NewPasswordForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const searchParams = useSearchParams();
    const token = searchParams.get("token") as string;

    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: "",
        }
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof NewPasswordSchema>) {
        setError("");
        setSuccess("");

        console.log("values: ", values);

        startTransition(() => {
            newPassword(values, token)
                .then((data) => {
                    if (data.error) setError(data.error);
                    if (data.success) setSuccess(data.success);
                })
        });
    }


    return (
        <CardWrapper
            headerLabel="Enter new password"
            backButtonLabel="Back to login"
            backButtonHref="/auth/sign-in"
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>New password</FormLabel>
                                <FormControl>
                                    <Input type='password' disabled={isPending} placeholder="******" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button type="submit" className='w-full' disabled={isPending}>Reset Password</Button>
                </form>
            </Form>
        </CardWrapper>
    )
}

export default NewPasswordForm