import React, { useEffect, useState } from 'react';
import '../../public/css/userAccount.css'
import Cookies from 'js-cookie'
import '../../public/css/notify.css'
import { cookieSet } from '../cookieConfig';



import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteAccountConfirm from '../components/DeleteAccount';
import '../../public/css/searchUser.css'
import ProgressBar from 'react-bootstrap/ProgressBar';


function UserAccountDisplay() {



  console.log('Data retrive initiated')

  const [userDetails, setUserDetails] = useState(null);
  const [image, setImage] = useState('')
  const [results, setResults] = useState([]);



  useEffect(() => {

    const fetchUserDetails = async () => {
      console.log('Data retrive initiated phase 2')
      const response = await fetch('/api/accountdetails')

      const json = await response.json()


      if (response.ok) {
        setUserDetails(json)

        setImage(userDetails?.proPic)
      }
    }

    fetchUserDetails();
    searchNotify();
  }, [userDetails?.userName])

  async function logOutUser() {
    const resp = await fetch('/api/logout', {
      method: 'POST',

    })

    if (resp.ok) {
      Cookies.remove('sessionName')
      window.location.href = '/'
    }
  }

  async function searchNotify() {

    try {
      const response = await fetch(`/api/getNotify`, {
        method: 'GET'
      });
      const data = await response.json();
      setResults(data);
      if (response.ok) {
        console.log("Notify data retrived! : " + data)
      } else {
        console.log("Notify data retrive failed")
      }
    } catch (error) {
      console.error(error);
    }
  }






  return (



    <div><ToastContainer />

      <div className="profile-container">


        <div className='nameEmail'>
          <img src={image} ></img>
          <h1><b>{userDetails?.userName}</b></h1>
          <p>{userDetails?.email}</p>
        </div>
      <div className='content_container'>
      
          <div className="sub-containerLeft">
            <div className='accountCompletion'>
              <div className="progressbar">


                <label className='accCmpltLabel'>Account completion</label>
                <ProgressBar variant="success" animated now={userDetails?.accountStatus} label={`${userDetails?.accountStatus}%`} />
              </div>
              <a href='/MyAccount/update'>
                <div className='cmpltAccout'> <button className='btnCmpltAcc'>Complete my account</button></div>
              </a>

            </div>
            <div className='myPlanContainer'>
              <div className='myPlanAlign'>
                <h3 className='MMP_text'>My membership plan : </h3>
                <div className="rounded-rectangle">
                  <span className="value2">{userDetails?.myFitnessPlan}</span>
                </div>
              </div>
              <div className='myPlanAlign'>
                <a href='/ChangePlan'>
                  <button className='chngMyPlan'>Change my plan</button>
                </a>

                <button className='cancelMyPlan'>Cancel my plan</button>
              </div>
              <div className='btnStackUAD'>
                <a href="/WorkoutSchedulerCustom" style={{ color: 'white', textDecoration: 'none' }}>
                  <button className='myPlans'>My workout schdule</button>
                </a>
                <a href="/exerciseDemoHome" style={{ color: 'white', textDecoration: 'none' }}>
                  <button className='myPlans'>Workout demonstrator</button>
                </a>
                <a href="/userDietPlan" style={{ color: 'white', textDecoration: 'none' }}>
                  <button className='myPlans'>My Diet Plan</button>
                </a>
                <a href="/MyProgress" style={{ color: 'white', textDecoration: 'none' }}>
                  <button className='myPlans'>Track My Progress</button>
                </a>
                <a href="/ViewOnlyInstructors" style={{ color: 'white', textDecoration: 'none' }}>
                  <button className='myPlans'>Contact Instructors</button>
                </a>
                <a href="/addMyFeedbacks" style={{ color: 'white', textDecoration: 'none' }}>
                  <button className='myPlans'>Add feedbacks</button>
                </a>



              </div>

            </div>
          </div>
          <div className="sub-containerMiddle">
            <div >
              <div className='middleAlign'>
                <div className='divFields'>
                  <label className='label-align'>Name</label>
                  <div className="middleRoundedRect">
                    <span className="value">{userDetails?.userName ?? "N/A"}</span>
                  </div>
                </div>
                <div className='divFields'>
                  <label className='label-align'>Age</label>
                  <div className="middleRoundedRect">
                    <span className="value">{userDetails?.age ?? "N/A"}</span>
                  </div>
                </div>
              </div>

              <div className='middleAlign'>
                <div className='divFields'>
                  <label className='label-align'>Height</label>
                  <div className="middleRoundedRect">
                    <span className="value">{userDetails?.height !== null? `${userDetails?.height}m` : 'N/A'}</span>
                  </div>
                </div>
                <div className='divFields'>
                  <label className='label-align'>Weight</label>

                  <div className="middleRoundedRect">
                    <span className="value">{userDetails?.weight !== null ? `${userDetails?.weight}Kg` : 'N/A'}</span>
                  </div>
                </div>
              </div>
              <div className='middleAlign'>
                <div className='divFields'>
                  <label className='label-align'>Contact No</label>

                  <div className="middleRoundedRect">
                    <span className="value">{userDetails?.contactNo ?? "N/A"}</span>
                  </div>
                </div>
                <div className='divFields'>
                  <label className='label-align'>BMI</label>

                  <div className="middleRoundedRect">
                    <span className="value">{userDetails?.BMI ?? "N/A"}</span>
                  </div>
                </div>
              </div>
              <div className='middleAlignAddress'>
                <div className='divFields'>
                  <label className='label-align'>Address</label>

                  <div className="middleRoundedRectAddress">
                    <span className="value">{userDetails?.address ?? "N/A"}</span>
                  </div>
                </div>
                <div className='divFields'>
                  <label className='label-align'>Fitness Goal</label>

                  <div className="middleRoundedRect">
                    <span className="value">{userDetails?.goal ?? "N/A"}</span>
                  </div>
                </div>
              </div>
              <div className='middleAlign'>
                <div className='divFields'>
                  <label className='label-align'>Total Fat Percentage</label>
                  <div className="middleRoundedRect">
                    <span className="value">{userDetails?.TFP !== null ? `${userDetails?.TFP}%` : 'N/A'}</span>
                  </div>
                </div>
                <div className='divFieldsAD'>
                  <label className='label-align'>BMI</label>

                  <div className="middleRoundedRect">
                    <span className="valueAD">{userDetails?.BMI ?? "N/A"}</span>
                  </div>
                </div>
              </div>
            </div>


          </div>
          <div className="sub-containerRight">
            
            <div>
              <button className='Logoutbtn' onClick={logOutUser}>Logout</button>
            </div>
            <div className="NotificationPanel">
              <h1 className='accCmpltLabel'>Notifications</h1>
              <div className="displayNotify">
                {results.length === 0 ? (
                  <p>No notifications to display</p>
                ) : (
                  <ul>
                    {results.map((item, index) => (
                      <li key={index}>
                        <div >
                          {item.map((notification, notificationIndex) => (
                            <div className="NotifyRowContainer" key={notificationIndex}>
                              <div className='NotifyRowHeaderMain'>
                                <div className='NotifyRowHeader'>
                                  <div className='NotifyHeadLeft'>
                                    <h6 className='NotifyFontFirst'>For: {notification.Destination}</h6>
                                  </div>
                                  <div className='NotifyHeadRight'><h8 className='NotifyFontFirst'> Date: {notification.Date}</h8></div>



                                </div>
                                <div className='NotifyRowTitle'><h8 className='NotifyFontTitle'>{notification.Title}</h8></div>
                              </div>

                              <div className='NotifyRowContent'>
                                <h8 className = "NotifyFontContent">{notification.Description}</h8>
                              </div>


                            </div>
                          ))}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className='updBtnClass'>
            <a href='/MyAccount/update'>
              <button className='updBtn'>Update My details</button>
            </a>

              <DeleteAccountConfirm />
          </div>


          </div>
      </div>                       
      </div>

    </div>



  );
}

export default UserAccountDisplay