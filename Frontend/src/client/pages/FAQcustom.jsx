import { useEffect, useState } from "react"

import '../../public/css/FAQcustom.css'
// components
import Faqdetailcustom from "../components/FAQdetailcustom"



const FAQcustom =() => {
  const [FAQ, setWorkouts] = useState(null)

  useEffect(() =>{

      const fetchWorkouts = async () => {
          const responce = await fetch('/api/FAQ')
          const json = await responce.json()
          
          if(responce.ok){
              setWorkouts(json)
          }
      }  

      fetchWorkouts()
  }, [])
   
  return(
      <div>
       <h1 className="faq"><a className="red">F</a>reaquenty <a className="red">A</a>sked <a className="red">Q</a>usetions</h1>
 
      
      
      <div className="workouts">
              {FAQ && FAQ.map((FAQ) => (
                    <Faqdetailcustom key = {FAQ._id} FAQ={FAQ}/>
              ))}
          </div>
     
      <div className='container'>
        
      </div>
      
               



               </div>



        /*<div className="home">
          <div className="workouts">
              {workouts && workouts.map((workout) => (
                    <WorkoutDetails key = {workout._id} workout={workout}/>
              ))}
          </div>
           <WorkoutForm/>
      </div>*/
  )
}

export default FAQcustom