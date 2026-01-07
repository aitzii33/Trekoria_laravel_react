import '../assets/CSS/Contact.css'
import { IfExistEmail  } from '../Funtions'

function ForgotPass()
{
    const Verify = (e) => 
    {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const dataEmail = IfExistEmail(email);
        
        if(dataEmail === false)
        {
            alert("This email isn't exist yet");
        }

        alert('The email have sended');
    };


    return(
        <>
            <form id="contact-form" action="mail.php" method="POST" onSubmit={Verify} className="p-4 border rounded shadow-sm bg-white">
                <h2 className="text-center mb-4">Forgot</h2>

                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input type="text" id="email" name="email" className="form-control"/>
                </div>

                <button id="submit-form" type="submit" className="btn btn-primary w-100"> Send </button>
            </form>
        </>
    );
}

export default ForgotPass;