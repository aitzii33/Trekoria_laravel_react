import '../assets/CSS/Contact.css'
import { ProveEmail,  ProveMessage  } from '../Funtions'
import Header from '../Components/Header'
import { useState } from 'react';
import emailjs from '@emailjs/browser';
import Footer from '../Components/Footer';

function ContactUs()
{
// validate email value (called from onBlur or submit)
const validateEmail = (value) => {
    if (!value) return false;
    const dataEmail = ProveEmail(value);

    if (dataEmail === false) {
        alert("The email must contain '@' and '.'");
        return false;
    }

    return true;
};

// validate message value (called from onBlur or submit)
const validateMessage = (value) => {
    if (!value) return false;
    const dataMessage = ProveMessage(value);

    if (dataMessage === false) {
        alert("The message must be between 20 and 120 characters");
        return false;
    }

    return true;
};

const [status, setStatus] = useState('');

const enviarEmail = (e) => {
    e.preventDefault();

    const form = e.target;
    const emailValue = form.email.value;
    const messageValue = form.message.value;
    const nameValue = form.name.value;

    // Run validations
    const emailValid = validateEmail(emailValue);
    const messageValid = validateMessage(messageValue);
    const nameValid = nameValue.trim() !== '';

    if (!emailValid || !messageValid || !nameValid) {
        setStatus('Error');
        return;
    }

    // Only send if all validations passed
    emailjs.sendForm(
        'SERVICE_ID',
        'TEMPLATE_ID',
        form,
        'PUBLIC_KEY'
    ).then(
        () => {
            setStatus('Enviado!');
            alert('Message sent!'); // Only shown if everything validated
        },
        () => {
            setStatus('Error');
            alert('Error sending message!');
        }
    );
};


    return(
        <>
            <Header/>
            <section className="about-gradient py-5 w-100">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="text-center text-white">
                                <h1 className="display-5 fw-bold">Contact Us</h1>
                                <p className="lead">
                                    Get more closure to Trekoria, we are here to help you!
                                </p>
                            </div>
                        </div>
                    </div>
                    </div>
                </section>
            
            <form id="contact-form" action="mail.php" method="POST" onSubmit={enviarEmail} className="p-4 border rounded shadow-sm bg-white">
                <h2 className="text-center mb-4">Contact us</h2>

                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" id="name" name="name" className="form-control" required/>
                </div>

                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input type="text" id="email" name="email" className="form-control" onBlur={(e) => validateEmail(e.target.value)} required/>
                </div>

                <div className="mb-3">
                    <label className="form-label">Message</label>
                    <textarea className="form-control" type="text" id="message" name="message" rows="4" onBlur={(e) => validateMessage(e.target.value)} required></textarea>
                </div>

                <button id="submit-form" type="submit" className="btn btn-primary w-100"> Send </button>
                {status && <p>{status}</p>}
            </form>
            <Footer/>
        </>
    );
}

export default ContactUs;