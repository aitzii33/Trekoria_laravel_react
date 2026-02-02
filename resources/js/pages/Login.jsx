import logo from '../img/logo.png'

import "../../css/LogIn.css"

import { useState } from 'react'
import { router, Link } from '@inertiajs/react' 
import { Container } from 'reactstrap'

import Header from '../components/Header'
import Footer from '../components/Footer'


function Login() 
{
    const [status, setStatus] = useState('');
    const [user_name, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [form, setForm] = useState({ user_name: '', password: ''});
 
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

                            <input type="checkbox" id='remember' placeholder='Remember me'></input>

                            <div className="text-center pt-1 mb-5 pb-1">
                                <button className="btn btn-primary btn-block fa-lg mb-3" type="submit">Log in</button>
                                {status && <p className="text-danger">{status}</p>}
                            </div>

                            <div className="d-flex align-items-center justify-content-center pb-4">
                                <p className="mb-0 me-2">Don't have an account?</p>

                                <Link href="/Register">
                                    <p className="btn btn-outline-danger">Register</p>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </Container>
            <Footer />
        </>
    )
}

export default Login;
