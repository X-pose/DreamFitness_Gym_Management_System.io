import { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import Cookies from 'js-cookie';

const clientID = "796411994962-2uhaa7a0obchg0ukk0oirgor4a56ghlh.apps.googleusercontent.com";


function LoginBtn() {

    const [userName, setuserName] = useState('')
    const [psw, setpsw] = useState('')

    const [Error, setError] = useState('')

    const OnSuccess = async (res) => {

        setuserName(res.profileObj.name)
        setpsw(res.profileObj.email)

        console.log(userName + ' ' + psw)

        const logUser = { userName, psw }
        const response = await fetch('/api/loginformdata', {
            method: 'POST',
            body: JSON.stringify(logUser),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()
        if (!response.ok) {
            setError(json.Error)
           
        }
        if (response.ok) {
           
            const sessionName = response.headers.get('sessionName');
            Cookies.set('sessionName', sessionName);
            console.log(Cookies.get(sessionName))
            setError(null)
            console.log('User logged in', json)
            setTimeout(function () {
                window.location.href = '/MyAccount'
            }, 1000);
            setTimeout();

        }

    }

    const OnFailure = (res) => {
        window.location.href = '/SignUp';
    }

    return (
        <div id="signInButton">
            <GoogleLogin
                clientId={clientID}
                buttonText='Login'
                onSuccess={OnSuccess}
                onFailure={OnFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
    )
}

export default LoginBtn;
