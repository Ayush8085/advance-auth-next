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
import { ResetSchema } from '@/schema'
import FormError from './form-error';
import FormSuccess from './form-success';
import { useTransition } from 'react';
import { reset } from '@/actions/reset';

const ResetForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: "",
        }
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof ResetSchema>) {
        setError("");
        setSuccess("");

        console.log("values: ", values);

        startTransition(() => {
            reset(values)
                .then((data) => {
                    if (data.error) setError(data.error);
                    if (data.success) setSuccess(data.success);
                })
        });
    }


    return (
        <CardWrapper
            headerLabel="Forgot your password?"
            backButtonLabel="Back to login"
            backButtonHref="/auth/sign-in"
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type='email' disabled={isPending} placeholder="Enter your email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button type="submit" className='w-full' disabled={isPending}>Send reset email</Button>
                </form>
            </Form>
        </CardWrapper>
    )
}

export default ResetForm