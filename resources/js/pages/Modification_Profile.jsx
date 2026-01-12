import { useForm, usePage } from '@inertiajs/react'

export default function EditProfile() {
    const { auth } = usePage().props

    const { data, setData, put, processing, errors, reset } = useForm({
        username: auth.user.username,
        current_password: '',
        password: '',
        password_confirmation: '',
    })

    const submit = (e) => 
    {
        e.preventDefault()
        put('/profile', 
        {
            onSuccess: () => reset('current_password', 'password', 'password_confirmation'),
        })
    }

    return (
        <form onSubmit={submit} className="space-y-4 max-w-md">
            <div>
                <label>Username</label>
                <input type="text" value={data.username} onChange={e => setData('username', e.target.value)} className="input"/>
                {errors.username && <div className="text-red-500">{errors.username}</div>}
            </div>

            <div>
                <label>Current Password</label>
                <input type="password" value={data.current_password} onChange={e => setData('current_password', e.target.value)} className="input"/>
                {errors.current_password && (
                    <div className="text-red-500">{errors.current_password}</div>
                )}
            </div>

            <div>
                <label>New Password</label>
                <input type="password" value={data.password} onChange={e => setData('password', e.target.value)} className="input"/>
                {errors.password && <div className="text-red-500">{errors.password}</div>}
            </div>

            <div>
                <label>Confirm New Password</label>
                <input type="password" value={data.password_confirmation} onChange={e => setData('password_confirmation', e.target.value)} className="input"/>
            </div>

            <button type="submit" disabled={processing} className="btn-primary">
                {processing ? 'Saving...' : 'Save Changes'}
            </button>

            const { flash } = usePage().props

            {flash.success && (
                <div className="text-green-600">
                    {flash.success}
                </div>
            )}
        </form>
    )
}
