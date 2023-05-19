import { useState, useEffect } from 'react';
import '../../public/css/adminMainCss.css'
import LookUpUsers from '../components/searchUsers'
import ManageNotifyAdd from '../components/manageNotificationAdd';
import Cookies from 'js-cookie'


function AdminMainPage() {

    const [results, setResults] = useState('')
    const [notify, setNotify] = useState('')

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
        <div>

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
                                                                <h6>For: {NoifyItem.Destination}</h6>
                                                            </div>
                                                            <div className='NotifyHeadRight'><h8 className = 'fontsStyleRight'> Date: {NoifyItem.Date}</h8></div>


                                                            
                                                        </div>
                                                        <div className='NotifyRowTitle'><h8>{NoifyItem.Title}</h8></div>
                                                        </div>
                                                       
                                                        <div className='NotifyRowContent'>
                                                            <h8>{NoifyItem.Description}</h8>
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
                    <div className="RightButtonStack">
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
                </div>
            </div>



        </div>
    )
}
export default AdminMainPage;