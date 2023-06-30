import React from 'react';
import UpdateInstructorDetails from '../components/UpdateInstructorDetails';
import '../../public/css/viewonlyinstructors.css';
import '../../public/css/instructorscheduler.css';

import { useEffect, useState } from "react";


export default function ViewOnlyInstructors() {

    const [instructor , setInstructor] = useState(null);

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('/api/Instructors');
            const json = await response.json();
            
            if (response.ok) {
                setInstructor(json);
            }
        };  

        fetchWorkouts();
    }, []);

    return (
        <div>
           

            <div className='topiccc'>Meet Our Team</div>



            {instructor && instructor.map(instruct => (
                <UpdateInstructorDetails key={instruct._id} instruct={instruct} />
            ))}
        </div>
    );
}
