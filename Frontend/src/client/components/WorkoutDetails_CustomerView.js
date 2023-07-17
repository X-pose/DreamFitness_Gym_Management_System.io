import { useState } from 'react';

import PropTypes from 'prop-types';
import '../../public/css/exerciseDemo_customerView.css'
/*import { toast } from 'react-toastify' */

const WorkoutDetails = ({ workout, onDelete, onUpdate }) => {
  const [editMode, setEditMode] = useState(false);
  const [newworkoutName, setnewworkoutName] = useState(workout.workoutName);
  const [newworkoutDesc, setnewworkoutDesc] = useState(workout.workoutDesc);
  const [newworkoutGif, setnewworkoutGif] = useState(workout.workoutGif);
  const [newmuscle, setnewmuscle] = useState(workout.muscle);
  const [newprimaryGoal, setnewprimaryGoal] = useState(workout.primaryGoal);
  const [newgoalDesc, setnewgoalDesc] = useState(workout.goalDesc);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    const response = await fetch('/api/exDemo/' + workout._id, {
      method: 'DELETE'
    });
    const json = await response.json();

    if (response.ok) {

      window.location.href = '/exerciseDemoAdmin'
      /*toast.success('Workout deleted successfully');*/
    } else {
      setError(json.error);
    }
  };

  const handleClick_update = async (e) => {
    e.preventDefault();


    let formData = new FormData();

    formData.append('workoutName', newworkoutName)
    formData.append('workoutDesc', newworkoutDesc)
    formData.append('workoutGif', newworkoutGif)
    formData.append('muscle', newmuscle)
    formData.append('primaryGoal', newprimaryGoal)
    formData.append('goalDesc', newgoalDesc)


    console.log('Sending update request...');

    const response = await fetch('/api/exDemo/' + workout._id, {
      method: 'PATCH',
      body: formData,

    });

    console.log('Received update response:', response);

    const json = await response.json();

    console.log('Parsed update response:', json);

    if (response.ok) {

      setEditMode(false);
      console.log('Update works for the exDemo')
      window.location.href = '/exerciseDemoAdmin'
      /*toast.success('Workout updated successfully');*/
    } else {
      setError(json.error);

    }


  };

  const handleCancel = () => {
    setnewworkoutName(workout.workoutName);
    setEditMode(false);
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  return (

    <div className="workout-detailsExDemo">
      {!editMode ? (
        <>
          <h2 style={{ color: 'white', fontWeight: 'bold' }}>{workout.workoutName}</h2>

          <div className='demoContainer'>
            <div className='leftDemoContainter'>
              <img src={newworkoutGif} className='imgStyle'/>
            </div>
            <div className='rightDemoContainer'>
              <p><strong><h3>Description:   </h3></strong>{workout.workoutDesc}</p>
              <br></br>
              <p><strong><h3>Muscle:  </h3></strong>{workout.muscle}</p>
              <br></br>
              <p><strong><h3>Primary Goal:  </h3></strong>{workout.primaryGoal}</p>
              <br></br>
              <p><strong><h3>Goal Description:  </h3></strong>{workout.goalDesc}</p>
              <p>{workout.createdAt}</p>
            </div>
          </div>
        </>
      ) : (
        <form >

        </form>
      )}
      {error && <div className="error">{error}</div>}
    </div>
  );
};

WorkoutDetails.propTypes = {
  workout: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired
};

export default WorkoutDetails;
