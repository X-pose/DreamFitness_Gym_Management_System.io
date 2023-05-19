import { useState } from 'react'

import '../../public/css/exerciseDemo.css'
const WorkoutForm = () => {
  const [workoutName, setWorkoutName] = useState('')
  const [workoutDesc, setWorkoutDesc] = useState('')
  const [workoutGif, setWorkoutGif] = useState('')
  const [muscle, setMuscle] = useState('')
  const [primaryGoal, setPrimaryGoal] = useState('')
  const [goalDesc, setGoalDesc] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const workout = {
      workoutName,
      workoutDesc,
      workoutGif,
      muscle,
      primaryGoal,
      goalDesc
    }

    let formData = new FormData();

    formData.append('workoutName',workoutName)
    formData.append('workoutDesc', workoutDesc)
    formData.append('workoutGif',workoutGif)
    formData.append('muscle',muscle)
    formData.append('primaryGoal',primaryGoal)
    formData.append('goalDesc',goalDesc)

    const response = await fetch('/api/exDemo', {
      method: 'POST',
      body: formData,
      
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
    }
    if (response.ok) {
      setError(null)
      setWorkoutName('')
      setWorkoutDesc('')
      setWorkoutGif('')
      setMuscle('')
      setPrimaryGoal('')
      setGoalDesc('')

      window.location.href = '/exerciseDemoAdmin'
    }


  }

  const handlePrimaryGoalChange = (e) => {
    setPrimaryGoal(e.target.value);
  };

  const handleMuscleChange = (e) => {
    setMuscle(e.target.value);
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>

      <label>Workout Name:</label>
      <input
        name="workoutName"
        type="text"
        onChange={(e) => setWorkoutName(e.target.value)}
        value={workoutName}
        required
      />

      <label>Workout Description:</label>
      <input
        name="workoutDesc"
        type="text"
        onChange={(e) => setWorkoutDesc(e.target.value)}
        value={workoutDesc}
        required
      />

      <label>Workout Gif Source:</label>
      <input
        name="workoutGif"
        type="file"
        onChange={(e) => setWorkoutGif(e.target.files[0])}
        style={{ backgroundColor: 'white' }}
        
        
      />

      <label htmlFor="muscle">Muscle:</label>
      <select
        name="muscle"
        onChange={handleMuscleChange}
        value={muscle}
        required
      >
        <option value="">Select a muscle</option>
        <option value="Chest">Chest</option>
        <option value="Biceps">Biceps</option>
        <option value="Hamstring">Hamstring</option>
        <option value="Tricep">Tricep</option>
        <option value="Lateral">Lateral</option>
        <option value="Back">Back</option>
        <option value="Traps">Traps</option>
        <option value="Shoulders">Shoulders</option>
        <option value="Quads">Quads</option>
        <option value="Compound">Compound</option>
      </select>

      <label htmlFor="primaryGoal">Primary Goal:</label>
      <select
        name="primaryGoal"
        onChange={handlePrimaryGoalChange}
        value={primaryGoal}
        required
      >
        <option value="">Select an option</option>
        <option value="Strength">Strength</option>
        <option value="WeightLoss">WeightLoss</option>
      </select>

      <label>Goal Description:</label>
      <input
        name="goalDesc"
        type="text"
        onChange={(e) => setGoalDesc(e.target.value)}
        value={goalDesc}
        required
      />

      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default WorkoutForm
