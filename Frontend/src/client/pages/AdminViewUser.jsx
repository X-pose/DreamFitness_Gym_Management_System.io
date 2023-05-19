import React, { useEffect, useState } from 'react';
import '../../public/css/adminViewUser.css'







import ProgressBar from 'react-bootstrap/ProgressBar';
import downloadPDF from '../components/userDetailsPDF';


function AdminViewUserDetails() {
    const prop = JSON.parse(localStorage.getItem('propUser'));

    const [userDetails, setUserDetails] = useState('');
    const [generateReport, setGenerateReport] = useState(false);

    useEffect(() => {



        setUserDetails(prop)

    }, [])

   

    return (



        <div>

            <div className="profile-containerAD">


                <div className='nameEmailAD'>
                    <img src={userDetails.proPic} ></img>
                    <h1><b>{userDetails.userName}</b></h1>
                    <p>{userDetails.email}</p>
                </div>

                <div className="content-containerAD">
                    <div className="sub-containerLeftAD">
                        <div className='accountCompletionAD'>
                            <div className="progressbarAD">


                                <label className='accCmpltLabelAD'>Account completion</label>
                                <ProgressBar variant="success" animated now={userDetails.accountStatus} label={`${userDetails.accountStatus}%`} />
                            </div>
                            <a href='/MyAccount/update'>

                            </a>

                        </div>
                        <div className='myPlanContainerAD'>
                            <div className='myPlanAlignAD'>
                                <h3 className='MMP_textAD'>{userDetails.userName}'s membership plan : </h3>
                                <div className="rounded-rectangleAD">
                                    <span className="value2AD">{userDetails.myFitnessPlan}</span>
                                </div>
                            </div>
                            <div className='myPlanAlignAD'>

                            </div>
                            <div className='btnStackUADAD'>
                                <a href="/WorkoutSchedulerAdmin" style={{ color: 'white', textDecoration: 'none' }}>
                                    <button className='myPlansAD'>{userDetails.userName}'s workout schdule</button>
                                </a>

                                <a href="/adminDietPlan" style={{ color: 'white', textDecoration: 'none' }}>
                                    <button className='myPlansAD'>{userDetails.userName}'s Diet Plan</button>
                                </a>
                                <a href="/downloadUserDetails" style={{ color: 'white', textDecoration: 'none' }}>

                                <button  className='myPlansAD'>Download {userDetails.userName}'s Details</button>
                                </a>
                                

                              
                                

                            </div>

                        </div>
                    </div>
                    <div className="sub-containerMiddleAD">
                        <div>
                            <div className='middleAlignAD'>
                                <div className='divFieldsAD'>
                                    <label className='label-alignAD'>User Name</label>
                                    <div className="middleRoundedRectAD">
                                        <span className="valueAD">{userDetails.userName}</span>
                                    </div>
                                </div>
                                <div className='divFieldsAD'>
                                    <label className='label-alignAD'>Age</label>
                                    <div className="middleRoundedRectAD">
                                        <span className="valueAD">{userDetails.age}</span>
                                    </div>
                                </div>
                            </div>

                            <div className='middleAlignAD'>
                                <div className='divFieldsAD'>
                                    <label className='label-alignAD'>First Name</label>
                                    <div className="middleRoundedRectAD">
                                        <span className="valueAD">{userDetails.fName}</span>
                                    </div>
                                </div>
                                <div className='divFieldsAD'>
                                    <label className='label-alignAD'>Last Name</label>
                                    <div className="middleRoundedRectAD">
                                        <span className="valueAD">{userDetails.lName}</span>
                                    </div>
                                </div>
                            </div>

                            <div className='middleAlignAD'>
                                <div className='divFieldsAD'>
                                    <label className='label-alignAD'>Height</label>
                                    <div className="middleRoundedRectAD">
                                        <span className="valueAD">{userDetails.height} m</span>
                                    </div>
                                </div>
                                <div className='divFieldsAD'>
                                    <label className='label-alignAD'>Weight</label>

                                    <div className="middleRoundedRectAD">
                                        <span className="valueAD">{userDetails.weight} Kg</span>
                                    </div>
                                </div>
                            </div>
                            <div className='middleAlignAD'>
                                <div className='divFieldsAD'>
                                    <label className='label-alignAD'>Contact No</label>

                                    <div className="middleRoundedRectAD">
                                        <span className="valueAD">{userDetails.contactNo}</span>
                                    </div>
                                </div>
                                <div className='divFieldsAD'>
                                    <label className='label-alignAD'>Emergency Contact Number</label>

                                    <div className="middleRoundedRectAD">
                                        <span className="valueAD">{userDetails.emergencyContact}</span>
                                    </div>
                                </div>
                            </div>
                            <div className='middleAlignAD'>
                                <div className='divFieldsAD'>
                                    <label className='label-alignAD'>Address</label>

                                    <div className="middleRoundedRectAD">
                                        <span className="valueAD">{userDetails.address}</span>
                                    </div>
                                </div>
                                <div className='divFieldsAD'>
                                    <label className='label-alignAD'>Fitness Goal</label>

                                    <div className="middleRoundedRectAD">
                                        <span className="valueAD">{userDetails.goal}</span>
                                    </div>
                                </div>
                            </div>
                            <div className='middleAlignAD'>
                                <div className='divFieldsAD'>
                                    <label className='label-alignAD'>Total Fat Percentage</label>
                                    <div className="middleRoundedRectAD">
                                        <span className="valueAD">{userDetails.TFP}%</span>
                                    </div>
                                </div>
                                <div className='divFieldsAD'>
                                    <label className='label-alignAD'>BMI</label>

                                    <div className="middleRoundedRectAD">
                                        <span className="valueAD">{userDetails.BMI}</span>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                    <div className='sub-containerRightAD'>
                        <div className='divFieldsAD'>
                            <label className='accCmpltLabelAD'>Payment method</label>
                            <div className="middleRoundedRectAD">
                                <span className="valueAD">{userDetails.paymentMethod}</span>
                            </div>
                        </div>
                        <div className='divFieldsAD'>
                            <label className='accCmpltLabelAD'>Payment status</label>
                            <div className="middleRoundedRectAD">
                                <span className="valueAD">{userDetails.paymentStatus}</span>
                            </div>
                        </div>
                        <div className='divFieldsAD'>
                            <label className='accCmpltLabelAD'>Plan started date</label>
                            <div className="middleRoundedRectAD">
                                <span className="valueAD">{userDetails.planStartedDate}</span>
                            </div>
                        </div>
                        <div className='divFieldsAD'>
                            <label className='accCmpltLabelAD'>Account created date</label>
                            <div className="middleRoundedRectAD">
                                <span className="valueAD">{userDetails.accountCreatedDate}</span>
                            </div>
                        </div>

                    </div>


                </div>


            </div>

           

        </div>



    );
}

export default AdminViewUserDetails