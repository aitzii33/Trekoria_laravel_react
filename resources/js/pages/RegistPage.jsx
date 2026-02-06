import { Link, useForm, usePage } from '@inertiajs/react' 
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import { useState } from 'react' 

import Header from '../components/Header'
import '../../css/Register.css'
import "bootstrap/dist/css/bootstrap.min.css"
import logo from '../img/logo.png'  

function RegisterPage()
{
  const { flash } = usePage().props;
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const { data, setData, post, processing, errors } = useForm({
    name: '',
    surname: '',
    birthday: '',
    email: '',
    username: '',
    password: '',
    password_confirmation: ''
  });

  const handleSubmit = (e) => 
  {
    e.preventDefault();
    post(route('register.sendEmail'), 
    { 
      onSuccess: () => 
      {
        setShowConfirmModal(true); 
      }
    });
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

            <p className="text-muted mb-3 text-center">
              Explore unforgettable trips, activities, and experiences worldwide.
            </p>

            {flash?.status && (
              <div className="alert alert-success mb-3">{flash.status}</div>
            )}
            {flash?.error && (
              <div className="alert alert-danger mb-3">{flash.error}</div>
            )}

            <form onSubmit={handleSubmit} className="w-100"> 
              <div className="form-outline mb-2"> 
                <input type="text" className="form-control" placeholder="Introduce your name" value={data.name} onChange={e => setData('name', e.target.value)} required/>
                {errors.name && <small className="text-danger">{errors.name}</small>}
              </div> 

              <div className="form-outline mb-2"> 
                <input type="text" className="form-control" placeholder="Introduce your surname" value={data.surname} onChange={e => setData('surname', e.target.value)} required/>
                {errors.surname && <small className="text-danger">{errors.surname}</small>}
              </div> 

              <div className="form-outline mb-2">
                <input type="date" className="form-control" value={data.birthday} onChange={e => setData('birthday', e.target.value)} required/>
                {errors.birthday && <small className="text-danger">{errors.birthday}</small>}
              </div> 

              <div className="form-outline mb-2"> 
                <input type="email" className="form-control" placeholder="Introduce your email" value={data.email} onChange={e => setData('email', e.target.value)} required/>
                {errors.email && <small className="text-danger">{errors.email}</small>}
              </div> 

              <div className="form-outline mb-2"> 
                <input type="text" className="form-control" placeholder="Introduce your username" value={data.username} onChange={e => setData('username', e.target.value)} required/>
                {errors.username && <small className="text-danger">{errors.username}</small>}
              </div> 

              <div className="form-outline mb-2"> 
                <input type="password" className="form-control" placeholder="Introduce your password" value={data.password} onChange={e => setData('password', e.target.value)} required/>
                {errors.password && <small className="text-danger">{errors.password}</small>}
              </div> 

              <div className="form-outline mb-3"> 
                <input type="password" className="form-control" placeholder="Repeat your password" value={data.password_confirmation} onChange={e => setData('password_confirmation', e.target.value)} required/>
              </div>

              <button type="submit" disabled={processing} className="btn btn-primary w-100 mb-3">
                {processing ? 'Sended...' : 'Register'}
              </button>

              <small className="text-muted d-block text-center">
                By registering, you agree to our Terms & Privacy Policy.
              </small>
            </form>
          </div>

          <div className="col-lg-6 right-panel d-flex flex-column justify-content-center align-items-center text-center p-4 bg-primary text-white" >
            <h2 className="mb-3">Already have an account?</h2>
            <p className="mb-4"> Click below to login and start your adventure! </p>

            <Link href='/login'>
              <button className="btn btn-outline-light px-4 py-2">
                Log in
              </button>
            </Link>
          </div>
        </div>
      </div>

      <Modal isOpen={showConfirmModal} toggle={() => setShowConfirmModal(false)}>
        <ModalHeader toggle={() => setShowConfirmModal(false)}>
          Registration successful!
        </ModalHeader>

        <ModalBody>
          We've sent a confirmation email to your account.
          <br />
          Check your inbox (and spam folder).
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={() => setShowConfirmModal(false)}>
            OK, check email
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default RegisterPage;
