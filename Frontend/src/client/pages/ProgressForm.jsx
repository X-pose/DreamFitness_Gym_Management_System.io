import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect,useState} from "react";
import '../../public/css/progress.form.css';
const ProgressForm = () =>{

    
    const [selectDate, setDate] = useState('');
    const [StartTime, setStartTime] = useState('');
    const [EndTime, setEndTime] = useState('');
    const [Weight, setWeight] = useState('');
    const [Cal_burn_treadmil, setCal_burn_treadmil] = useState('');
    const [Cal_burn_cycling, setCal_burn_cycling] = useState('');
    const [Time_squates, setTime_squates] = useState('');
    const [Time_legpress, setTime_legpress] = useState('');
    const [Time_breanchpress, setTime_breanchpress] = useState('');
    const [Time_shoulderpress, setTime_shoulderpress] = useState('');
    const [Time_situps, setTime_situps] = useState('');
    const [Time_pullups, setTime_pullups] = useState('');
    const [error, setError] = useState(null);


   
    
      const handleSubmit = async (e) => {
        e.preventDefault()
    

        const currentDate = new Date().toISOString().split("T")[0];
  
          if (selectDate > currentDate) {
            alert("Future dates are not allowed!");
            return;
          }




        const workout = {selectDate, StartTime, EndTime, Weight, Cal_burn_treadmil, Cal_burn_cycling,Time_squates,Time_legpress, Time_breanchpress, Time_shoulderpress, Time_situps,Time_pullups}
        
        const response = await fetch('/api/progressdetail', {
          method: 'POST',
          body: JSON.stringify(workout),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const json = await response.json()
    
        if (!response.ok) {
          setError(json.error)
        }
        if (response.ok) {
          toast.success(' Progress record added successfully !', {
            position: toast.POSITION.TOP_RIGHT
          });
          setError(null)
          setDate('')
          setStartTime('')
          setEndTime('')
          setWeight('')
          setCal_burn_treadmil('')
          setCal_burn_cycling('')
          setTime_squates('')
          setTime_legpress('')
          setTime_breanchpress('')
          setTime_shoulderpress('')
          setTime_situps('')
          setTime_pullups('')
           
          console.log('new workout added:', json)
        }
  
      }


  return(
    <div>
 
 
      <ToastContainer autoClose={1500}/>
    <h1 className="titlprgform">Daily Workout Form</h1>
    <h1 className='cusname'></h1>

      <div className="form-controlTrack">
        <form className='workout-form'  onSubmit={handleSubmit}>
        <label><div className = 'smalltitle'>Workout Date:</div></label>
        <input type='date' value={selectDate} onChange={(e) => setDate(e.target.value) }  required/>

        <br></br>
        <label><div className = 'smalltitle'>Start Time: </div></label>
         <input type='time' value={StartTime} onChange={(e) => setStartTime(e.target.value)} required/>

         <br></br>
               <label><div className = 'smalltitle'>End Time: </div></label>
                 <input type='time' value={EndTime} onChange={(e) => setEndTime(e.target.value)} required/>

        <br></br>
               <label><div className = 'smalltitle'>Weight(Kg):</div></label>
                 <input type='number' min='0'value={Weight} onChange={(e) => setWeight(e.target.value)} required/>

        <br></br>
               <label><div className = 'smalltitle'>Calories Burnt (Treadmill):</div></label>
                 <input type='number' min='0'value={Cal_burn_treadmil} onChange={(e) => setCal_burn_treadmil(e.target.value)} required/>

        <br></br>
               <label><div className = 'smalltitle'>Calories Burnt (Cycling):</div></label>
                 <input type='number' min='0' value={Cal_burn_cycling} onChange={(e) => setCal_burn_cycling(e.target.value)} required/>

        <br></br>
              <label><div className = 'smalltitle'>Time spent on squates:</div></label>
               <input type='number'min='0' value={Time_squates} onChange={(e) => setTime_squates(e.target.value)} required/>

        <br></br>
             <label><div className = 'smalltitle'>Time spent on legpress:</div></label>
              <input type='number' min='0' value={Time_legpress} onChange={(e) => setTime_legpress(e.target.value)} required/>

        <br></br>
              <label><div className = 'smalltitle'>Time spent on breanchpress:</div></label>
               <input type='number' min='0'value={Time_breanchpress} onChange={(e) => setTime_breanchpress(e.target.value)} required/>
  
        <br></br>
              <label><div className = 'smalltitle'>Time spent on shoulderpress:</div></label>
               <input type='number' min='0' value={Time_shoulderpress} onChange={(e) => setTime_shoulderpress(e.target.value)} required/>

        <br></br>
              <label><div className = 'smalltitle'>Time spent on situps:</div></label>
               <input type='number' min='0' value={Time_situps} onChange={(e) => setTime_situps(e.target.value)} required/>

        <br></br>
              <label><div className = 'smalltitle'>Time spent on Pullups:</div></label>
               <input type='number' min='0' value={Time_pullups} onChange={(e) => setTime_pullups(e.target.value)} required/>

        <br></br>

        <button  className="sbmtbtntrack" onSubmit={handleSubmit}>Add workout</button>
        <button className="sbmtbtntrack2"><a href="/WorkoutLog">Workout log</a></button>

        </form>
      </div>
    </div>
  )




}
export default ProgressForm