import React, { useEffect } from 'react';
import '../../public/css/loginToast.css'
import checkMark from '../../public/css/CheckMark.png'

function LoginToast() {
  useEffect(() => {
    function showToast(message) {
      const toast = document.getElementById('toast');
      toast.textContent = message;
      document.getElementById('toast-container').style.display = 'grid';
    
      setTimeout(function() {
        document.getElementById('toast-container').style.display = 'none';
      }, 3000);
    }
    
    showToast('Successfully logged in!');
  }, []);

  return (
    <div id="toast-container">
      <div id = 'checkMark'>
        <img src={checkMark} width={300} height={300} />
      </div>
      <div id="toast">
        
        Successfully logged in!
      </div>
    </div>
  );
}

export default LoginToast;
