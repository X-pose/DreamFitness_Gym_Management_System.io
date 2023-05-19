import  {useState} from 'react';
import { GoogleLogin } from 'react-google-login';
import Cookies from 'js-cookie';
import '../../public/css/Signupx.css'
const clientID = "796411994962-2uhaa7a0obchg0ukk0oirgor4a56ghlh.apps.googleusercontent.com";


function SignUpBtn() {

    const[userName, setuserName] = useState('')
    const[fName, setfName] = useState('')
    const[lName, setlName] = useState('')
    const[email, setemail] = useState('')
    const[contactNo, setcontactNo] = useState('')
    const[psw, setpsw] = useState('')

    const[Error,setError] = useState('')

    const OnSuccess = async(res) => {

        

        setuserName(res.profileObj.name)
        setfName(res.profileObj.givenName)
        setlName(res.profileObj.familyName)
        setemail(res.profileObj.email)
        setcontactNo('N/A')
        setpsw(res.profileObj.email)

        console.log(userName + ' ' + fName+ ' ' +lName+ ' ' +email+ ' ' +contactNo+ ' ' +psw)

        const newUser = {userName,fName,lName,email,contactNo,psw}
        const response = await fetch('/api/signupformdata',{
            method: 'POST',
            body: JSON.stringify(newUser),
            headers:{
                'Content-Type' : 'application/json'
            }
        })

        const json = await response.json()
        if(!response.ok){
            setError(json.Error)
           
        }
        if(response.ok){
            
            setError(null)
            console.log('New user added', json);
            
           
            setTimeout(function() {
              window.location.href = '/Login'
            }, 4000);
            setTimeout();
        }
        
        
    }

    const OnFailure = (res) => {
        window.location.href = '/SignUp';
    }

    return (
        <div className='googleReg' id="signInButton">
            <GoogleLogin
                clientId={clientID}
                buttonText='SignUp'
                onSuccess={OnSuccess}
                onFailure={OnFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
    )
}

export default SignUpBtn;
