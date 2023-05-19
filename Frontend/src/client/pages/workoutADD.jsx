



import '../../public/css/workoutScheduler.css';


import { useEffect, useState } from "react";

//components
import WorkoutSchedulerDetailscustom from '../components/WorkoutsSchedulerDetailscustom';
import WorkoutSchedulerForm from '../components/WorkoutSchedulerForm';
const prop = JSON.parse(localStorage.getItem('propUser'));

const Addworkout = () => {
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


            <h1 className='Nameone'>WORKOUT SCHEDULE</h1>
            <div className='cus'>
                <h2 className='cusname'>{prop.userName}</h2>
                <h2 className='cusname'>Age - {prop.age}</h2>
                <h2 className='cusname'>Weight - {prop.weight} Kg</h2>
                <h2 className='cusname'>BMI - {prop.BMI}</h2>
                <h2 className='cusname'>TFP - {prop.TFP}%</h2>
            </div>
            <div className="workouts">

            </div>

            <div className='container'>
                <WorkoutSchedulerForm currentSch = {workouts}/>
            </div>






        </div>
    )
}

export default Addworkout;