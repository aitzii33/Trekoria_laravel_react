//To see the email they have enter have @ and .
export function ProveEmail(email)
{
    if(!email.includes('@') && !email.includes('.'))
    {
        return false;
    }
}

export function samePass(pass1, pass2)
{
    if(pass1.localcompare(pass2) != 0)
    {
        return false;
    }
}

//The password can't be more than 18 characters
export function PasswordsCharacters(password)
{
    if(password.length > 18)
    {
        return false;
    }
}


//The message have to be between 20 and 120 characters
export function ProveMessage(message)
{
    if(message.length < 20 || message.length > 120)
    {
        return false;
    }
}


export function ProveUserName(username)
{
    //check if that username exist
    $user = DB::table('user')->where('user_name', username);
}


//Check user name and password
export function ProveUserPassword(password, username)
{
    //The database data is needed for verification
    $user = DB::table('user')->where('user_name', username);
    $pass = DB::table('user')->where('password', password);

    if(password != pass || username != user)
    {
        return false;
    }
}

export function IfExistEmail(email)
{
    const data = ProveEmail(email);

    //Check if the email is in the database
    if(data == true)
    {
        $email = DB::table('user')->where('email', email);
    }
}