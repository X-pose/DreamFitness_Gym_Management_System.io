//All the request from userManagement system will be handled by here

const express = require('express')
const router = express.Router()
const signUpController = require('../controllers/signUpController');
const loginController = require('../controllers/loginController');
const userAccountController = require('../controllers/userAccountController');
 
//sign up route
router.post('/api/signupformdata', (req, res) => {
    console.log('Router/Post runs -> starting signUpControll')
    
    signUpController.signUpUser(req,res);
    console.log('signUpControll executed succesfully!')
  });


//Login route
router.post('/api/loginformdata', (req,res)=>{
  loginController.login(req,res);
})

//Display account details route
router.get('/api/accountdetails', (req,res) =>{
  userAccountController.getAccountDetails(req,res);
})

router.post('/api/logout', (req,res) =>{
  loginController.logOut(req,res);
})




//Exports Router
module.exports = router;
