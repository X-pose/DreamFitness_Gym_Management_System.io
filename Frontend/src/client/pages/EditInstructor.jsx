import '../../public/css/instructorscheduler.css'
import { useEffect, useState } from "react";

//components
import InstructorDetails from "../components/InstructorDetails";

export default function EditInstructor() {


    const [instructorData, setinstructorData] = useState(null)

    useEffect(() => {

        const fetchInstructor = async () => {
            const responce = await fetch('/api/Instructors')
            const json = await responce.json()

            if (responce.ok) {
                setinstructorData(json)
                console.log(json)
            }
        }

        fetchInstructor()
    }, [])



    return (
        <div>


            <div>


                <div className="workouts">
                    {instructorData && instructorData.map((instructor) => (
                        <InstructorDetails key={instructor._id} instructor={instructor} />
                    ))}
                </div>

                <div className='container'>

                </div>



            </div>


        </div>
    )
}
