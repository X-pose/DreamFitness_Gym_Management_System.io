import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';


export default function LoginLogout(){

    const [sessionNameCookie, setSessionNameCookie] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {

        const CookieName = Cookies.get('sessionName');
        if(CookieName != null){
            setSessionNameCookie(CookieName);
            setLoggedIn(true);
        }
    }, [window.location.href]);

    
  async function logOutUser(){
    const resp = await fetch('/api/logout',{
      method: 'POST',
      
    })

    
    if (resp.ok) {
        Cookies.remove('sessionName')
        window.location.href = '/'
      
    }
  }


    return(
        <div>
            {loggedIn ? (
                <div>
                    <a href = "" onClick={logOutUser} style={{color: 'white', textDecoration: 'none'}}>Logout</a>
                    
                </div>   
            ) : (
                <div>
                    <a href="/Login" style={{color: 'white', textDecoration: 'none'}}>Login</a>
                </div>
            )}
        </div>  
    );
}
