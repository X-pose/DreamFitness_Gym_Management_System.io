//All the request from userManagement system will be handled by here

const express = require('express');
const router = express.Router();
const multer  = require('multer');
const session = require('../config/sessionHandler');
const signUpController = require('../controllers/signUpController');
const loginController = require('../controllers/loginController');
const userAccountController = require('../controllers/userAccountController');




const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../public/img')
  },

  filename: function (req, file, cb) {
    const imgName =  session.getSessionName() + '_proPic.png';
    console.log('Multer running okay')
    cb(null,  imgName)
  }
  
})

const upload = multer({ storage: storage });
 
//sign up route
router.post('/api/signupformdata', (req, res) => {
    signUpController.signUpUser(req,res);
  });


//Login route
router.post('/api/loginformdata', (req,res)=>{
  loginController.login(req,res);
})

//Get account details to display in account UI route
router.get('/api/accountdetails', (req,res) =>{
  userAccountController.getAccountDetails(req,res);
})

//Profile Picture Route
router.get('/api/proPic',(res) =>{
  userAccountController.getProPic(res);
})

//logout route
router.post('/api/logout', (req,res) =>{
  loginController.logOut(req,res);
})

//Update user details route
router.put('/api/updateMyDetails', upload.single('proPic'), (req,res) =>{
  userAccountController.updateMyDetails(req,res);
})

//Delete account route
router.delete('/api/deleteAccount',(req,res) =>{
  userAccountController.deleteMyAccount(req,res);
});

//Search user profiles route
router.get('/api/searchUsers', (req,res)=>{
  userAccountController.searchAccount(req,res);
})

//Payment handling route
router.put('/api/updateMypaymentDetails', (req,res)=>{
  userAccountController.paymentHandler(req,res);
})

router.put('/api/myfitnessPlan',(req,res)=>{
    userAccountController.updateFitPlan(req,res);
})

//Exports Router
module.exports = router;
