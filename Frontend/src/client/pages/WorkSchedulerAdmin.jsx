


import '../../public/css/workoutScheduler.css'


import { useEffect, useState } from "react";

//components
import WorkoutDetails from "../components/WorkoutsSchedulerDetails";
const prop = JSON.parse(localStorage.getItem('propUser'));


const WorkoutSchdulerAdmin = () => {
    const [workouts, setWorkouts] = useState('')
    const [userID] = useState(prop._id)

    useEffect(() => {

        const fetchWorkouts = async () => {
            const responce = await fetch(`/api/adminWorkouts?q=${userID}`)
            const json = await responce.json()
            console.log(json)

            if (responce.ok) {
                setWorkouts(json)
            }
        }

        fetchWorkouts()
    }, [])

    return (
        <div>


            <h1 className='Nameone'>WORKOUT SCHEDULE ADMIN</h1>
            <div className='cus'>
                <h2 className='cusname'>{prop.userName}</h2>
                <h2 className='cusname'>Age - {prop.age}</h2>
                <h2 className='cusname'>Weight - {prop.weight} Kg</h2>
                <h2 className='cusname'>BMI - {prop.BMI}</h2>
                <h2 className='cusname'>TFP - {prop.TFP}%</h2>
            </div>
            <div className="workouts">
                {workouts && workouts.map((workout) => (
                    <WorkoutDetails workout={workout}/>
                ))}
            </div>

            <div className='container'>
                <button>
                    <a href="/Addworkout" style={{ color: 'white', textDecoration: 'none' }}>Addworkout</a>
                </button>
            </div>

        </div>




    )
}

export default WorkoutSchdulerAdmin;