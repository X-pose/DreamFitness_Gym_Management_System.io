import { useState, useEffect } from "react";

const WorkoutForm = ({ currentSch }) => {
    const prop = JSON.parse(localStorage.getItem('propUser'));

    const [query] = useState(prop.userName)
    const [wName, setWName] = useState([]);
    const [wLoad, setLoad] = useState([]);
    const [wRep, setRep] = useState([]);
    const [error, setError] = useState(null);



    useEffect(() => {
        if (currentSch) {
            setWName(currentSch.workoutsArray || []);
            setLoad(currentSch.workOutSetArray || []);
            setRep(currentSch.workOutRepArray || []);
        }
    }, [currentSch]);

    const handleSubmit = async () => {
        const response = await fetch(`/api/addScheduleItems?q=${query}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: wName,
                load: wLoad,
                reps: wRep,
            }),
        });

        if (!response.ok) {
            throw new Error('Error updating workout');
        }

        // Refresh the list of workouts after updating the selected workout
        window.location.href = '/WorkoutSchedulerAdmin';
    };




    return (
        <form className="createexer" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>
            <label>Exercise Title:</label>
            <input
                type="text"
                onChange={(e) => setWName(e.target.value)}
                value={wName}
                required
            />

            <label>Load (in Kg):</label>
            <input
                type="number"
                onChange={(e) => setLoad(e.target.value)}
                value={wLoad}
                required
            />

            <label>Reps:</label>
            <input
                type="number"
                onChange={(e) => setRep(e.target.value)}
                value={wRep}
                required
            />


            <button>Add Workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    )

}


export default WorkoutForm;