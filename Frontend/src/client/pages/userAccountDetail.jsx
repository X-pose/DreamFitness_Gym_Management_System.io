import React from "react";
import { useEffect, useState } from "react";
import '../../public/css/accDisUpd.css'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Form from 'react-bootstrap/Form';



function AccountDisplayUpdate() {
    //Form validation consts
    const currentYear = new Date().getFullYear();
    const minDOB = currentYear - 80; // Minimum DOB: 80 years ago
    const maxDOB = currentYear - 6; // Maximum DOB: 6 years ago

    const [showPopup, setShowPopup] = useState(false);

    const handleCheckboxChange = (e) => {
        const isChecked = e.target.checked;
        setShowPopup(isChecked);
    };

    // Display a notification when showPopup becomes true
    if (showPopup) {

        toast.warning('Please contact an Instructor before proceding!', {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {

        const fetchUserDetails = async () => {
            console.log('Data retrive initiated phase 2')
            const response = await fetch('/api/accountdetails')
            const json = await response.json()

            if (response.ok) {
                setUserDetails(json)
                setfName(json.fName)
                setlName(json.lName)
                setAddress(json.address)
                setContactNo(json.contactNo)
                setEmergencyContact(json.emergencyContact)
                setDOB(json.DOB)
                setGender(json.gender)
                setNIC(json.NIC)
                setEmail(json.email)
                setGoal(json.goal)
                setHeight(json.height)
                setWeight(json.weight)
                setTFP(json.TFP)



            }
        }

        fetchUserDetails()

    }, [])

    const [editMode, setEditMode] = useState(false)
    const [fName, setfName] = useState(userDetails?.fName);
    const [lName, setlName] = useState(userDetails?.lName);
    const [address, setAddress] = useState(userDetails?.address);
    const [contactNo, setContactNo] = useState(userDetails?.contactNo);
    const [emergencyContact, setEmergencyContact] = useState(userDetails?.emergencyContact);
    const [DOB, setDOB] = useState(userDetails?.DOB);
    const [gender, setGender] = useState(userDetails?.gender);
    const [NIC, setNIC] = useState(userDetails?.NIC);
    const [email, setEmail] = useState(userDetails?.email);

    const [goal, setGoal] = useState(userDetails?.goal);

    const [height, setHeight] = useState(userDetails?.height);
    const [weight, setWeight] = useState(userDetails?.weight);
    const [TFP, setTFP] = useState(userDetails?.TFP);
    const [proPic, setProPic] = useState(userDetails?.proPic);
    const [Error, setError] = useState('');

    const UpdSubmit = async () => {
        try {
            // create a new FormData object
            let formData = new FormData();

            // append the form fields to the FormData object
            formData.append('fName', fName);
            formData.append('lName', lName);
            formData.append('address', address);
            formData.append('contactNo', contactNo);
            formData.append('emergencyContact', emergencyContact);
            formData.append('DOB', DOB);
            formData.append('gender', gender);
            formData.append('NIC', NIC);
            formData.append('email', email);
            formData.append('height', height);
            formData.append('weight', weight);
            formData.append('TFP', TFP);
            formData.append('goal', goal);

            // append the file to the FormData object
            formData.append('proPic', proPic);

            // create the request object
            const request = new Request('/api/updateMyDetails', {
                method: 'PUT',
                body: formData,

            });

            // send the request using fetch
            fetch(request)
                .then((response) => {
                    if (response.ok) {
                        // handle success
                        toast.success('Details updated successfully!', {
                            position: toast.POSITION.TOP_RIGHT,
                        });
                        setError(null);
                        console.log('User details updated successfully!');
                        setUserDetails(request);

                        setTimeout(function () {
                            window.location.href = '/MyAccount';
                        }, 5000);
                    } else {
                        // handle error
                        toast.error('Something went wrong. Please try again', {
                            position: toast.POSITION.TOP_RIGHT,
                        });
                        setError(request.Error);
                        console.error('Failed to update user details:', request.error);
                    }
                })
                .catch((error) => {
                    // handle error
                    console.error('An error occurred while updating user details:', error);
                });




        } catch (error) {
            console.error('An error occurred while updating user details:', error);
        }
    };

    return (
        <div>
            <ToastContainer />
            <div className="main-container">
                <h1 style={{ color: "black" }}><b>My Details</b></h1>
                {editMode ? (
                    <div className="updPanelContainer">
                    
                        
                            <div className="leftColumn">
                                <div className="left-top-container">
                                    <h2 className="left-Top-Header">General details</h2><br/>

                                    <div>
                                        <label>First Name</label>
                                        <input type='text' onChange={(e) => setfName(e.target.value)} value={fName} style={{ color: 'black', textDecoration: 'none' }} />

                                    </div>
                                    <div>
                                        <label>Last Name</label>
                                        <input type='text' onChange={(e) => setlName(e.target.value)} value={lName} style={{ color: 'black', textDecoration: 'none' }} />
                                    </div>
                                    <div>
                                        <label>Address</label>
                                        <textarea className="address" rows="4" cols="50" onChange={(e) => setAddress(e.target.value)} value={address} style={{ color: 'black', textDecoration: 'none' }}></textarea>
                                    </div>
                                    <div>
                                        <label>Contact No</label>
                                        <input type='number' onChange={(e) => setContactNo(e.target.value)} value={contactNo} style={{ color: 'black', textDecoration: 'none' }} minLength={10} />
                                    </div>
                                    <div>
                                        <label>Emergency Contact No</label>
                                        <input type='number' onChange={(e) => setEmergencyContact(e.target.value)} value={emergencyContact} style={{ color: 'black', textDecoration: 'none' }} minLength={10} />
                                    </div>
                                    <div>
                                        <label>Date of birth</label>
                                        <input type='date' onChange={(e) => setDOB(e.target.value)} value={DOB} style={{ color: 'black', textDecoration: 'none' }} min={`${minDOB}-01-01`} max={`${maxDOB}-12-31`} />
                                    </div>
                                    <div>
                                        <fieldset>
                                            <legend style={{color:"white"}}>Gender</legend>
                                            <label for="Male"> Male </label>
                                            <input type='radio' id='Male' onChange={(e) => setGender(e.target.value)} value='Male' />
                                            <label for="Female"> Female </label>
                                            <input type='radio' id='Female' onChange={(e) => setGender(e.target.value)} value="Female" />
                                            <label for="Other"> Other </label>
                                            <input type='radio' id='Other' onChange={(e) => setGender(e.target.value)} value="Other" />

                                        </fieldset>
                                    </div>
                                    <div>
                                        <label>National ID</label>
                                        <input type='text' onChange={(e) => setNIC(e.target.value)} value={NIC} style={{ color: 'black', textDecoration: 'none' }} pattern="\d{9}\d|(\d{9}V)" />
                                    </div>
                                    <div>
                                        <label>Email</label>
                                        <input type='email' onChange={(e) => setEmail(e.target.value)} value={email} style={{ color: 'black', textDecoration: 'none' }} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" />
                                    </div>
                                    <div>
                                        <label>Update My profile Picture</label>
                                        <input type="file" onChange={(e) => setProPic(e.target.files[0])} />
                                    </div>
                                </div>
                                <div className="Left-bottom-container">
                                    <div>
                                        <button type="button" onClick={UpdSubmit} className="subBtn1"> Update</button>
                                    </div>
                                    <div>
                                        <button type="button" className="subBtn2" onClick={() => setEditMode(false)}> Go back</button>
                                    </div>

                                </div>
                            </div>
                            <div className="Middle-container">
                                <h1 className="middleHeader"><b><u>Physical Activity Readiness Questionnaire (PAR-Q)</u></b></h1>
                                
                                    <div>

                                        <div>
                                            <label for='q1'>Has your doctor ever said that you have a heart condition and that you should only do physical activity recommended by a doctor?</label>
                                        </div>
                                        <Form.Check type="switch" id="q1" onChange={handleCheckboxChange} /><br />
                                        <div>
                                            <label for='q2'>Do you feel pain in your chest when you do physical activity?</label>
                                        </div>
                                        <Form.Check type="switch" id="q1" onChange={handleCheckboxChange} /><br />

                                        <div>
                                            <label for='q3'>In the past month, have you had chest pain when you were not doing physical activity?</label>
                                        </div>
                                        <Form.Check type="switch" id="q1" onChange={handleCheckboxChange} /><br />

                                        <div>
                                            <label for='q4'>Do you lose your balance because of dizziness or do you ever lose consciousness?</label>
                                        </div>
                                        <Form.Check type="switch" id="q1" onChange={handleCheckboxChange} /><br />

                                        <div>
                                            <label for='q5'>Do you have a bone or joint problem that could be made worse by a change in your physical activity?</label>
                                        </div>
                                        <Form.Check type="switch" id="q1" onChange={handleCheckboxChange} /><br />

                                        <div>
                                            <label for='q6'>Is your doctor currently prescribing drugs (for example, water pills) for your blood pressure or heart condition?</label>
                                        </div>
                                        <Form.Check type="switch" id="q1" onChange={handleCheckboxChange} /><br />

                                        <div>
                                            <label for='q7'>Do you know of any other reason why you should not do physical activity?</label>
                                        </div>
                                        <Form.Check type="switch" id="q1" onChange={handleCheckboxChange} /><br />

                                    </div>
                                

                            </div>
                            <div className="RightColumn">

                                <div className="Right-Top-container">
                                    <h2 className="left-Top-Header">Bio-Metric details</h2><br/>

                                    <div>
                                        <label>Height</label>
                                        <input type='number' onChange={(e) => setHeight(e.target.value)} value={height} placeholder="m" style={{ color: 'black', textDecoration: 'none' }} min={0} max={2.6} />
                                    </div>
                                    <div>
                                        <label>Weight</label>
                                        <input type='number' onChange={(e) => setWeight(e.target.value)} value={weight} placeholder="Kg" style={{ color: 'black', textDecoration: 'none' }} min={0} max={700} />
                                    </div>
                                    <div>
                                        <label>Total Fat Percentage</label>
                                        <input type='number' onChange={(e) => setTFP(e.target.value)} value={TFP} style={{ color: 'black', textDecoration: 'none' }} />
                                    </div>

                                </div>


                                <div className="Right-Bottom-Container">
                                    <h2>My Fitness Goal</h2>
                                    <div>
                                        <label for='Fit'>Fitness</label>
                                        <input type='radio' id='Fit' name="myRadioGroup" value='Strength' onChange={(e) => setGoal(e.target.value)} defaultChecked /><br />
                                        <label for='WL'>WeightLoss</label>
                                        <input type='radio' id='WL' name="myRadioGroup" value='WeightLoss' onChange={(e) => setGoal(e.target.value)} /><br />

                                    </div>
                                </div>


                            </div>
                    
                    </div>
                ) : (
                    <div className="updPanelContainer">
                        <div className="LeftColumn">
                            <div className="left-top-container">
                                <h2 className="left-Top-Header">General Details</h2><br />

                                <div className="detailField">
                                    <div>
                                        <label>First Name</label>
                                    </div>
                                    <div className="field">
                                        <a style={{ textDecoration: 'none' }}>{userDetails?.fName}</a>
                                    </div>
                                </div>
                                <div className="detailField">
                                    <div>
                                        <label>Last Name</label>
                                    </div>
                                    <div className="field">
                                        <a style={{ textDecoration: 'none' }}>{userDetails?.lName}</a>
                                    </div>
                                </div>
                                <div className="detailField">
                                    <div>
                                        <label>Address</label>
                                    </div>
                                    <div className="field">
                                        <a style={{ textDecoration: 'none' }}>{userDetails?.address}</a>
                                    </div>
                                </div>
                                <div className="detailField">
                                    <div>
                                        <label>Contact No</label>
                                    </div>
                                    <div className="field">
                                        <a style={{ textDecoration: 'none' }}>{userDetails?.contactNo}</a>
                                    </div>
                                </div>
                                <div className="detailField">
                                    <div>
                                        <label>Emergency Contact No</label>
                                    </div>
                                    <div className="field">
                                        <a style={{ textDecoration: 'none' }}>{userDetails?.emergencyContact}</a>
                                    </div>
                                </div>
                                <div className="detailField">
                                    <div>
                                        <label>Date of birth</label>
                                    </div>
                                    <div className="field">
                                        <a style={{ textDecoration: 'none' }}>{userDetails?.DOB}</a>
                                    </div>
                                </div>
                                <div className="detailField">
                                    <div>
                                        <label>National ID</label>
                                    </div>
                                    <div className="field">
                                        <a style={{ textDecoration: 'none' }}>{userDetails?.NIC}</a>
                                    </div>
                                </div>
                                <div className="detailField">
                                    <div>
                                        <label>Email</label>
                                    </div>
                                    <div className="field">
                                        <a style={{ textDecoration: 'none' }}>{userDetails?.email}</a>
                                    </div>
                                </div>


                            </div>
                            <div className="Left-bottom-container">


                                <div>
                                    <button type="button" className="subBtn" onClick={() => setEditMode(true)}> Edit my details</button>
                                </div>
                                <div>
                                    <a href="/MyAccount" style={{ color: 'black', textDecoration: 'none' }}>
                                        <button type="button" className="subBtn2" > Go back</button>
                                    </a>
                                </div>




                            </div>
                        </div>
                        <div className="Middle-container">
                            <h1 className="middleHeader"><b><u>Physical Activity Readiness Questionnaire (PAR-Q)</u></b></h1>
                            <div>
                                <div><br /><br />
                                    <label for='q1'>Has your doctor ever said that you have a heart condition and that you should only do physical activity recommended by a doctor?</label>
                                </div>
                                <Form.Check type="switch" id="q1" disabled /><br />

                                <div>
                                    <label for='q2'>Do you feel pain in your chest when you do physical activity?</label>
                                </div>
                                <Form.Check type="switch" id="q1" disabled /><br />

                                <div>
                                    <label for='q3'>In the past month, have you had chest pain when you were not doing physical activity?</label>
                                </div>
                                <Form.Check type="switch" id="q1" disabled /><br />

                                <div>
                                    <label for='q4'>Do you lose your balance because of dizziness or do you ever lose consciousness?</label>
                                </div>
                                <Form.Check type="switch" id="q1" disabled /><br />

                                <div>
                                    <label for='q5'>Do you have a bone or joint problem that could be made worse by a change in your physical activity?</label>
                                </div>
                                <Form.Check type="switch" id="q1" disabled /><br />

                                <div>
                                    <label for='q6'>Is your doctor currently prescribing drugs (for example, water pills) for your blood pressure or heart condition?</label>
                                </div>
                                <Form.Check type="switch" id="q1" disabled /><br />

                                <div>
                                    <label for='q7'>Do you know of any other reason why you should not do physical activity?</label>
                                </div>
                                <Form.Check type="switch" id="q1" disabled /><br />

                            </div>

                        </div>
                        <div className="RightColumn">
                            <div className="Right-Top-container">
                                <h2 className="left-Top-Header">Bio-Metric details</h2><br/>

                                <div className="detailField">
                                    <div>
                                        <label>Height</label>
                                    </div>
                                    <div className="field">
                                        <a style={{ textDecoration: 'none' }}>{userDetails?.height}m</a>
                                    </div>
                                </div>
                                <div className="detailField">
                                    <div>
                                        <label>Weight</label>
                                    </div>
                                    <div className="field">
                                        <a style={{ textDecoration: 'none' }}>{userDetails?.weight}Kg</a>
                                    </div>
                                </div>
                                <div className="detailField">
                                    <div>
                                        <label>Total Fat Percentage</label>
                                    </div>
                                    <div className="field">
                                        <a style={{ textDecoration: 'none' }}>{userDetails?.TFP}%</a>
                                    </div>
                                </div>


                            </div>
                            <div className="Right-Bottom-Container">
                                <h2>My Fitness Goal</h2>
                                <div>
                                    <label for='Fit'>Fitness</label>
                                    <input type='radio' id='Fit' value='Strength' defaultChecked /><br />
                                    <label for='WL'>WeightLoss</label>
                                    <input type='radio' id='WL' value='WeightLoss' /><br />

                                </div>
                            </div>
                        </div>




                    </div>

                )}

            </div>
        </div>



    )

}

export default AccountDisplayUpdate;