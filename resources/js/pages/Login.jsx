import { router, Link } from '@inertiajs/react' 
import { Container } from 'reactstrap'
import { useState, useEffect } from 'react'

import Header from '../components/Header'

import "../../css/LogIn.css"
import "bootstrap/dist/css/bootstrap.min.css"

import logo from '../img/logo.png'


function Login() 
{
    const [status, setStatus] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [form, setForm] = useState({ user_name: '', password: ''});

    useEffect(() => 
    {
        const saved = localStorage.getItem('rememberMe');

        if (saved === 'true') 
        {
            setRememberMe(true);
        }
    }, []);
 
    const Verify = (e) => 
    { 
        e.preventDefault(); 

        if (!form.user_name || !form.password) 
        {
            setStatus('Please enter user name and password.');
            return;
        }

        const dataPassword = PasswordsCharacters(password);
     
        if(dataPassword === false)
        {
            error("The password can't have more than 18 characters");
        }
        else 
        {
            router.visit(route('home')); 
        } 

        if (rememberMe) 
        {
            localStorage.setItem('userToken', token);
        }
    };
    
    const handleRememberChange = (e) => 
    {
        const isChecked = e.target.checked;
        setRememberMe(isChecked);
        localStorage.setItem('rememberMe', isChecked);
    };

    const handleLogin = (e) => 
    {
        e.preventDefault(); 
        post('/login/prove'); 
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
 
                        <form onSubmit={Verify} > 
                            <div className="form-outline mb-4">
                                <input type="text" className="form-control" name="user_name" onBlur={(e) => setUsername(e.target.value)}  placeholder="Introduce your email" required/>
                            </div>
 
                            <div className="form-outline mb-4">
                                <input type="password" className="form-control" name="password" onBlur={(e) => setPassword(e.target.value)} placeholder="Introduce your password" required/>
                            </div>

                            <div className="checkbox-container" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                                <input type="checkbox" id="remember" checked={rememberMe} onChange={handleRememberChange}/>
                                <label htmlFor="remember" style={{ margin: 0 }}>Remember me</label>
                            </div>

                            <div className="text-center pt-1 mb-5 pb-1">
                                <button onClick={handleLogin} className="btn btn-primary w-100 mb-3">
                                    Log in
                                </button>
                                {status && <p className="text-danger">{status}</p>}

                                <Link href="/forgotPass">
                                    <p className="link" style={{ color:'black' }}>Forgot password/user?</p>
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
    )
}

export default Login;
