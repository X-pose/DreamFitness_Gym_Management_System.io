import { useState } from 'react';
import '../../public/css/FAQin.css';

const FAQin = () => {

  const [title, setTitle] = useState('');
  const [load, setLoad] = useState('');
  const [cat, setCat] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    const workout = { title, load, cat };

    const response = await fetch('/api/FAQ', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type':'application/json',
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setTitle('');
      setLoad('');
      setCat('');
      setError(null);
      console.log('new workout added', json);
    }
  };

  return (
    <form className="createexer" onSubmit={handleSubmit}>
      <h3>Insert F A Q</h3>
      <br></br><br></br><br></br>
      <label>Question</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        required
      />

      <label>Answer:</label>
      <input
        type="text"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        required
      />

      <label>Category:</label>
      <div className='cateinsert'>
      <select
        value={cat}
        onChange={(e) => setCat(e.target.value)}
        required
      >
        <option value="">Select a category</option>
        <option value="General">General</option>
        <option value="Facilities">Facilities</option>
        <option value="Payment">Payment</option>
      </select>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <button>Add FAQ</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};




export default FAQin;
