import { useEffect, useState } from "react"

import '../../public/css/exerciseDemo.css'

// components
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"

const ExerciseDemoAdmin = () => {
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
    <div className="home" style={{ backgroundImage: "url('../../public/img/back.png')" }}>
      <div className="workoutsContainer">
        <div className="workouts">
          {workouts && workouts.map(workout => (
            <WorkoutDetails workout={workout} key={workout._id} />
          ))}
        </div>
      </div>

      <WorkoutForm addWorkout={addWorkout} />
    </div>
  )
}

export default ExerciseDemoAdmin