import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';


export default function SignUpHeader(){

    
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {

        const CookieName = Cookies.get('sessionName');
        if(CookieName != null){
            
            setLoggedIn(true);
        }
    }, [window.location.href]);

    return(
        <div>
            {loggedIn ? (
                <div>
                   
                </div>   
            ) : (
                <div>
                    <a href  ="/SignUp" style={{color: 'white', textDecoration: 'none'}}>Signup</a>
                </div>
            )}
        </div>  
    );
}
