import React from 'react';
import '../../public/css/Login.css';
import { useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../public/css/changePlan.css'



function ChangPlan(){
    
    const[myFitnessPlan,setPlan] =useState('')

    
    const SubmitBTN = async()=>{

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
                
              console.log('User myFitnessPlan updated successfully!');
             
             
              
            } else {
        
              console.error('Failed to update user details:', json.error);
            }
          } catch (error) {
            console.error('An error occurred while updating user details:', error);
          }
    }



    return(
        <div>
            <ToastContainer autoClose={3000}/>
            <div className="square-form">
            <h2>Choose Your Plan</h2>
                <form onSubmit={SubmitBTN}>
                    <label for="plan">Select a Plan:</label>
                    <select id="plan" name="plan" onChange={(e) => setPlan(e.target.value)}>
                        <option value="basic">Basic</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="expert">Expert</option>
                    </select>
                    <div className="buttons">
                    <button className="green-button" type="submit">Update My Plan</button>
                    <a href = '/MyAccount'>
                        <button className="red-button" type="button">Cancel</button>
                    </a>
                     
                    </div>
                </form>
            </div>

        </div>
    )
}

export default ChangPlan