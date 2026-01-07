import logo from '../assets/img/logo.png'
import "../assets/CSS/LogIn.css"
import { useNavigate } from 'react-router-dom'
import { ProveUserPassword  } from '../Funtions'
import Header from '../Components/Header.jsx'
import Footer from '../Components/Footer.jsx'
import { Container } from 'reactstrap'

function Login() 
{
    const navigate = useNavigate();
  
    const NavegateForgot = () => 
    {
        navigate('/ForgotPass');
    };

    const NavegateRegister = () => 
    {
        navigate('/Register');
    };

    const Verify = (e) => 
    {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const data = ProveUserPassword(password, username);

        if(data === false)
        {
            alert('The user name or the password is incorrect');
        }
        else 
        {
            navigate('/Home');
        }
    };


    return(
        <>
            <Header />
        <Container>
            <div className="container py-5 h-100 d-flex justify-content-center align-items-center" onSubmit={Verify}>
                <div className="card rounded-3 text-black col-xl-10 col-lg-6 p-md-5 mx-md-4">
                    <div className="text-center">
                        <img src={logo} alt="logo" style={{ width: "185px" }}/>
                        </div>

                        <form onSubmit={Verify} > 
                        <div className="form-outline mb-4">
                            <input type="email" className="form-control" id="username" placeholder="Introduce your username"/>
                            <label className="form-label" id="username"></label>
                        </div>

                        <div className="form-outline mb-4">
                            <input type="password" className="form-control" id="password" placeholder="Introduce your password"/>
                            <label className="form-label" id="password"></label>
                        </div>

                        <div className="text-center pt-1 mb-5 pb-1">
                            <button className="btn btn-primary btn-block fa-lg mb-3" type="submit"> Log in </button>
                            <br></br>
                            <br></br>
                            <a className="text-muted" onClick={NavegateForgot}> Forgot password/user? </a>
                        </div>

                        <div className="d-flex align-items-center justify-content-center pb-4">
                            <p className="mb-0 me-2">Don't have an account?</p>
                            <a className="btn btn-outline-danger" onClick={NavegateRegister}> Register </a>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
            </Container>
        </>
        
    );
}

export default Login;