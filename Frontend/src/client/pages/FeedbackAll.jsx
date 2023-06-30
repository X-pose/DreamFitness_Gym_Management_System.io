
import { useEffect, useState } from 'react'
import '../../public/css/feedback.css'
// components

import FeedbackView from '../components/FeedbackView'



const FeedbackAll = () => {

    const [feedbacks, setFeedbacks] = useState(null)
   

    useEffect(() => {
        const fetchFeedbacks = async () => {
            const response = await fetch('/api/allfeedback')
            const json = await response.json()

            if(response.ok) {
                setFeedbacks(json)
            }
        }

        fetchFeedbacks()
    }, [])
 
  

    
   return(
       <div>
       
     <div>
     
     </div>

       <h1 className='Nameonee'>FEEDBACK</h1>

       <FeedbackView/>


           <br/>
           
                
          
           </div>

 
   )
}

export default  FeedbackAll;