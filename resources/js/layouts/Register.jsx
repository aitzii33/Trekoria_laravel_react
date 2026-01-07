import logo from '../assets/img/logo.png'
import { IfExistEmail, ProveUserName, samePass } from '../Funtions'
import Header from '../Components/Header.jsx'
import Footer from '../Components/Footer.jsx'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import '../assets/CSS/Register.css'

function RegisterPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const Verify = (e) => { 
    e.preventDefault(); 
    console.log('Verify ejecutado');
    console.log('email:', email);
    console.log('username:', username);
    console.log('password:', password, password2);

    
    const dataEmail = IfExistEmail(email); 
    const dataUser = ProveUserName(username); 
    const samePassResult = samePass(password, password2); 
 
    if(dataEmail === false) 
    {
      alert("The email must contain @ and ."); 
    } 
    else if(dataUser === false) 
    {
      alert('That user already exists'); 
    } 
    else if(samePassResult === false) 
    {
      alert('Passwords do not match'); 
    } 
    else 
    {
      navigate('/LogIn'); 
    } 
  }; 
 
  return ( 
    <> 
      <Header />
      <div className="container py-5 d-flex justify-content-center align-items-center">
        <div className="card register-card shadow d-flex flex-row col-xl-8 col-lg-10 col-md-11 p-0 overflow-hidden">
          <div className="col-lg-6 left-panel p-4 d-flex flex-column justify-content-start align-items-center bg-light">

            <div className="logo mb-2">
              <img src={logo} alt="logo" className="logo-img" />
            </div>

            <h1 className="fw-bold mb-3 text-center">Welcome to Tripify 🌍</h1>
            <p className="text-muted mb-3 text-center">
              Explore unforgettable trips, activities, and experiences worldwide.
            </p>

            <form onSubmit={Verify} className="w-100"> 
              <div className="form-outline mb-2"> 
                <input type="text" className="form-control" placeholder="Introduce your name" required/> 
              </div> 
              <div className="form-outline mb-2"> 
                <input type="text" className="form-control" placeholder="Introduce your surname" required/> 
              </div> 
              <div className="form-outline mb-2"> 
                <input type="date" className="form-control" placeholder="Introduce your birthday" required/> 
              </div> 
              <div className="form-outline mb-2"> 
                <input type="text" id="email" className="form-control" placeholder="Introduce your email" onChange={e => setEmail(e.target.value)} required/> 
              </div> 
              <div className="form-outline mb-2"> 
                <input type="text" id="username" className="form-control" placeholder="Introduce your username" onChange={e => setUsername(e.target.value)} required/> 
              </div> 
              <div className="form-outline mb-2"> 
                <input type="password" id="password" className="form-control" placeholder="Introduce your password" onChange={e => setPassword(e.target.value)} required/> 
              </div> 
              <div className="form-outline mb-3"> 
                <input type="password" id="password2" className="form-control" placeholder="Repeat your password" onChange={e => setPassword2(e.target.value)} required/> 
              </div> 

              <button className="btn btn-primary w-100 mb-3" type="submit"> Register </button> 
              <small className="text-muted d-block text-center">
                By registering, you agree to our Terms & Privacy Policy.
              </small>
            </form>
          </div>

          <div className="col-lg-6 right-panel d-flex flex-column justify-content-center align-items-center text-center p-4 bg-primary text-white">
            <h2 className="mb-3">Already have an account?</h2>
            <p className="mb-4"> Click below to login and start your adventure! </p>
            <button className="btn btn-outline-light px-4 py-2" onClick={() => navigate('/LogIn')} >
              Login
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default RegisterPage;
