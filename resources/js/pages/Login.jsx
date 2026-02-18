import { Link } from '@inertiajs/react'
import { Container } from 'reactstrap'
import { useState, useEffect } from 'react'
import { Inertia } from '@inertiajs/inertia'

import Header from '../components/Header'

import "../../css/LogIn.css"
import "bootstrap/dist/css/bootstrap.min.css"

import logo from '../img/logo.png'

function Login() 
{
    const [status, setStatus] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [form, setForm] = useState({ email: '', password: '' });

    useEffect(() => 
    {
        const saved = localStorage.getItem('rememberMe');
        if (saved === 'true') setRememberMe(true);
    }, []);

    const handleRememberChange = (e) => 
    {
        const isChecked = e.target.checked;
        setRememberMe(isChecked);
        localStorage.setItem('rememberMe', isChecked);
    };

    const handleLogin = (e) => 
    {
        e.preventDefault();

        if (!form.email || !form.password) 
        {
            setStatus('Please enter email and password.');
            return;
        }

        if (form.password.length > 18) 
        {
            setStatus("The password can't have more than 18 characters");
            return;
        }

        Inertia.post('/login/prove', { ...form, remember: rememberMe }, 
        {
            onError: (errors) => 
            {
                setStatus(errors?.email || errors?.password || 'Login failed');
            }
        });
    };

    return (
        <>
            <Header />
            <Container>
                <div className="container py-5 h-100 d-flex justify-content-center align-items-center">
                    <div className="card rounded-3 text-black col-xl-10 col-lg-6 p-md-5 mx-md-4">
                        <div className="text-center">
                            <img src={logo} alt="logo" style={{ width: "185px" }} />
                        </div>

                        <form onSubmit={handleLogin}>
                            <div className="form-outline mb-4">
                                <input type="email" className="form-control" name="email" value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Introduce your email" required/>
                            </div>

                            <div className="form-outline mb-4">
                                <input type="password" className="form-control" name="password" value={form.password}
                                    onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Introduce your password" required/>
                            </div>

                            <div className="checkbox-container" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                                <input type="checkbox" id="remember" checked={rememberMe} onChange={handleRememberChange}/>
                                <label htmlFor="remember" style={{ margin: 0 }}>Remember me</label>
                            </div>

                            <div className="text-center pt-1 mb-5 pb-1">
                                <button type='submit' className="btn btn-primary">
                                    Log in
                                </button>
                                {status && <p className="text-danger">{status}</p>}

                                <Link href="/forgot">
                                    <p className="link" style={{ color: 'black' }}>Forgot password/user?</p>
                                </Link>
                            </div>

                            <div className="d-flex align-items-center justify-content-center pb-4">
                                <p className="mb-0 me-2">Don't have an account?</p>
                                <Link href="/register">
                                    <p className="btn btn-outline-danger">Register</p>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </Container>
        </>
    );
}

export default Login;
