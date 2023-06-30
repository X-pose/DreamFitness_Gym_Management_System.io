 
 
 
import '../../public/css/FAQcustom.css'
 

import { useEffect, useState } from "react";
import Faqdetailcustom from '../components/FAQdetailcustom';
import FaqdetailAdmin from '../components/FAQdetailadmin';
 
//components
 


const FAQADMIN =() => {
    const [FAQ, setFAQ] = useState(null)

    useEffect(() =>{
 
        const fetchFAQ = async () => {
            const responce = await fetch('/api/FAQ')
            const json = await responce.json()
            
            if(responce.ok){
                setFAQ(json)
            }
        }  

        fetchFAQ()
    }, [])
     
    return(
        <div>
         
      
        <div className="workouts">

          
                {FAQ && FAQ.map((FAQ) => (
                      <FaqdetailAdmin key = {FAQ._id} FAQ={FAQ}/>
                ))}
            </div>
       
        <div className='container'>
            <button>
       <a href  ="FAQinadmin" style={{color: 'white', textDecoration: 'none'}}>ADD FAQ</a>  
       </button>
        </div>
        
                 
 


                 </div>


    )
}

export default FAQADMIN;