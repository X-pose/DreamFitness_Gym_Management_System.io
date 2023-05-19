import { useState } from 'react'

import '../../public/css/viewonlyinstructors.css';




const UpdateInstructorDetails = ({instruct}) => {
 
  return (
    <div> 
      <div className='mainblockinsdetails'>
     <div className='imagepanell'> 
     <img  className='imageinstruc' src={instruct.displayImg}/></div>
     
     <div className='rightpanel'>
     
              
             <c className='onlyview1'><strong>{instruct.title}</strong> </c>

             <br></br> <br></br> <br></br>
             <f className='onlyview '> <strong> Description: </strong>{instruct.description} </f>
             <br></br> <br></br> <br></br>
             <f className='onlyview '> <strong> Quote: </strong> {instruct.quote} </f>
             <br></br> <br></br> <br></br>
             <f className='onlyview'>  <strong> Certification: </strong> {instruct.certification} </f>
             <br></br> <br></br> <br></br>
             <v className='onlyview'>  <strong> Body building: </strong> {instruct.bodybuilding}% </v><br/>
             <v className='onlyview'>  <strong> Cardio: </strong> {instruct.cardio}% </v><br/>
             <v className='onlyview'>  <strong> Weightloss: </strong> {instruct.weightloss}% </v>
             </div>
            </div>
    </div>
  );
}

export default UpdateInstructorDetails;