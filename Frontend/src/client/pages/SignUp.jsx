import React from 'react';
import { gapi } from 'gapi-script'
import '../../public/css/Login.css';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignUpBtn from '../components/SignUpBtn';
import {validations} from '../../public/js/Validation'
import '../../public/css/Signupx.css'
<script src="https://apis.google.com/js/platform.js" async defer></script>




function SignUp() {


  const clientId = "796411994962-2uhaa7a0obchg0ukk0oirgor4a56ghlh.apps.googleusercontent.com"


  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: ''
      })
    };

    gapi.load('client:auth2', start);
  })


  const [userName, setuserName] = useState('')
  const [fName, setfName] = useState('')
  const [lName, setlName] = useState('')
  const [email, setemail] = useState('')
  const [contactNo, setcontactNo] = useState('')
  const [psw, setpsw] = useState('')
  const [repsw, setRePsw] = useState('')
  const [Error, setError] = useState('')



  const handleUserNameChange = (e) => {
    setuserName(e.target.value);
  };

  const handlefNameChange = (e) => {
    setfName(e.target.value);
  };

  const handlelNameChange = (e) => {
    setlName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setemail(e.target.value);
  };

  const handleContactNoChange = (e) => {
    setcontactNo(e.target.value);
  };

  const handlePswChange = (e) => {
    setpsw(e.target.value);
  };

  const handleRePswChange = (e) => {
    setRePsw(e.target.value);
  };



  const RegSubmit = async (e) => {
    e.preventDefault();

    //Creating an instance from validation class
    const signUpValidations = new validations();

    //Passing parameters to validate
    const warnMsg = signUpValidations.SignUpvalidator(userName,fName,lName,email,contactNo,psw,repsw);

    if(warnMsg !== null){
      toast.warning(warnMsg, {
        position: toast.POSITION.TOP_RIGHT,
          theme: 'dark'
      });
    }else{
      const newUser = { userName, fName, lName, email, contactNo, psw }
      const response = await fetch('/api/signupformdata', {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: {
          'Content-Type': 'application/json'
        }
      })
  
      const json = await response.json()
      if (!response.ok) {
        setError(json.Error)
        toast.error('Something went wrong. Please try again', {
          position: toast.POSITION.TOP_RIGHT,
          theme: 'dark'
        });
        console.log(json)
  
      }
      if (response.ok) {
  
        setError(null)
        console.log('New user added', json);
  
        toast.success('Signed up succesfully!\nPlease Login', {
          position: toast.POSITION.TOP_RIGHT,
          theme: 'dark'
        });
  
        setTimeout(function () {
          window.location.href = '/Login'
        }, 4000);
        setTimeout();
      }
    }
   

   
  }

  return (

    <div className='signupbodyback'>
      <ToastContainer autoClose={3000} />
      <div className="signup-form">

        <form onSubmit={RegSubmit}>
          <div className="Signup-header">
            <h1>REGISTER</h1>
          </div>
          <div className="login-body">
            <div className="form-group">
              <input type="text" onChange={handleUserNameChange} value={userName} required placeholder='    UserName' />
            </div>
            <div className="form-group">
              <input type="text" onChange={handlefNameChange} value={fName} required placeholder='    First Name' />
            </div>
            <div className="form-group">
              <input type="text" onChange={handlelNameChange} value={lName} required placeholder='    Last Name' />
            </div>
            <div className="form-group">
              <input type="email" onChange={handleEmailChange} value={email} required placeholder='Email' />
            </div>
            <div className="form-group">
              <input type="number" onChange={handleContactNoChange} value={contactNo} required placeholder='     Contact No' />
            </div>
            <div className="form-group">
              <input type="password" onChange={handlePswChange} value={psw} id="passwordReg" name="passwordReg" required placeholder='Password' />
            </div>
            <div className="form-group">
              <input type="password" id="rePswReg" onChange={handleRePswChange} name="rePswReg" required placeholder='Retype password' />
            </div>






            <div >
              <button className="RegBtn" type="submit">Register</button>
            </div>
            <span className='orCss'>----Or Sign In with Google---- </span>
            <div className="form-groupReg">
              <meta name="google-signin-client_id" content="796411994962-2uhaa7a0obchg0ukk0oirgor4a56ghlh.apps.googleusercontent.com.apps.googleusercontent.com" />
              <div className="g-signin2" data-onsuccess="onSignIn"></div>
              <SignUpBtn />

            </div>
          </div>
        </form>
      </div>
    </div>

  );
}

export default SignUp;
