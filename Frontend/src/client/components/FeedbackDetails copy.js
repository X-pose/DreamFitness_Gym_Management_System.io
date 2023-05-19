import '../../public/css/feedback.css'


const FeedbackDetailsz = ({ feedback }) => {
  
  return (
    
        <div>
          <div className="Feedbacks2">

            <h5 style={{fontSize: '22px'}}><strong>User Name : </strong>{feedback.username}</h5>
            <p style={{fontSize: '18px'}}><strong > FEEDBACK : </strong>{feedback.description}</p>
            <h5 style={{fontSize: '22px'}}><strong>Rating : </strong>{feedback.rating}</h5>
  
        </div>
          
         
        </div>
      )
              }

export default FeedbackDetailsz