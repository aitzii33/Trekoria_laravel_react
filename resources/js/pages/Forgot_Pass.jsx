import '../assets/css/Contact.css'

function ForgotPass()
{
    const [email, setEmail] = useState('');

    const Verify = (e) => 
    {
        e.preventDefault();

        Inertia.post('/forgot.perform', { email });
    };


    return(
        <>
            <form id="contact-form" action="mail.php" method="POST" onSubmit={Verify} className="p-4 border rounded shadow-sm bg-white">
                <h2 className="text-center mb-4">Forgot</h2>

                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input type="text" id="email" name="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </div>

                <button id="submit-form" type="submit" className="btn btn-primary w-100"> Send </button>
            </form>
        </>
    );
}

export default ForgotPass;