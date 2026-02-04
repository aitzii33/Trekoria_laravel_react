<!DOCTYPE html>
<html>
    <head>
        <title>Confirm your registration</title>
    </head>
    <body>
        <h2>Hello {{ $user->name }} {{ $user->surname }}!</h2>
        
        <p>Thank you for registering. Confirm your account by clicking here:</p>
        
        <a href="{{ route('register.confirm', $user->pending_token) }}" 
        style="background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">
            Confirm account
        </a>
        
        <p>Or copy this link: {{ route('register.confirm', $user->pending_token) }}</p>
        
        <p>Greetings!</p>
    </body>
</html>
