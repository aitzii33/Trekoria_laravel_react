<html>
    <head>
        <title>Reset Password</title>
    </head>
    <body>
        <p>Hello {{ $user->name }},</p>
        <p>Click the link below to reset your password:</p>
        <p>
            <a href="{{ $url }}">
                Change Password
            </a>
        </p>
        <p>If you did not request a password reset, please ignore this email.</p>
    </body>
</html>
