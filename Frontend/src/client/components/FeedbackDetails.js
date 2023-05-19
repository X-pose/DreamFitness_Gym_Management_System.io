import React, { useEffect, useState } from 'react';
import '../../public/css/feedback.css'
import Cookies from 'js-cookie'


const FeedbackDetails = ({ feedback }) => {
  const [editMode, setEditMode] = useState(false)
  const [newdescription, setNewdescription] = useState(feedback.description)
  const [newrating, setNewRating] = useState(feedback.rating)
  
  const [error, setError] = useState(null)
  const [userDetails, setUserDetails] = useState(null);

  const [deleted, setDeleted] = useState(false)

  const handleDelete = async () => {
    const response = await fetch(`/api/feedbacks/${feedback._id}`, {
      method: 'DELETE'
    })
    const json = await response.json()


        if(response.ok) {
          console.log('Deleted workout:', json)
          setDeleted(true)
          // Refresh the list of feedbacks after deleting the selected feedback
      window.location.reload();
        }
    
  }
 
  const handleUpdate = async () => {
    const response = await fetch('/api/feedbacks/' + feedback._id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        description: newdescription,
        rating: newrating
      })
    });
    if (!response.ok) {
      throw new Error('Error updating feedback');
    }
    // Refresh the list of workouts after updating the selected workout
    window.location.reload();
  }

  useEffect(() =>{
       
    console.log("My feedback cookie : " + Cookies.get('sessionName'))
    
    setUserDetails(Cookies.get('sessionName'))

    console.log("Name set : "+ userDetails)
    
}, [])
  
  return (
    <div>
    {editMode ? (
      <div className='updatesave'>
        <label>User Name: {userDetails}</label>
                {/* <h2 className='cusname'>{userDetails}</h2> */}

        <label>FEEDBACK:</label>
        <input
          type="text"
          onChange={(e) => setNewdescription(e.target.value)}
          value={newdescription}
        />

        <label htmlFor="rating">Rating: {newrating}</label>
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
                  checked={newrating === ratingValue}
                  onChange={() => setNewRating(ratingValue)}
                />
                <label htmlFor={`star${ratingValue}`}></label>
              </div>
            );
          })}
        </div>

        <button className="red-button" onClick={handleUpdate}>Save</button>
      </div>
    ) : (
      <div>
        <div className="Feedbacks">
        <label>User Name: {userDetails}</label>
                {/* <h2 className='cusname'>{userDetails}</h2> */}
          <p>FEEDBACK: {feedback.description}</p>
          <p>Rating: {feedback.rating}</p>
          
          <button onClick={() => setEditMode(true)} className="red-button">Update</button><br/>
          <button onClick={handleDelete} className="red-button">Delete</button>

        </div>
      </div>
    )}
  </div>
  )      
}

export default FeedbackDetails