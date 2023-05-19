import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import AccountDisplayUpdate from './pages/userAccountDetail';
import UserAccountDisplay from './pages/userAccount';
import Header from './components/Header';
import Footer from './components/Footer';
import '../public/css/contentContainer.css'
import Homepage from './pages/Home';
import ChangPlan from './pages/changePlan';
import AdminMainPage from './pages/AdminMainPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import PleaseLogin from './components/pleaseLoginPopUp';
import AdminViewUserDetails from './pages/AdminViewUser';


import ExerciseDemoAdmin from "./pages/exerciseDemoAdmin";
import ExerciseDemoHome from "./pages/exerciseDemoHome";



import WorkoutSchedulerCustom from './pages/workoutschedulrCustom';
import Addworkout from './pages/workoutADD';
import WorkoutSchdulerAdmin from './pages/WorkSchedulerAdmin'

import ProgressTracker from './pages/ProgressTracker';
import ProgressForm from './pages/ProgressForm';
import Graph from './pages/ProgressGraph';
import Workoutlog from './pages/WorkoutLog';


import AdminInstructor from './pages/Admininstructorpanel';
import AddInstructor from './pages/AddInstructor';
import EditInstructor from './pages/EditInstructor';
import ViewOnlyInstructors from './pages/ViewOnlyInstructors';

import AdminDietPlan from './pages/AdminDietPlan';
import UserDietPlan from './pages/UserDietPlan'
import FAQADMIN from './pages/FAQADMIN';
import FAQcustom from './pages/FAQcustom';
import FAQinadmin from './pages/FAQinadmin';

import FeedbackForm from './components/FeedbackAdminPage';
import FeedbackView from './components/FeedbackView';
import FeedbackFormz from './pages/FeedbackForm';
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
              element={<ChangPlan />}
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
              path = "/ProgressForm"
              element = {<ProgressForm/>}
            />
            <Route
              path = "/ProgressGraph"
              element = {<Graph/>}
            />
            <Route
              path = "/WorkoutLog"
              element = {<Workoutlog/>}
            />
            <Route
            
            path = "/adminInstructor"
            element ={<AdminInstructor/>}
          />
        
          <Route
            path = "/AddInstructor"
            element ={<AddInstructor/>}
          />
           <Route
            path = "/EditInstructor"
            element ={<EditInstructor/>}
          />
           <Route
            path = "/ViewOnlyInstructors"
            element ={<ViewOnlyInstructors/>}
          />

          <Route 
            path = "/adminDietPlan"
            element = {<AdminDietPlan/>}
              />

          <Route 
            path = "/userDietPlan"
            element = {<UserDietPlan/>}
              />
          <Route
            path = "/faqAdmin"
            element = {<FAQADMIN/>}
          />
          <Route
            path = "/faqCustom"
            element = {<FAQcustom/>}
          />
          <Route
            path = "/faqInAdmin"
            element = {<FAQinadmin/>}
          />
        
         
          <Route
            path='/AdminFeedback'
            element ={<FeedbackAdmin/>}
          />
          <Route
            path='/ViewFeedback'
            element = {<FeedbackForm/>}
          />
          <Route
            path = '/addMyFeedbacks'
            element = {<FeedbackFormz/>}
          />
          <Route
            path = '/myFeedbacks'
            element = {<UpdateFeedback/>}
          />
          <Route
            path = '/downloadUserDetails'
            element = {<DownloadPDF/>}
          />

          </Routes>



        </div>
        <Footer />

      </BrowserRouter>
    </div>
  );
}

export default App;
