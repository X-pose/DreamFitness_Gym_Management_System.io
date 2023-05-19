import React, { useState, useEffect } from "react";
import FeedbackDetails from '../components/FeedbackDetails'


const UpdateFeedback= () => {


    const [feedbacks ,setfeedbacks] = useState([])

    useEffect(()  => {
        const  fetchfeedbacks= async () =>{
        
          const response = await fetch('/api/feedbacks')
          const json = await response.json()
  
          if (response.ok) {
            setfeedbacks(json)
             
            }
  
        }
        fetchfeedbacks()
     }, [])
  
return(

  <div>
 <h1 style={{ color: 'white', textDecoration: 'none', marginTop: '7%' }}>My Feedbacks</h1>


    <div className="feedbacks">

    {feedbacks.map((feedback) => (
        <FeedbackDetails key={feedback._id} feedback={feedback} />
      ))}
        
    </div>



  </div>




)


}


export default UpdateFeedback
