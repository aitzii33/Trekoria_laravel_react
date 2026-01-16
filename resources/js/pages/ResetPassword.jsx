import { router, usePage } from '@inertiajs/react'


export default function ResetPassword({ token, email: initialEmail }) 
{
    const [email, setEmail] = useState(initialEmail || '');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    const handleSubmit = (e) => 
    {
        e.preventDefault();

        router.post('/reset-password', 
        {
            token,
            email,
            password,
            password_confirmation: passwordConfirmation,
        });
    };

    return (
        <div>
            <h1>Change password</h1>

            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} required/>

                <input type="password" placeholder="New password" value={password} onChange={(e) => setPassword(e.target.value)} required/>

                <input type="password" placeholder="Confirm password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} required />

                <button type="submit">Change password</button>
            </form>
        </div>
    );
}
