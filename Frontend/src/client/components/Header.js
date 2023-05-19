import React from 'react'
import '../../public/css/header.css'

import AccountNavBlock from './accountNavBlock'
import LoginLogoutBtn from './loginLogout'
import SignUpHeader from './signUpHeader'

export default function Header() {

  function logout() {
    const confirmed = window.confirm('Are you sure you want to log out?');
    if (confirmed) {
      const logout = async () => {
        const response = await fetch('/api/logout', {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json'
          }
        })

        const json = await response.json()

        if (response.ok) {


          window.location.href = '/Home'
        }
      }
      console.log('Logged out successfully');
      logout();
    } else {
      // Do nothing
    }
  }

  return (

    <div className='Header-possitioning'>
      <div className="red-header2">
        <div className="red-header">

          <span className="logo">DMF</span>
          <span className="logo2"  > DREAM FITNESS </span>


        </div>



        <div className="navbar">

          <nav className="homeCol"><a href="/" style={{ color: 'red', textDecoration: 'none' }}>HOME</a> </nav>
          <a href='' style={{ color: 'white', textDecoration: 'none' }}>
            <nav >ABOUT</nav>
          </a>
          <a href='' style={{ color: 'white', textDecoration: 'none' }}>
            <nav>GALLERY</nav>
          </a>

          <a href='/ViewOnlyInstructors' style={{ color: 'white', textDecoration: 'none' }}>
            <nav>OUR CREW</nav>
          </a>

          <a href='/faqCustom' style={{ color: 'white', textDecoration: 'none' }}>
            <nav>F A Q</nav>
          </a>

          <a href='/ViewFeedback' style={{ color: 'white', textDecoration: 'none' }}>
            <nav>FEEDBACK</nav>
          </a>

          <nav > <SignUpHeader /> </nav>
          <nav > <LoginLogoutBtn /> </nav>

          <div className="my-account">
            <AccountNavBlock />
          </div>
        </div>

      </div>
    </div>

  )
}
