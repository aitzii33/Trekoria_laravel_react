export function ProveUserName(username)
{
    //check if that username exist
}


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


//The message have to be between 20 and 120 characters
export function ProveMessage(message)
{
    if(message.length < 20 || message.length > 120)
    {
        return false;
    }
}


//Check user name and password
export function ProveUserPassword(password, username)
{
    //The database data is needed for verification
    if(!password && !username)
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
        //
    }
}