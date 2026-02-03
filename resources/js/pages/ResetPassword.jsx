import React, { useState } from 'react'  
import { router } from '@inertiajs/react'
import "bootstrap/dist/css/bootstrap.min.css"


import "bootstrap/dist/css/bootstrap.min.css"


export default function ResetPassword({ token, email: initialEmail }) 
{
    const [status, setStatus] = useState('');
    const [email, setEmail] = useState(initialEmail || '');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => 
    {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        router.post('/reset-password', 
        {
            token,
            email,
            password,
            password_confirmation: passwordConfirmation,
        }, 
        {
            onSuccess: () => 
            {
                setStatus('Password reset successfully!')
                setPassword('')
                setPasswordConfirmation('')
            },

            onError: (errors) => 
            {
                setErrors(errors)
            },

            preserveState: true,
            preserveScroll: true,

        }).finally(() => 
        {
            setProcessing(false)
        })
    }


    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="text-center">Reset Password</h3>
                        </div>
                        <div className="card-body">
                            {status && (<div className="alert alert-success">{status}</div>)}

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">New Password</label>
                                    <input type="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} placeholder="New password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Confirm Password</label>
                                    <input type="password" className={`form-control ${errors.password_confirmation ? 'is-invalid' : ''}`} placeholder="Confirm password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} required/>
                                    {errors.password_confirmation && (<div className="invalid-feedback">{errors.password_confirmation}</div>)}
                                </div>

                                <button type="submit" className="btn btn-primary w-100" disabled={processing}>
                                    {processing ? 'Processing...' : 'Reset Password'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
