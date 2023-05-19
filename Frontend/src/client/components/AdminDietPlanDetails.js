import { useState } from 'react'
import'../../public/css/DietPlanDetails.css'


const DietPlanDetails = ({dietPlan}) => {
 
   
  const [editMode, setEditMode] = useState(false)
  const [newTitle, setNewTitle] = useState(dietPlan.title)
  const [newgram, setNewgram] = useState(dietPlan.gram)
  const [newdescription, setDescription] = useState(dietPlan.description)
  




    const handleDelete = async() =>{
      const confirmation = window.confirm('Are you sure you want to delete this diet plan?')
    if (confirmation) {

        console.log('passing alpha')
          const response = await fetch('/api/dietPlan/' + dietPlan._id,{
            method:'DELETE'
          
          
        })

        console.log('passing bravo')
        if (!response.ok) {
            throw new Error('Error deleting dietPlan');
          }

          
    
          // Refresh the list of workouts after deleting the selected workout
          window.location.reload();
        } 

    }
     
    const handleUpdate = async () => {
      const response = await fetch('/api/dietPlan/' + dietPlan._id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: newTitle,
          gram: newgram,
          description: newdescription
        })
      });

      if (!response.ok) {
        throw new Error('Error updating dietPlan');
      }
      // Refresh the list of dietplan after updating the selected workout
      window.location.reload();
    }

    return (
      <div>
         
        <div className='DPtab'>
          
        <table className='DPtable'>
          <thead>
            <tr>
            <th  className='DPthtd'>Title</th>
            <th className='DPthtd'>Portion (g)</th>
            <th className='DPthtd'>Description</th>
            <th></th>
            <th></th>
        </tr>
          </thead>

          <tbody>
            {editMode ? (
              <tr>
                <td className='DPthtd'>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                  />
                </td>

                <td className='DPthtd'>
                  <input
                    type="number"
                    min = '0'
                    value={newgram}
                    onChange={(e) => setNewgram(e.target.value)}
                 />
                </td>

                <td className='DPthtd'>
                  <input
                    type="text"
                    value={newdescription}
                    onChange={(e) => setDescription(e.target.value)}                   
                  />
                </td>

                <td className='DPthtd'>
                  <button className='DPupdatebtn' onClick={handleUpdate}>Save</button>
                </td>

                <td className='DPthtd'>
                  <button className='DPdelbtn' onClick={() => setEditMode(false)}>Cancel</button>
                </td>
                
              </tr>
            ) : (

              
              <tr>
                <td className='DPthtd'>{dietPlan.title}</td>
                <td className='DPthtd'>{dietPlan.gram}</td>
                <td className='DPthtd'>{dietPlan.description}</td>
                <td className='DPthtd'><button className='DPdelbtn' onClick={handleDelete}>Delete</button></td>
                <td className='DPthtd'><button className='DPupdatebtn' onClick={() => setEditMode(true)}>Update</button></td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
      </div>
    );
            }
          

    export default DietPlanDetails