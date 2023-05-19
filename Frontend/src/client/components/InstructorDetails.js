import { useState,useEffect } from 'react'
import {InstructorForm} from './InstructorForm'
import "../../public/css/instructordetails.css";

const InstructorDetails = ({instructor}) => {
 
  console.log("Passing charlie"+instructor._id)
  const [editMode, setEditMode] = useState(false)
  const [newTitle, setNewTitle] = useState(instructor.title)
  const [newdescription, setNewdescription] = useState(instructor.description)
  const [newwquote, setNewquote] = useState(instructor.quote)
  const [newcertification, setNewcertification] = useState(instructor.certification)
  const [error, setError] = useState(null)
  const[newbodybuilding, setnewbodybuilding] = useState(instructor.bodybuilding)
  const[newcardio, setnewcardio] = useState(instructor.cardio)
  const[newweightloss, setnewweightloss] = useState(instructor.weightloss)
  const[newdisplayimg, setnewdisplayimg] = useState(instructor.displayImg)

  const [updatedformData, setFormData] = useState(new FormData());



  useEffect(() => {
    const formData = new FormData();
    
    // Append other state variables to the updatedFormData
    formData.append('title', newTitle);
    formData.append('description', newdescription);
    formData.append('quote', newwquote);
    formData.append('certification', newcertification);
    formData.append('bodybuilding', newbodybuilding);
    formData.append('cardio', newcardio);
    formData.append('weightloss', newweightloss);
    formData.append('displayImg', newdisplayimg);
  
    setFormData(formData);
  }, [newTitle ,newdescription,newwquote,newcertification,newbodybuilding,newcardio,newweightloss,newdisplayimg])

    const handleClick = async() =>{
        const response =await fetch('/api/Instructors/' + instructor._id,{
          method:'DELETE'
        })
        if (!response.ok) {
            throw new Error('Error deleting workout');
          }
    
          // Refresh the list of workouts after deleting the selected instrructor
          window.location.reload();

    }
     
    const handleUpdate = async () => {
      
    
     

      console.log('Instructor ID : '+ instructor._id)
    
      const response = await fetch('/api/Instructors/' + instructor._id, {
        method: 'PUT',
        body: updatedformData,
      });
    
      if (!response.ok) {
        console.log('Passing foxtrot-Error');
        throw new Error('Error updating workout');
      }
    
      console.log('Passing foxtrot');
      // Refresh the list of workouts after updating the selected instructor
      window.location.reload();
    };

    
    
 
  

    return (
      
      <div>
        <table>
          <thead></thead>
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
                    type="text"
                    value={newdescription}
                    onChange={(e) => setNewdescription(e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={newwquote}
                    onChange={(e) => setNewquote(e.target.value)}
                  />
                </td>

                <td>
                  <input
                    type="text"
                    value={newcertification}
                    onChange={(e) => setNewcertification(e.target.value)}
                  />
                </td>

                <td>
                  <input
                    type="number"
                    value={newbodybuilding}
                    onChange={(e) => setnewbodybuilding(e.target.value)}
                  />
                </td>

                <td>
                  <input
                    type="number"
                    value={newcardio}
                    onChange={(e) => setnewcardio(e.target.value)}
                  />
                </td>

                <td>
                  <input
                    type="number"
                    value={newweightloss}
                    onChange={(e) => setnewweightloss(e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type = "file"
                    onChange = {(e) => setnewdisplayimg(e.target.files[0])}
                    />
                </td>
                <td>
                  <button onClick={handleUpdate}>Save</button>
                </td>
                <td>
                  <button onClick={() => setEditMode(false)}>Cancel</button>
                </td>
              </tr>
            ) : (
              <tr>
                
                <td>{instructor.title}</td>
                <td>   <strong> Description</strong> {instructor.description}</td>
                <td>   <strong> Quote</strong> {instructor.quote}</td>
                <td>   <strong> Certification</strong> {instructor.certification}</td>
                <td>   <strong> Bodybuilding</strong> {instructor.bodybuilding}</td>
                <td>   <strong> Cardio</strong> {instructor.cardio}</td>
                <td>   <strong> Weightloss</strong> {instructor.weightloss}</td>
                <td>   <img src={instructor.displayImg}/></td>

                <td><button className='delbtnins' onClick={handleClick}>Delete</button></td>
                <td><button className='updbtnins' onClick={() => setEditMode(true)}>Update</button></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
            }

    export default InstructorDetails