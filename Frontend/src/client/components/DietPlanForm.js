import { useState } from 'react';
import '../../public/css/DietPlanForm.css';

const DietPlanForm = () => {
  const [title, setTitle] = useState('');
  const [gram, setGram] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
   
    let error = '';
    if (!title) {
      error += 'Please enter a food name !' ;
    }
    if (!gram) {
      error += '  Please enter a portion in grams! ';
    }
    if (!description) {
      error += '  Please enter a description!';
    }
    if (error) {
      setError(error);
      return;
    }

    const dietPlan = { title, gram, description };

    const response = await fetch('/api/dietPlan/', {
      method: 'POST',
      body: JSON.stringify(dietPlan),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setTitle('');
      setGram('');
      setDescription('');
      setError(null);
      console.log('new diet plan added', json);
    }
  };

  return (
    <div className='DPstartedd'>
          <h3 className='headdeitx'>Add A Food To User Diet Plan</h3>
    
    <form onSubmit={handleSubmit}>
    <div className='DPtopSpace'>  
    </div>

      <div className="DPtop_text_form">
          </div>
      <div className="DPlabels">
        <label>Food Name: </label>
        <input
          className="DPinputs"
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </div>
      <br />

      <div className="DPlabels">
        <label>Potion (in g): </label>
        <input
          className="DPinputs"
          type="number"
          min = '0'
          onChange={(e) => setGram(e.target.value)}
          value={gram}
        />
      </div>

      <br />

      <div className="DPlabels">
        <label>Description: </label>
        <input
            type="text"
          className="DPinputs"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
      </div>

      <div className="DPadd_diet_btn_alignment">
        <button className="DPadd_diet_plan_btn">Add Diet Plan</button>
      </div>

      

      {error && <div className="DPerror">{error}</div>}
    </form>
   </div>
  );
};

export default DietPlanForm;