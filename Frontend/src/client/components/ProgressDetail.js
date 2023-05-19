
import 'react-toastify/dist/ReactToastify.css';
import {  useState} from "react"

const  ProgressDetail = ({progress}) =>{

  const [editMode, setEditMode] = useState(false)

    const [selectDate, setDate] = useState(progress.selectDate);
    const [StartTime, setStartTime] = useState(progress.StartTime);
    const [EndTime, setEndTime] = useState(progress.EndTime);
    const [Weight, setWeight] = useState(progress.Weight);
    const [Cal_burn_treadmil, setCal_burn_treadmil] = useState(progress.Cal_burn_treadmil);
    const [Cal_burn_cycling, setCal_burn_cycling] = useState(progress.Cal_burn_cycling);
    const [Time_squates, setTime_squates] = useState(progress.Time_squates);
    const [Time_legpress, setTime_legpress] = useState(progress.Time_legpress);
    const [Time_breanchpress, setTime_breanchpress] = useState(progress.Time_breanchpress);
    const [Time_shoulderpress, setTime_shoulderpress] = useState(progress.Time_shoulderpress);
    const [Time_situps, setTime_situps] = useState(progress.Time_situps);
    const [Time_pullups, setTime_pullups] = useState(progress.Time_pullups);
    const [error, setError] = useState(null);


     //Delete Function

   const handleClick = async () => {
      var result = window.confirm("Are you sure?");
      if(result === true){
      const response = await fetch('/api/progressdetail/' + progress._id, {
        method: 'DELETE'
      })
      const json = await response.json()
      if (response.ok) {
      
        window.location.reload();
      

      }
    }
    }


    //Update function
    const handleSubmit = async () => {
    
    
      const updatedWorkout = {selectDate, StartTime, EndTime, Weight, Cal_burn_treadmil, Cal_burn_cycling,Time_squates,Time_legpress, Time_breanchpress, Time_shoulderpress, Time_situps,Time_pullups}
  
      const response = await fetch('/api/progressdetail/' + progress._id, {
        method: 'PUT',
        body: JSON.stringify(updatedWorkout),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const json = await response.json()
  
      if (!response.ok) {
        setError(json.error)
      }
      if (response.ok) {
        
        setError(null)
        setEditMode(false)
       // toast.success('Workout updated successfully')
        console.log('updated workout:', json)
      }
    }

  //  const fixeddate = new Date(progress.Date).toISOString()
   return(
      <div>
        
         {!editMode ?(
            <table className="progress_table">
           
             
           <thead>
        <tr>
          <th>Date</th>
          <th>Start Time</th>
          <th>End Time</th>
          <th>Weight(Kg)</th>
          <th>Total calories(Kcl)</th>
          <th>update</th>
          <th>Delete</th>
        </tr>
        </thead>

          <tbody>
               <tr >
                <td>{progress.selectDate}</td>
                <td>{progress.StartTime}</td>
                <td>{progress.EndTime}</td>
                <td>{progress.Weight}</td>
                <td>{progress.Total_calories.toFixed(2)}</td>
                <td><button onClick={() => setEditMode(true)}>Update</button></td>
                <td>{<button onClick={handleClick}>Delete</button>}</td>
               </tr>
             </tbody>
             </table>
         ):(<div className='form'>
         
           <form className='workout-form' onSubmit={handleSubmit}>
           <h3 className='title2'>Update Workout Detail</h3>

           <label><dev className = 'smalltitle'>Workout Date:</dev></label>
               <input type='date' value={selectDate} onChange={(e) => setDate(e.target.value)} required/>
            
               <br></br>
               <label><div className = 'smalltitle'>Start Time: </div></label>
               <input type='time' value={StartTime} onChange={(e) => setStartTime(e.target.value)} required/>
     
               <br></br>
               <label><div className = 'smalltitle'>End Time: </div></label>
               <input type='time' value={EndTime} onChange={(e) => setEndTime(e.target.value)} required/>
     
               <br></br>
               <label><div className = 'smalltitle'>Weight(Kg):</div></label>
               <input type='number' min='0' value={Weight} onChange={(e) => setWeight(e.target.value)} required/>
     
               <br></br>
               <label><div className = 'smalltitle'>Calories burnt during treadmil:</div></label>
               <input type='number' min='0' value={Cal_burn_treadmil} onChange={(e) => setCal_burn_treadmil(e.target.value)} required/>
   
               <br></br>
               <label><div className = 'smalltitle'>Calories burnt during cycling:</div></label>
               <input type='number' min='0' value={Cal_burn_cycling} onChange={(e) => setCal_burn_cycling(e.target.value)} required/>
   
               <br></br>
               <label><div className = 'smalltitle'>Time spent on Squats (minutes):</div></label>
               <input type='number' min='0' value={Time_squates} onChange={(e) => setTime_squates(e.target.value)} required/>
   
               <br></br>
               <label><div className = 'smalltitle'>Time spent on Leg Press (minutes):</div></label>
               <input type='number' min='0' value={Time_legpress} onChange={(e) => setTime_legpress(e.target.value)} required/>
   
               <br></br>
               <label><div className = 'smalltitle'>Time spent on Bench Press (minutes):</div></label>
               <input type='number' min='0' value={Time_breanchpress} onChange={(e) => setTime_breanchpress(e.target.value)} required/>
   
               <br></br>
               <label><div className = 'smalltitle'>Time spent on Shoulder Press (minutes):</div></label>
               <input type='number' min='0' value={Time_shoulderpress} onChange={(e) => setTime_shoulderpress(e.target.value)} required/>
   
               <br></br>
               <label><div className = 'smalltitle'>Time spent on Sit-ups (minutes):</div></label>
               <input type='number' min='0' value={Time_situps} onChange={(e) => setTime_situps(e.target.value)} required/>
   
               <br></br>
               <label><div className = 'smalltitle'>Time spent on Pull-ups (minutes):</div></label>
               <input type='number' min='0' value={Time_pullups} onChange={(e) => setTime_pullups(e.target.value)} required/>
   
               <br></br>
             <button type='submit'>Update Workout</button>
                <button onClick={() => setEditMode(false)}>Cancle</button>
                {error && <p className='form-error'>{error}</p>}

           </form>
         </div>)

         } 
      </div>

   )


}
export default ProgressDetail