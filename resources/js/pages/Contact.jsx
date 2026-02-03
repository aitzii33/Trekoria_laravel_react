import { ProveEmail, ProveMessage } from '../Funtions'
import { useState } from 'react'
import { usePage, useForm } from '@inertiajs/react'

import Header from '../components/Header'
import Footer from '../components/Footer'

import '../../css/Contact.css'
import "bootstrap/dist/css/bootstrap.min.css"

import error from '../components/alert-error'



function ContactUs() 
{
    const { flash, status: serverStatus } = usePage().props;
    const [status, setStatus] = useState('');

    const { data: form, setData, post, reset } = useForm({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => 
    {
        setData(e.target.name, e.target.value);
    };

    const validateEmail = (value) => 
    {
        if (!value) return false;

        const valid = ProveEmail(value);
        if (!valid) 
        {
            error("The email must contain '@' and '.'");
            return false;
        }
        return true;
    };

    const validateMessage = (value) => 
    {
        if (!value) return false;

        const valid = ProveMessage(value);
        if (!valid) 
        {
            error("The message must be between 20 and 120 characters");
            return false;
        }
        return true;
    };

    const handleSubmit = (e) => 
    {
        e.preventDefault();

        const emailValid = validateEmail(form.email);
        const messageValid = validateMessage(form.message);
        const nameValid = form.name.trim() !== '';

        if (!emailValid || !messageValid || !nameValid) 
        {
            setStatus('Please fix the errors before sending.');
            return;
        }

        setStatus('Sending...');
        post('/contact/send', 
        {
            onSuccess: () => 
            {
                setStatus('Message sent successfully!');
                reset(); 
            },
            onError: () => setStatus('Failed to send message.')
        });
    };

    return (
        <>
            <Header />
            {/*<section className="about-gradient py-5 w-100">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8 text-center text-white">
                            <h1 className="display-5 fw-bold">Contact Us</h1>
                            <p className="lead">Get more closure to Trekoria, we are here to help you!</p>
                        </div>
                    </div>
                </div>
            </section>*/}
            <form id="contact-form" onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-white">
                {flash.status && <p style={{ color: 'green' }}>{flash.status}</p>}

                <h2 className="text-center mb-4">Contact us</h2>

                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" id="name" name="name" className="form-control" value={form.name} onChange={handleChange} required/>
                </div>

                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input type="email" id="email" name="email" className="form-control" value={form.email} onChange={handleChange} onBlur={(e) => validateEmail(e.target.value)} required/>
                </div>

                <div className="mb-3">
                    <label className="form-label">Message</label>
                    <textarea className="form-control" id="message" name="message" rows="4" value={form.message} onChange={handleChange} onBlur={(e) => validateMessage(e.target.value)} required></textarea>
                </div>

                <button id="submit-form" type="submit" className="btn btn-primary w-100">Send</button>

                {status && <p className="text-danger mt-2">{status}</p>}
                {serverStatus && <p className="text-success mt-2">{serverStatus}</p>}
            </form>
        </>
    )
}

export default ContactUs;
