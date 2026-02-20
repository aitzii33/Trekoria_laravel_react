import { Link, useForm, usePage } from '@inertiajs/react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { useState } from 'react';

import '../../css/Register.css';
import "bootstrap/dist/css/bootstrap.min.css";
import RegisterImage from '../img/Boat.avif'; // same style image

function RegisterPage() {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('register.sendEmail'), {
      onSuccess: () => setShowConfirmModal(true)
    });
  };

  return (
    <div className="register-container d-flex justify-content-center align-items-center min-vh-100">

      <div className="d-flex register-card shadow overflow-hidden" style={{ maxWidth: '900px', width: '100%' }}>

        {/* Left Panel: Form */}
        <div className="d-flex flex-column justify-content-center p-5" style={{ flex: 1, backgroundColor: '#fff' }}>
          <h3 className="text-center mb-4">Create Account</h3>

          {flash?.status && <div className="alert alert-success">{flash.status}</div>}
          {flash?.error && <div className="alert alert-danger">{flash.error}</div>}

          <form onSubmit={handleSubmit} className="w-100">
            {/* Name */}
            <div className="form-outline mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={data.name}
                onChange={e => setData('name', e.target.value)}
                required
              />
              {errors.name && <small className="text-danger">{errors.name}</small>}
            </div>

            {/* Surname */}
            <div className="form-outline mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Surname"
                value={data.surname}
                onChange={e => setData('surname', e.target.value)}
                required
              />
              {errors.surname && <small className="text-danger">{errors.surname}</small>}
            </div>

            {/* Birthday */}
            <div className="form-outline mb-3">
              <input
                type="date"
                className="form-control"
                value={data.birthday}
                onChange={e => setData('birthday', e.target.value)}
                required
              />
              {errors.birthday && <small className="text-danger">{errors.birthday}</small>}
            </div>

            {/* Email */}
            <div className="form-outline mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={data.email}
                onChange={e => setData('email', e.target.value)}
                required
              />
              {errors.email && <small className="text-danger">{errors.email}</small>}
            </div>

            {/* Username */}
            <div className="form-outline mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                value={data.username}
                onChange={e => setData('username', e.target.value)}
                required
              />
              {errors.username && <small className="text-danger">{errors.username}</small>}
            </div>

            {/* Password */}
            <div className="form-outline mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={data.password}
                onChange={e => setData('password', e.target.value)}
                required
              />
              {errors.password && <small className="text-danger">{errors.password}</small>}
            </div>

            {/* Confirm Password */}
            <div className="form-outline mb-4">
              <input
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                value={data.password_confirmation}
                onChange={e => setData('password_confirmation', e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100 mb-3" disabled={processing}>
              {processing ? 'Sending...' : 'Register'}
            </button>

            <div className="d-flex justify-content-center mt-2">
              <p className="mb-0 me-2 small text-muted">Already registered?</p>
              <Link href={route('login')} className="small" style={{ textDecoration: 'underline', color: '#329ac6', fontWeight: 500 }}>
                Log in
              </Link>
            </div>
          </form>
        </div>

        {/* Right Panel: Image & Welcome */}
        <div className="d-flex flex-column align-items-center justify-content-center text-center p-5" style={{ flex: 1, backgroundColor: '#f0f8ff' }}>
          <h1 className="fw-bold mb-3" style={{ color: '#329ac6', fontSize: '2.5rem' }}>
            Welcome to Trekoria
          </h1>
          <p className="mb-4 text-muted" style={{ fontSize: '1.1rem', maxWidth: '350px' }}>
            Plan your next adventure with us!
          </p>
          <img
            src={RegisterImage}
            alt="Welcome Illustration"
            className="img-fluid"
            style={{ borderRadius: '12px', boxShadow: '0 8px 20px rgba(0,0,0,0.1)', maxWidth: '400px' }}
          />
        </div>

      </div>

      {/* Modal */}
      <Modal isOpen={showConfirmModal} toggle={() => setShowConfirmModal(false)}>
        <ModalHeader toggle={() => setShowConfirmModal(false)}>
          Registration successful!
        </ModalHeader>
        <ModalBody>
  Registration successful! Press OK to go to login.
</ModalBody>
<ModalFooter>
  <Button color="primary" onClick={() => window.location.href = route('login')}>OK</Button>
</ModalFooter>
      </Modal>

    </div>
  );
}

export default RegisterPage;