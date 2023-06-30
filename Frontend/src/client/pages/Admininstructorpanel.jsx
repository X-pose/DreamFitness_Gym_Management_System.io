import React from 'react'
 
import '../../public/css/admininstructorepanel.css'
 



export default function AdminInstructor() {
  return (
    <div>
        
       
        <div className='topic'><c className='Adminpanel'>Admin panel</c></div>
       
       <div className='contad'>

       <b1 href = "/AddInstructor">
        <button className='rectangle1'>
        <a href  ="/AddInstructor" style={{color: 'white', textDecoration: 'none'}}>
        <g className='wed'>Add Instructors</g></a>  
        </button>
        </b1>

        <button className='rectangle1'>
        <a href  ="/EditInstructor" style={{color: 'white', textDecoration: 'none'}}>
        <g className='wed'>Edit Instructor</g></a>  
        </button>

        <button className='rectangle1'>
        <a href  ="/ViewOnlyInstructors" style={{color: 'white', textDecoration: 'none'}}>
        <g className='wed'>Instructor Details</g></a>
        </button>
       
       
       </div>
        
    
   
    </div>
  )
}
