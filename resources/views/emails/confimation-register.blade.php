<h1>Confirm your register!</h1>
<p>Hola {{ $pendingData['name'] }}, Click to activate:</p>
<a href="{{ route('register.confirm', $pendingData['token']) }}" style="background:#007bff;color:white;padding:10px 20px;text-decoration:none;">
    Confirm account
</a>
