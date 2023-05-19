//import { useState } from "react";
import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie'
//import '../pages/feedback.css';
import "../../public/css/FeedbackForm.css";

//import './feedbackform.css'

const FeedbackFormz = () => {
    const [description, setdescription] = useState('')
    const [rating, setRating] = useState('')
    const [error, setError] = useState(null)
    const [userDetails, setUserDetails] = useState('');
    const [feedbacks, setFeedbacks] = useState([])
   

    const handleSubmit = async (e) => {
        const feedback = {description, rating}

        // the fetch request to post the new data
        const response = await fetch('/api/feedbacks', {
            method: 'POST',
            body: JSON.stringify(feedback),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }

        if (response.ok) {
            setdescription('')
            setRating('')
            setError(null)
            console.log('new feedback added', json)
        }
    }

    useEffect(() =>{
       
        console.log("My feedback cookie : " + Cookies.get('sessionName'))
        
        setUserDetails(Cookies.get('sessionName'))

        console.log("Name set : "+ userDetails)
        
}, [])

    return (
        <div>
  
            <form className="feedbackform" onSubmit={handleSubmit}>

             <h3>Add a New Feedback</h3>
     
                <label>User Name: {userDetails}</label><br/>
               

                <label>FEEDBACK:</label>
                <input
                    type="text"
                    onChange={(e) => setdescription(e.target.value)}
                    value={description}
                    required
                /><br/>

<label htmlFor="rating">Rating: {rating}</label>
<div className="star-rating">
  {[...Array(5)].map((star, index) => {
    const ratingValue = index + 1;
    return (
      <div key={index}>
        <input
          type="radio"
          id={`star${ratingValue}`}
          name="rating"
          value={ratingValue}
          checked={rating === ratingValue}
          onChange={() => setRating(ratingValue)}
          required
        />
        <label htmlFor={`star${ratingValue}`}></label>
      </div>
    );
  })}
</div>
{rating === "" && <p className="error-message">Please select a rating.</p>}

                <br/>    
                <br/>     

                <button >Add Feedback</button>
                <button><a href="/myFeedbacks"> My Feedbacks</a></button>
                
                {error && <div className="error">{error}</div>}
            </form>   
          

        </div>
    )
}

export default FeedbackFormz