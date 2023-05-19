
import React from 'react';
import '../../public/css/accDisUpd.css'

function PleaseLogin(){

    function redirectLogin(){
        window.location.href = '/Login'
    }

    function redirectSignUp(){
        window.location.href = '/SignUp'
    }

    return(
        <div>
            <div className='formBackground'>
                <h1 className='warning'><b><u>WARNING!</u></b></h1><br/>
                <h3>Please Login or SignUp</h3><br/>
                <button onClick={redirectLogin} className='logBtn'>Login</button>
                <button onClick = {redirectSignUp} className='logBtn'>Sign Up</button>

            </div>
        </div>
    )
}

export default PleaseLogin;