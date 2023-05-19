import { useState } from "react";
import "../../public/css/footer.css";
import "../../public/css/instructorform.css";

const InstructorForm = () => {

    const[title, setTitle] = useState('')
    const[description, setDescription] = useState('')
    const[quote, setQuotes] = useState('')
    const[certification, setCertification] = useState('')
    const[error, setError] = useState(null)
    const[bodybuilding, setbodybuilding] = useState('')
    const[cardio, setcardio] = useState('')
    const[weightloss, setweightloss] = useState('')
    const[displayImg,setDisplayImg] = useState('')


    const handleSubmit = async (e) =>{
        
        let formData = new FormData();

        formData.append('title',title)
        formData.append('description',description)
        formData.append('quote',quote)
        formData.append('certification',certification)
        formData.append('bodybuilding',bodybuilding)
        formData.append('cardio',cardio)
        formData.append('weightloss',weightloss)
        formData.append('displayImg',displayImg)


        

        const responce = await fetch('/api/Instructors',{
            method: 'POST',
            body: formData,
            
            
        })
        console.log("passing echo")
        const json = await responce.json()

        if(!responce.ok){
            setError(json.error)
        }
        if(responce.ok){
            setTitle('')
            setDescription('')
            setQuotes('')
            setCertification('')
            setError(null)
            console.log('new workout added', json)
            window.location.href = '/EditInstructor'
        }
        console.log(error)
    }

    return(
        <form className="createexer" onSubmit={handleSubmit}>
            <div className="topic">Add a new Instructor</div>
            <br/><br/>
            <label>Instructor  Name:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}

                required
            />
            

        <label>Description :</label>
            <input
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                value={description}

                required
            />
            
 
        <label>Quote:</label>
            <input
                type="text"
                onChange={(e) => setQuotes(e.target.value)}
                value={quote}

                required
            />


        <label>Certification:</label>
            <input
                type="text"
                onChange={(e) => setCertification(e.target.value)}
                value={certification}

                required
            />

            <br/>
            <br/>

            <div className="specialty">
            <label>Body Building: {bodybuilding}%</label>
            <input
                type="range"
                min="0"
                max="100"
                onChange={(e) => setbodybuilding(e.target.value)}
                value={bodybuilding}

                required
            />
            <br/>

            <label>Cardio: {cardio}%</label>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            onChange={(e) => setcardio(e.target.value)}
                            value={cardio}

                            required
                        />
             <br/>           

            <label>Weight loss: {weightloss}%</label>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            onChange={(e) => setweightloss(e.target.value)}
                            value={weightloss}

                            required
                        />
                        <label>Display Image: </label>
                        <input
                            type="file"
                            
                            onChange={(e) => setDisplayImg(e.target.files[0])}
                            

                            
                        />
                        </div>


            <br/>
            <br/>
            <br/>

            <button className="sub">
                <div className="bname">Submit</div>
            </button>
            {error && <div className="error">{error}</div>}
        </form>
    )
    
}


export default InstructorForm;