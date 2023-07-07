import { useState, useEffect } from 'react';
import '../../public/css/adminMainCss.css'
import LookUpUsers from '../components/searchUsers'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { validations } from '../../public/js/Validation'
import ManageNotifyAdd from '../components/manageNotificationAdd';
import Cookies from 'js-cookie'


function AdminMainPage() {

    const [results, setResults] = useState('')
    const [notify, setNotify] = useState('')
    const [adminUserName, setAdminName] = useState('')
    const [adminrole, setRole] = useState('')
    const [adminPsw, setAdPsw] = useState('')
    const [adminRePsw, setAdRePsw] = useState('')

    useEffect(() => {

        async function searchUsers() {

            try {
                const response = await fetch(`/api/getAddedUsers`);
                const data = await response.json();
                setResults(data);
                if (response.ok) {
                    console.log("USer data retrived!")
                } else {
                    console.log("USer data retrive failed")
                }
            } catch (error) {
                console.error(error);
            }
        }

        //self calling searchUsers function to get notifys
        searchUsers();
        searcAdminhNotify();

    }, [])


    const handleAdminUserNameChange = (e) => {
        setAdminName(e.target.value);
    };

    const handleAdminRoleChange = (e) => {
        setRole(e.target.value);
    };

    const handleAdminPswChange = (e) => {
        setAdPsw(e.target.value);
    };
    const handleAdminRePswChange = (e) => {
        setAdRePsw(e.target.value);
    };

    async function searcAdminhNotify() {

        try {
            const response = await fetch('/api/adminNotify', {
                method: 'GET'
            });
            const data = await response.json();
            setNotify(data);
            if (response.ok) {
                console.log("Notify data retrived! : " + data)
            } else {
                console.log("Notify data retrive failed")
            }
        } catch (error) {
            console.error(error);
        }
    }



    const addAdmin = async (e) => {
        e.preventDefault();

        //Creating an instance from validation class
        const addAdminValidations = new validations();

        //Passing parameters to validate
        const warnMsg = addAdminValidations.AddAdminValidator(adminUserName, adminPsw, adminRePsw);

        if (warnMsg !== null) {
            toast.warning(warnMsg, {
                position: toast.POSITION.TOP_RIGHT,
          theme: 'dark'
            });
        } else {

            const newAdmin = { adminUserName, adminrole, adminPsw }
            const response = await fetch('/api/addNewAdmin', {
                method: 'POST',
                body: JSON.stringify(newAdmin),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const json = await response.json()
            if (!response.ok) {

                toast.error('Something went wrong. Please try again', {
                    position: toast.POSITION.TOP_RIGHT,
          theme: 'dark'
                });
                console.log(json)

            }
            if (response.ok) {


                console.log('New AdminUser added', json);

                toast.success(json.userName + ' Added to the system', {
                    position: toast.POSITION.TOP_RIGHT,
                    theme: 'dark'
                });
            }

        }





    }

    async function logOutUser() {
        const resp = await fetch('/api/logout', {
            method: 'POST',

        })


        if (resp.ok) {
            Cookies.remove('sessionName')
            window.location.href = '/'
        }
    }


    return (
        <div><ToastContainer autoClose = {3000}/>

            <h1 className='MainHeaderTxt'><b><u>Admin Panel</u></b></h1>
            <div className="MainbackgroundWhite">
                <div className='panelContainer'>
                    <div className='leftContainer'>
                        <div className="NameCompartment">
                            <div className='nameCompLeft'>
                                <h5 className='NameAlign'>Name : {Cookies.get('sessionName')}</h5>
                                <h5 className='roleAlign'>Role : {Cookies.get('sessionRole')}</h5>
                            </div>
                            <div className='nameCompRight'>
                                <button className="logOutBtnAdmin" onClick={logOutUser}>LogOut</button>
                            </div>


                        </div>
                        <div className="leftBottomComp">
                            <div className="NotifyHeader">
                                <h2 >Notification Panel</h2>
                            </div>
                            <div className="displayNotifyContainer">
                                {notify.length === 0 ? (
                                    <p>No notifications to display</p>
                                ) : (
                                    <ul>
                                        {notify.map((NoifyItem, index) => (
                                            <li key={index}>
                                                <div >

                                                    <div className="NotifyRowContainer">
                                                        <div className='NotifyRowHeaderMain'>
                                                            <div className='NotifyRowHeader'>
                                                                <div className='NotifyHeadLeft'>
                                                                    <h6 className='NotifyFontFirst'>For: {NoifyItem.Destination}</h6>
                                                                </div>
                                                                <div className='NotifyHeadRight'><h8 className='NotifyFontFirst'> Date: {NoifyItem.Date}</h8></div>



                                                            </div>
                                                            <div className='NotifyRowTitle'><h8 className='NotifyFontTitle'>{NoifyItem.Title}</h8></div>
                                                        </div>

                                                        <div className='NotifyRowContent'>
                                                            <h8 className="NotifyFontContent">{NoifyItem.Description}</h8>
                                                        </div>


                                                    </div>

                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                        </div>
                    </div>
                    <div className="MiddleComp">
                        <div className="middleHeader">
                            <h2 className='NotifyHeaderTxt'>New User SignUps</h2>
                        </div>
                        <div className='userActivityContainer'>
                            {results.length > 0 ? (

                                <ul>

                                    {results.map(result => (

                                        <li key={result._id}>

                                            <div className='userRowContainer'>
                                                <div className='userRowDP'>
                                                    <img className='userRowDP' src={result.proPic}></img>
                                                </div>
                                                <div className='userRowDetails'>
                                                    <h6 className='detailsTxt'>User ID : {result.userID}</h6>
                                                    <h6 className='detailsTxt'>User Name : {result.userName}</h6>
                                                    <h6 className='detailsTxt'>User Added Date : {result.addedDate}</h6>

                                                </div>
                                            </div>

                                        </li>


                                    ))}
                                </ul>
                            ) : (
                                <p>No results found</p>
                            )}

                        </div>
                    </div>
                    <div className="RightContainer">
                        <div className='btnStackRight'>
                            <a href="/adminInstructor" style={{ color: 'white', textDecoration: 'none' }}>
                                <button className="btnStack">Manage instructor library</button>
                            </a>

                            <LookUpUsers />

                            <a href="/adminDietPlan" style={{ color: 'white', textDecoration: 'none' }}>
                                <button className="btnStack">Manage diet plans</button>
                            </a>
                            <a href="/faqAdmin" style={{ color: 'white', textDecoration: 'none' }}>
                                <button className="btnStack">Manage FAQs</button>
                            </a>
                            <a href="/exerciseDemoAdmin" style={{ color: 'white', textDecoration: 'none' }}>
                                <button className="btnStack">Manage exercise library</button>
                            </a>
                            <ManageNotifyAdd />

                            <a href="/AdminFeedback" style={{ color: 'white', textDecoration: 'none' }}>
                                <button className="btnStack">Manage FeedBacks</button>
                            </a>
                        </div>
                        <div className='addAdmin'>
                            <h3>Add an Admin</h3><br />
                            <form onSubmit={addAdmin}>
                                <label forHtml="User name : " />
                                <input type='text' placeholder='Enter user name' onChange={handleAdminUserNameChange}></input>

                                <label forHtml='Assign role' />
                                <select onChange={handleAdminRoleChange}>
                                    <option value='SiteAdmin'> Site Admin</option>
                                    <option value='Instructor'> Instructor</option>
                                    <option value='GymManager'> Gym Manager</option>
                                </select>
                                <input type="password" name="Psw" required placeholder='Password' onChange={handleAdminPswChange} />
                                <input type="password" name="rePsw" required placeholder='Retype password' onChange={handleAdminRePswChange} />
                                <button type='submit'>Add</button>
                            </form>
                        </div>


                    </div>
                </div>
            </div>



        </div>
    )
}
export default AdminMainPage;