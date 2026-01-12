import { useEffect } from 'react';
import { router } from '@inertiajs/react';

export default function LoginAlert({ message, redirect }) 
{
    useEffect(() => 
    {
        alert(message); 
        router.visit(redirect);
    }, []);

    return null; 
}
