import { useState } from 'react';

import '../../public/css/FAQdetail.custom.css';


const FaqdetailAdmin = ({ FAQ }) => {
  const [deleted, setDeleted] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(FAQ.title);
  const [updatedLoad, setUpdatedLoad] = useState(FAQ.load);
  const [updatedCat, setUpdatedCat] = useState(FAQ.cat);


  const handleDelete = async () => {
    const response = await fetch('/api/FAQ/' + FAQ._id, {
      method: 'DELETE',
    });
    const json = await response.json();

    if (response.ok) {
      setDeleted(true);
      window.location.reload();
    }
  };

  const handleUpdate = async () => {
    const updatedWorkout = {
      title: updatedTitle,
      load: updatedLoad,
      cat: updatedCat,
    };

    const response = await fetch('/api/FAQ/' + FAQ._id, {
      method: 'PUT',
      body: JSON.stringify(updatedWorkout),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const json = await response.json();

    if (response.ok) {
      setUpdated(true);
      console.log('Workout updated:', json);

      window.location.reload();
    }
  };

  const handleTitleChange = (e) => {
    setUpdatedTitle(e.target.value);
  };

  const handleLoadChange = (e) => {
    setUpdatedLoad(e.target.value);
  };

  const handleCatChange = (e) => {
    setUpdatedCat(e.target.value);
  };

  return (
    <div className="FAQDetails">
      {!deleted && (
        <div className="det">
          <details>
            <summary>{FAQ.title}</summary>
            <p className="ans">
              <strong>
                <a className="red">Answet -</a>
              </strong>{' '}
              {FAQ.load}
            </p>
            <p className="ans">Category- {FAQ.cat}</p>
            {!updated && (
              <div>
                <label htmlFor="title">Question:</label>
                <input
                  type="text"
                  id="title"
                  value={updatedTitle}
                  onChange={handleTitleChange}
                />
                <label htmlFor="load">Answer:</label>
                <input
                  type="text"
                  id="load"
                  value={updatedLoad}
                  onChange={handleLoadChange}
                />
                <label htmlFor="cat">Category:</label>
                <select id="cat" value={updatedCat} onChange={handleCatChange}>
                  <option value="General">General</option>
                  <option value="Fitness plans">Fitness plans</option>
                  <option value="Memberships">Memberships</option>
                </select>

                <button onClick={handleUpdate}>Update</button>
              </div>
            )}
            {updated && <p>FAQ updated successfully!</p>}
            <button onClick={handleDelete}>Delete</button>
          </details>
        </div>
      )}
    </div>
  );
}

export default FaqdetailAdmin;
