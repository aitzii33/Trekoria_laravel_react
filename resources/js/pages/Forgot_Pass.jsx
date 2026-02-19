import { useState } from 'react'
import { Inertia } from '@inertiajs/inertia'
import '../../css/Contact.css'
import "bootstrap/dist/css/bootstrap.min.css"

function ForgotPass() 
{
    const [email, setEmail] = useState('');

    const Verify = (e) => 
    {
        e.preventDefault();

        Inertia.post('/forgot.perform', { email });
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
            <form onSubmit={Verify} className="p-4 border rounded shadow-sm bg-white" style={{ width: '500px' }}>
                <h2 className="text-center mb-4">Forgot Password</h2>

                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input type="email" id="email" name="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </div>

                <button type="submit" className="btn btn-primary w-100">Send</button>
            </form>
        </div>

    );
}

export default ForgotPass;
