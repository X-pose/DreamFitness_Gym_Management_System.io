import { useState } from 'react'
import'../../public/css/DietPlanDetails.css'


const DietPlanDetails = ({dietPlan}) => {
 
   
  const [editMode, setEditMode] = useState(false)
  const [newTitle, setNewTitle] = useState(dietPlan.title)
  const [newgram, setNewgram] = useState(dietPlan.gram)
  const [newdescription, setDescription] = useState(dietPlan.description)
  




    const handleDelete = async() =>{
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
        
        <div className='tab'>
        
        <table className='table'>
          <thead>
          <tr>
      <th>Title</th>
      <th>Portion (g)</th>
      <th>Description</th>
      
    </tr>
          </thead>
          <tbody>
            {editMode ? (
              
              
              <tr>
                
                <td>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                   
                  />
                </td>
                <td>
                  <input
                    type="number"
                    min = '0'
                    value={newgram}
                    onChange={(e) => setNewgram(e.target.value)}
                    
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={newdescription}
                    onChange={(e) => setDescription(e.target.value)}
                    
                  />
                </td>
                <td>
                  <button className='updatebtn' onClick={handleUpdate}>Save</button>
                </td>
                <td>
                  <button className='delbtn' onClick={() => setEditMode(false)}>Cancel</button>
                </td>
              </tr>
            ) : (

              
              <tr>
                <td>{dietPlan.title}</td>
                <td>{dietPlan.gram}</td>
                <td>{dietPlan.description}</td>
                <td><button className='delbtn' onClick={handleDelete}>Delete</button></td>
                <td><button className='updatebtn' onClick={() => setEditMode(true)}>Update</button></td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
      </div>
    );
            }
          

    export default DietPlanDetails