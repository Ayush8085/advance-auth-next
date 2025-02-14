"use client";

import { newVerification } from '@/actions/new-verification';
import { CardWrapper } from '@/components/card-wrapper'
import FormError from '@/components/form-error';
import FormSuccess from '@/components/form-success';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { BeatLoader } from "react-spinners";


const VerificationPage = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const searchParams = useSearchParams();

    const token = searchParams.get("token") as string;

    const onSubmit = useCallback(() => {
        if (!token) {
            setError("Missing token!");
        }

        newVerification(token)
            .then((data) => {
                setError(data.error);
                setSuccess(data.success);
            })
            .catch(()=> {
                setError("Something went wrong!");
            })
    }, [token]);

    useEffect(() => {
        onSubmit();
    }, [onSubmit]);

    return (
        <CardWrapper
            headerLabel="Confirming your verification"
            backButtonLabel="Back to login"
            backButtonHref="/auth/sign-in"
        >
            <div className="flex items-center w-full justify-center">
                {!success && !error && <BeatLoader />}
                <FormSuccess message={success} />
                <FormError message={error} />
            </div>
        </CardWrapper>
    )
}

export default VerificationPage