import { useEffect, useState } from "react"

import '../../public/css/exerciseDemo_customerView.css'

// components
import WorkoutDetails_CustomerView from "../components/WorkoutDetails_CustomerView"


const ExerciseDemoHome = () => {
  const [workouts, setWorkouts] = useState([])

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('/api/exDemo')
      const json = await response.json()

      if (response.ok) {
        setWorkouts(json)

      }
    }

    fetchWorkouts()
  }, [])

  const addWorkout = (newWorkout) => {
    setWorkouts(prevWorkouts => [...prevWorkouts, newWorkout])
  }



  return (
    <div className="home1" style={{ backgroundImage: "url('../../public/img/back.png')" }}>
      <div className="workoutsContainer">
        <div className="workouts">
          {workouts && workouts.map(workout => (
            <WorkoutDetails_CustomerView workout={workout} key={workout._id} />
          ))}
        </div>
      </div>

      
    </div>
  )
}

export default ExerciseDemoHome