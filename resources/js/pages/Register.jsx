import { useForm, usePage,router } from '@inertiajs/react' 
import { useEffect } from 'react'
import Header from '../Components/Header.jsx'
import Footer from '../Components/Footer.jsx'
import logo from '../assets/img/logo.png'
import '../assets/CSS/Register.css'

function RegisterPage() 
{
  const { flash } = usePage().props  

  const form = useForm({
    name: '',
    surname: '',
    birthday: '',
    email: '',
    username: '',
    password: '',
    password_confirmation: ''
  })


  const Verify = (e) => { 
    e.preventDefault(); 
    form.post(route('register.store'));
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

            {flash?.status && (
              <div className="alert alert-success mb-3">{flash.status}</div>
            )}
            {flash?.error && (
              <div className="alert alert-danger mb-3">{flash.error}</div>
            )}

            <form onSubmit={Verify} className="w-100"> 
              <div className="form-outline mb-2"> 
                <input type="text" className="form-control" placeholder="Introduce your name" value={form.name} onChange={e => form.setData('name', e.target.value)} required/>
                {form.errors.name && <small className="text-danger">{form.errors.name}</small>}
              </div> 

              <div className="form-outline mb-2"> 
                <input type="text" className="form-control" placeholder="Introduce your surname" value={form.surname} onChange={e => form.setData('surname', e.target.value)} required/>
                {form.errors.surname && <small className="text-danger">{form.errors.surname}</small>}
              </div> 

              <div className="form-outline mb-2">
                <input type="date" className="form-control" value={form.birthday} onChange={e => form.setData('birthday', e.target.value)} required/>
                {form.errors.birthday && <small className="text-danger">{form.errors.birthday}</small>}
              </div> 

              <div className="form-outline mb-2"> 
                <input type="email" className="form-control" placeholder="Introduce your email" value={form.email} onChange={e => form.setData('email', e.target.value)} required/>
                {form.errors.email && <small className="text-danger">{form.errors.email}</small>}
              </div> 

              <div className="form-outline mb-2"> 
                <input type="text" className="form-control" placeholder="Introduce your username" value={form.username} onChange={e => form.setData('username', e.target.value)} required/>
                {form.errors.username && <small className="text-danger">{form.errors.username}</small>}
              </div> 

              <div className="form-outline mb-2"> 
                <input type="password" className="form-control" placeholder="Introduce your password" value={form.password} onChange={e => form.setData('password', e.target.value)} required/>
                {form.errors.password && <small className="text-danger">{form.errors.password}</small>}
              </div> 

              <div className="form-outline mb-3"> 
                <input type="password" className="form-control" placeholder="Repeat your password" value={form.password_confirmation} onChange={e => form.setData('password_confirmation', e.target.value)} required/>
              </div>

              <button className="btn btn-primary w-100 mb-3" type="submit" disabled={form.processing} > 
                {form.processing ? 'Enviando...' : 'Register'}
              </button> 

              <small className="text-muted d-block text-center">
                By registering, you agree to our Terms & Privacy Policy.
              </small>
            </form>
          </div>

          <div className="col-lg-6 right-panel d-flex flex-column justify-content-center align-items-center text-center p-4 bg-primary text-white">
            <h2 className="mb-3">Already have an account?</h2>
            <p className="mb-4"> Click below to login and start your adventure! </p>
            <button className="btn btn-outline-light px-4 py-2" onClick={() => form.visit(route('login'))}>
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
