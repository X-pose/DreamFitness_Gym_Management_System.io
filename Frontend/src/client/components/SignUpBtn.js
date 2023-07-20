import  {useState} from 'react';
import { GoogleLogin } from 'react-google-login';
import '../../public/css/Signupx.css'
import axios from 'axios';
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
        const options = {
            headers:{
                'Content-Type' : 'application/json'
            }
        }
        await axios.post('/api/signupformdata',JSON.stringify(newUser), options)
        .then(res=>{
           
            console.log('New user added', res.data);
        
            setTimeout(function() {
              window.location.href = '/Login'
            }, 4000);
            setTimeout();
        })
        .catch(()=>{
            console.log("Caught runtime error at signUPBtn")
        })
       
      
        
        
    }

    const OnFailure = (res) => {
        window.location.href = '/SignUp';
    }

    return (
        <div className='googleReg' id="signInButton">
            <GoogleLogin 
                clientId={clientID}
                render={(renderProps) => (
                    <button
                      className='googleSignup'
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    >
                      SignUp
                    </button>
                  )}
                onSuccess={OnSuccess}
                onFailure={OnFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
                
            />
        </div>
    )
}

export default SignUpBtn;
