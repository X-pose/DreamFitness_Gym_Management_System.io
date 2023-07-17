import { useState } from 'react'
import '../../public/css/DietPlanDetails.css'
import axios from 'axios'


const DietPlanDetails = ({ dietPlan }) => {


  const [editMode, setEditMode] = useState(false)
  const [newTitle, setNewTitle] = useState(dietPlan.title)
  const [newgram, setNewgram] = useState(dietPlan.gram)
  const [newdescription, setDescription] = useState(dietPlan.description)





  const handleDelete = async () => {
    const confirmation = window.confirm('Are you sure you want to delete this diet plan?')
    if (confirmation) {

      console.log('passing alpha')
      await axios.delete('/api/dietPlan/' + dietPlan._id,)
        .catch(() => {
          throw new Error('Error deleting dietPlan');
        })

      // Refresh the list of workouts after deleting the selected workout
      window.location.reload();
    }

  }

  const handleUpdate = async () => {

    const data = {
      title: newTitle,
      gram: newgram,
      description: newdescription
    };

    const options = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    console.log(dietPlan._id)
    await axios.put('/api/dietPlan/' + dietPlan._id, JSON.stringify(data), options)
      .catch(() => {
        throw new Error('Error updating dietPlan')
      })

    
    // Refresh the list of dietplan after updating the selected workout
    window.location.reload();
  }

  return (
    <div>

      <div className='DPtab'>

        <table className='DPtable'>
          <thead>
            <tr>
              <th className='DPthtd'>Title</th>
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
                    min='0'
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