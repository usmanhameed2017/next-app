"use client";
import { handleSignup } from '@/actions/auth';
import { redirect } from 'next/navigation';
import React, { useActionState } from 'react';

function Signup() 
{
    // Initial state
    const initialState = {
        success:false,
        errors:{}
    };

    // Action state
    const [state, formAction, pending] = useActionState(handleSignup, initialState);
    if(state.success === true) return redirect("/");
    return (
        <div className='container mt-5'>
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <div className="card shadow">
                        <div className="card-header">
                            <h2 className='text-center fw-bold'> Signup </h2>
                        </div>
                        <div className="card-body">
                            <form action={formAction} className='p-2'>
                                {/* Full Name */}
                                <div className="form-group">
                                    <label htmlFor="name"> Full Name </label>
                                    <input type="text" name="name" className='form-control' placeholder='Enter Full Name' />
                                    { state.errors.name && <span className='text-danger mt-1'> *{ state.errors.name } </span> }
                                </div>

                                {/* Username */}
                                <div className="form-group">
                                    <label htmlFor="username"> Username </label>
                                    <input type="text" name="username" className='form-control' placeholder='Enter username' />
                                    { state.errors.username && <span className='text-danger mt-1'> *{ state.errors.username } </span> }
                                </div>

                                {/* Password */}
                                <div className="form-group">
                                    <label htmlFor="password"> Password </label>
                                    <input type="password" name="password" className='form-control' placeholder='Enter Password' />
                                    { state.errors.password && <span className='text-danger mt-1'> *{ state.errors.password } </span> }
                                </div>  

                                <div className="form-group mt-3 d-grid">
                                    <button type='submit' className='btn btn-success' disabled={pending}> Signup </button>
                                </div>                              
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;