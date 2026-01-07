import logo from '../assets/img/logo.png'
import "../assets/CSS/LogIn.css"
import { useState } from 'react'
import { Inertia } from '@inertiajs/inertia'
import { usePage } from '@inertiajs/inertia-react'
import Header from '../Components/Header.jsx'
import Footer from '../Components/Footer.jsx'
import { Container } from 'reactstrap'

function Login() 
{
    const { status: serverStatus } = usePage().props
    const [status, setStatus] = useState('');

    const [form, setForm] = useState({ email: '', password: ''})
 
    const handleChange = (e) => 
    { 
        setForm({...form, [e.target.name]: e.target.value});
    }
 
    const handleLogin = (e) => 
    { 
        e.preventDefault(); 
 
        if (!form.email || !form.password) 
        {
            setStatus('Please enter email and password.');
            return;
        }

        Inertia.post('/login', form);
        setStatus('Logging in...');
    }

    return (
        <> 
            <Header /> 
            <Container>
                <div className="container py-5 h-100 d-flex justify-content-center align-items-center">
                    <div className="card rounded-3 text-black col-xl-10 col-lg-6 p-md-5 mx-md-4">
                        <div className="text-center">
                            <img src={logo} alt="logo" style={{ width: "185px" }} />
                        </div> 
 
                        <form onSubmit={handleLogin} > 
                            <div className="form-outline mb-4">
                                <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} placeholder="Introduce your email" required/>
                            </div>
 
                            <div className="form-outline mb-4">
                                <input type="password" className="form-control" name="password" value={form.password} onChange={handleChange} placeholder="Introduce your password" required/>
                            </div>

                            <div className="text-center pt-1 mb-5 pb-1">
                                <button className="btn btn-primary btn-block fa-lg mb-3" type="submit">Log in</button>
                                {status && <p className="text-danger">{status}</p>}
                                {serverStatus && <p className="text-danger">{serverStatus}</p>}
                            </div>

                            <div className="d-flex align-items-center justify-content-center pb-4">
                                <p className="mb-0 me-2">Don't have an account?</p>
                                <a className="btn btn-outline-danger" href="/register">Register</a>
                            </div>
                        </form>
                    </div>
                </div>
            </Container>
            <Footer />
        </>
    )
}

export default Login
