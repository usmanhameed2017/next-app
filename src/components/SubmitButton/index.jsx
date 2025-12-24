"use client";
import React from 'react';
import { useFormStatus } from 'react-dom';


function SubmitButton({ children, className, style })
{
    const { pending } = useFormStatus();
    return (
        <>
            <button type='submit' className={className} style={style} disabled={pending}> { children } </button>
        </>
    );
}

export default SubmitButton;