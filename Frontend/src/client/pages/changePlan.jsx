import React from 'react';

import { useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../public/css/changePlan.css'




function ChangePlan() {

  const [myFitnessPlan, setPlan] = useState('Basic')


  const SubmitBTN = async (e) => {

    e.preventDefault();
    try {
      const updateUser = {
        myFitnessPlan
      }
      const response = await fetch('/api/myfitnessPlan', {
        method: 'PUT',
        body: JSON.stringify(updateUser),
        headers: {
          'Content-Type': 'application/json'
        }

      })

      const json = await response.json();

      if (response.ok) {

        toast.success('Membership plan updated succefully!', {
          position: toast.POSITION.TOP_RIGHT
        });
        
        setTimeout(function() {
          window.location.href = '/MyAccount'
        }, 3000);
        setTimeout();

        console.log(json.myFitnessPlan);
        setPlan(json.myFitnessPlan);
        
        
      } else {

        console.error('Failed to update user details:', json.error);
      }
    } catch (error) {
      console.error('An error occurred while updating user details:', error);
    }
  }



  return (
    <div>
      <ToastContainer autoClose={3000} />
      <div className="square-form">
        <div>
          <h2>Choose Your Plan</h2>
          <form onSubmit={SubmitBTN}>
            <label htmlFor="plan">Select a Plan:</label>
            <select id="plan" name="plan" onChange={(e) => setPlan(e.target.value)} value={myFitnessPlan}>
              <option value="Basic">Basic</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Expert">Expert</option>
            </select>
            <div className="Buttons">
            <div className='leftBtn'>
              <button className="greenBtn" type="submit">Update Plan</button>
            </div>
            <div className='rightBtn'>
              <a href='/MyAccount'>
                <button className="redBtn" type="button">Cancel</button>
              </a>
            </div>
            </div>
          </form>

          

          </div>
        </div>
      </div>

   
  )
}

export default ChangePlan