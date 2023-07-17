import { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import Cookies from 'js-cookie';
import axios from 'axios';

const clientID = "796411994962-2uhaa7a0obchg0ukk0oirgor4a56ghlh.apps.googleusercontent.com";


function LoginBtn() {

    const [userName, setuserName] = useState('')
    const [psw, setpsw] = useState('')



    const OnSuccess = async (res) => {

        setuserName(res.profileObj.name)
        setpsw(res.profileObj.email)

        console.log(userName + ' ' + psw)

        const logUser = { userName, psw }

        const options = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        await axios.post('/api/loginformdata', JSON.stringify(logUser), options)
       .then(response=>{
        const sessionName = response.headers.get('sessionName');
        Cookies.set('sessionName', sessionName);
        console.log(Cookies.get(sessionName))
        
        console.log('User logged in',response.data)
        setTimeout(function () {
            window.location.href = '/MyAccount'
        }, 1000);
        setTimeout();
       })
       .catch(()=>{
        console.log("Error in loginBtn caught")
       })
       

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
