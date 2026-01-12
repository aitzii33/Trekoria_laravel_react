<html>
    <head>
        <title>Reset password</title>
    </head>
    <body>
        <p>Hello {{ $user->name }},</p>
        <p> Click on the next link to reset the password:</p>
        <p>
            <a href="{{ url('/reset-password/'.$token.'?email='.$user->email) }}">
                Change password
            </a>
        </p>
        <p>If you have not request that, ignore it.</p>
    </body>
</html>
