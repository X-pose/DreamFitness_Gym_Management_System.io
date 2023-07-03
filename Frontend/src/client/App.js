import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import AccountDisplayUpdate from './pages/userAccountDetail.jsx';
import UserAccountDisplay from './pages/userAccount.jsx';
import Header from './components/Header';
import Footer from './components/Footer';
import '../public/css/contentContainer.css'
import Homepage from './pages/Home.jsx';
import ChangePlan from './pages/ChangePlan.jsx';
import AdminMainPage from './pages/AdminMainPage.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import PleaseLogin from './components/pleaseLoginPopUp';
import AdminViewUserDetails from './pages/AdminViewUser.jsx';


import ExerciseDemoAdmin from "./pages/exerciseDemoAdmin.jsx";
import ExerciseDemoHome from "./pages/exerciseDemoHome.jsx";



import WorkoutSchedulerCustom from './pages/workoutschedulrCustom.jsx';
import Addworkout from './pages/workoutADD.jsx';
import WorkoutSchdulerAdmin from './pages/WorkSchedulerAdmin.jsx'

import ProgressTracker from './pages/ProgressTracker.jsx';
import ProgressForm from './pages/ProgressForm.jsx';
import Graph from './pages/ProgressGraph.jsx';
import Workoutlog from './pages/WorkoutLog.jsx';


import AdminInstructor from './pages/Admininstructorpanel.jsx';
import AddInstructor from './pages/AddInstructor.jsx';
import EditInstructor from './pages/EditInstructor.jsx';
import ViewOnlyInstructors from './pages/ViewOnlyInstructors.jsx';

import AdminDietPlan from './pages/AdminDietPlan.jsx';
import UserDietPlan from './pages/UserDietPlan.jsx'
import FAQADMIN from './pages/FAQADMIN.jsx';
import FAQcustom from './pages/FAQcustom.jsx';
import FAQinadmin from './pages/FAQinadmin.jsx';


import FeedbackForm from './components/FeedbackAdminPage';

import FeedbackFormz from './pages/FeedbackForm.jsx';
import FeedbackAdmin from './components/FeedbackAdminPage';
import UpdateFeedback from './components/updatefeedback'
import DownloadPDF from './components/userDetailsPDF';


function App() {
  return (
    <div className="App">
      <BrowserRouter>

        <Header />

        <div className='contentContainer'>


          <Routes>
            <Route
              path="/"
              element={<Homepage />}
            />

            <Route
              path="/MyAccount"
              element={<UserAccountDisplay />}
            />
            <Route
              path="/MyAccount/update"
              element={<AccountDisplayUpdate />}
            />
            <Route
              path="/Login"
              element={<Login />}
            />
            <Route
              path="/SignUp"
              element={<SignUp />}
            />
            <Route
              path="/ChangePlan"
              element={<ChangePlan />}
            />
            <Route
              path="/PleaseLogin"
              element={<PleaseLogin />}
            />
            <Route
              path='/AdminMainPage'
              element={<AdminMainPage />}
            />

            <Route
              path="/exerciseDemoAdmin"
              element={<ExerciseDemoAdmin />}
            />
            <Route
              path="/exerciseDemoHome"
              element={<ExerciseDemoHome />}
            />
            <Route
              path="/adminViewUser"
              element={<AdminViewUserDetails />}
            />
            {/* Mihisara's routes- Starts*/}
            <Route
              path='/WorkoutSchedulerAdmin'
              element={<WorkoutSchdulerAdmin />}
            />

            <Route
              path="/WorkoutSchedulerCustom"
              element={<WorkoutSchedulerCustom />}
            />

            <Route
              path="/Addworkout"
              element={<Addworkout />}
            />
            {/* Mihisara's routes- Ends*/}

            <Route
              path="/MyProgress"
              element={<ProgressTracker />}
            />

            <Route
              path="/ProgressForm"
              element={<ProgressForm />}
            />
            <Route
              path="/ProgressGraph"
              element={<Graph />}
            />
            <Route
              path="/WorkoutLog"
              element={<Workoutlog />}
            />
            <Route

              path="/adminInstructor"
              element={<AdminInstructor />}
            />

            <Route
              path="/AddInstructor"
              element={<AddInstructor />}
            />
            <Route
              path="/EditInstructor"
              element={<EditInstructor />}
            />
            <Route
              path="/ViewOnlyInstructors"
              element={<ViewOnlyInstructors />}
            />

            <Route
              path="/adminDietPlan"
              element={<AdminDietPlan />}
            />

            <Route
              path="/userDietPlan"
              element={<UserDietPlan />}
            />
            <Route
              path="/faqAdmin"
              element={<FAQADMIN />}
            />
            <Route
              path="/faqCustom"
              element={<FAQcustom />}
            />
            <Route
              path="/faqInAdmin"
              element={<FAQinadmin />}
            />


            <Route
              path='/AdminFeedback'
              element={<FeedbackAdmin />}
            />
            <Route
              path='/ViewFeedback'
              element={<FeedbackForm />}
            />
            <Route
              path='/addMyFeedbacks'
              element={<FeedbackFormz />}
            />
            <Route
              path='/myFeedbacks'
              element={<UpdateFeedback />}
            />
            <Route
              path='/downloadUserDetails'
              element={<DownloadPDF />}
            />

          </Routes>



        </div>
        <Footer />

      </BrowserRouter>
    </div>
  );
}

export default App;
