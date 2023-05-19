import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';


export default function AccountNavBlock() {

    const [sessionNameCookie, setSessionNameCookie] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [admin, setAdmin] = useState(false)

    useEffect(() => {

        const CookieName = Cookies.get('sessionName');
        if (CookieName != null) {
            setSessionNameCookie(CookieName);
            setLoggedIn(true);

            if (CookieName === 'AdminUser') {
                setAdmin(true);
            }
        }
    }, [window.location.href]);

    return (
        <div>
            {loggedIn ? (
                <div>
                    {admin ? (
                        <div>
                            <a href="/AdminMainPage" style={{ color: 'white', textDecoration: 'none' }}>Wellcome, {sessionNameCookie}</a>

                        </div>
                    ) : (
                        <div>
                            <a href="/MyAccount" style={{ color: 'white', textDecoration: 'none' }}>Wellcome, {sessionNameCookie}</a>

                        </div>
                    )}
                </div>


            ) : (
                <div>
                    <a href="/PleaseLogin" style={{ color: 'white', textDecoration: 'none' }}>MyAccount</a>
                </div>
            )}
        </div>
    );
}
