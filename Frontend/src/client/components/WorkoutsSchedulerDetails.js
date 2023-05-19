import { useState, useEffect } from 'react'
import { WorkoutForm } from './WorkoutSchedulerForm'

const WorkoutDetails = ({ workout }) => {

  const prop = JSON.parse(localStorage.getItem('propUser'));

  const [editMode, setEditMode] = useState(false)
  const [wName, setWName] = useState([]);
  const [wLoad, setLoad] = useState([]);
  const [wRep, setRep] = useState([]);
  const [query] = useState(prop.userName)

    console.log({query})
  const [error, setError] = useState(null)

  useEffect(() => {
    if (workout) {
      setWName(workout.workoutsArray || []);
      setLoad(workout.workOutSetArray || []);
      setRep(workout.workOutRepArray || []);
    }
  }, [workout]);

  console.log('Workout ishere' + workout)
  console.log('wName:', wName);
  console.log('wLoad:', wLoad);
  console.log('wRep:', wRep);

  const handleClick = async () => {
    const response = await fetch(`/api/deleteSchedule?q=${query}`, {
      method: 'DELETE'
    })
    if (!response.ok) {
      throw new Error('Error deleting workout');
    }

    // Refresh the list of workouts after deleting the selected workout
    window.location.reload();

  }

  const handleUpdate = async () => {
    const response = await fetch(`/api/updateWorkoutSchedule?q=${query}`, {
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
    window.location.reload();
  };




  return (
    <div>
      <table>
        <thead></thead>
        <tbody>
          <tr>
            <th>Workout Name</th>
            <th>Load (Kg)</th>
            <th>Reps</th>
          </tr>
          {editMode ? (
            wName.map((name, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      const updatedNames = [...wName];
                      updatedNames[index] = e.target.value;
                      setWName(updatedNames);
                    }}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={wLoad[index]}
                    onChange={(e) => {
                      const updatedLoads = [...wLoad];
                      updatedLoads[index] = e.target.value;
                      setLoad(updatedLoads);
                    }}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={wRep[index]}
                    onChange={(e) => {
                      const updatedReps = [...wRep];
                      updatedReps[index] = e.target.value;
                      setRep(updatedReps);
                    }}
                  />
                </td>

              </tr>
            ))
          ) : (
            wName.map((name, index) => (
              <tr className="workouts" key={index}>
                <td>{name}</td>
                <td>
                  <strong></strong> {wLoad[index]}
                </td>
                <td>
                  <strong></strong> {wRep[index]}
                </td>

              </tr>
            ))
          )}
        </tbody>
      </table><br />
      {editMode ? (
        <div>
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setEditMode(false)}>Cancel</button>
        </div>

      ) : (
        <div>
          <button className='delbtn' onClick={handleClick}>Delete</button>
          <button onClick={() => setEditMode(true)}>Update</button>
        </div>
      )}
    </div>
  );
}

export default WorkoutDetails