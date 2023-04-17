//All the request from userManagement system will be handled by here

const express = require('express')
const router = express.Router()
const signUpController = require('../controllers/signUpController');
const loginController = require('../controllers/loginController');
 
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




//Exports Router
module.exports = router;
