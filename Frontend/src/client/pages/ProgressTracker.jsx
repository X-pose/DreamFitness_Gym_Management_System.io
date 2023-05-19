import { useEffect,useState} from "react";
import '../../public/css/ProgressTracker.css'




const ProgressTracker = () =>{
  
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [bmi, setBMI] = useState('');
  const [userDetails, setUserDetails] = useState(null);


  useEffect(() =>{
    const fetchUserDetails = async() =>{
      console.log('Data retrive initiated phase 2')
      const response = await fetch('/api/accountdetails')
      const json = await response.json()

      if(response.ok){
          setUserDetails(json)
        
      }
    }
    fetchUserDetails()
  })



  const calculateBMI = () => {
    const heightInMeters = height / 100; // Convert height to meters
    const bmiValue = weight / (heightInMeters * heightInMeters); // Calculate BMI

    setBMI(bmiValue.toFixed(2)); // Set BMI value with 2 decimal places
  }

return(
   
    <div className="ProgressMain">
  <div className='progresback'>
  <h1 className="Titile">Progress Tracker </h1>

    <p></p>


   <div className='progmain_btn_list'>
 
    <button className='btnprog_main' ><a href="/ProgressForm" style={{ color: 'white', textDecoration: 'none' }} >Add Workout Detail</a></button>
    <button className='btnprog_main'><a href='/WorkoutLog' style={{ color: 'white', textDecoration: 'none' }}>WorkoutLog</a></button>
    <button className='btnprog_main'><a href="/ProgressGraph" style={{ color: 'white', textDecoration: 'none' }} >Progress Graph</a></button>
    
    </div>


    <div>

      <p className='paraprgtrack'> welcome to the progress tracking function {userDetails?.userName}. In here you can add your personal workout records,keep those records and view your progress through a graph system.
      This function will help you to a get clear idea about your progress at our DREAM FITNESS gym.</p>
     

    </div>




<div className='imgcontprgtrack'>


<div className='imhprgtrck'>



 
 </div>




               
    <div className='BMI_cal'>
      <h2 className='bmical'>BMI Calculator</h2>
      <div>
        <label>Weight (kg):</label>
        <input
        className='bmi_input'
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </div>
      <div>
        <label>Height (cm):</label>
        <input
        className='bmi_input'
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
      </div>
      <div>
        <label>Age:</label>
        <input
        className='bmi_input'
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </div>
      <div>
        <label>Gender:</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <button className='calculateprgtrack' onClick={calculateBMI}>Calculate</button>
      {bmi && (
        <div>
          <p  className='bmi_ans'> Your BMI: {bmi}</p>
        </div>
      )}
    </div>
    </div>


    </div>

    </div>

)





}
export default ProgressTracker