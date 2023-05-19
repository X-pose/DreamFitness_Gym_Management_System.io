//All the CRUDs related to user account will be handled by this class
//userAccountController function works as expected. completion -> 80%
const fs = require('fs');
const sendUser = require('../models/signUPModel');
const getUser = require('../models/myAccountDetailsModel');
const updUser = require('../models/updateDetailsModel');
const sessionHandler = require('../config/sessionHandler');
const loggingOut = require('../controllers/loginController');
const currentDate = new Date();

let userNametxt = sessionHandler.getSessionName();

const accCmpltGen = async(userNametxt) => {
 
    try {
      // Find the user document in MongoDB based on the username
      //CRUD -Read
      const user = await sendUser.findOne({ userName: userNametxt });

      // Get the count of fields that have null type values in the user document
      let nullFieldCount = 0;
      const userObject = user.toObject();
      for (const [key, value] of Object.entries(userObject)) {
        if (value === null || value ==='N/A') {
          nullFieldCount++;
        }
      }
  
      // Calculate the percentage value by comparing the null type count and all field count
      const totalFieldCount = Object.keys(userObject).length;
      const percentageComplete = Number(((1 - (nullFieldCount / totalFieldCount)) * 100).toFixed(1));
  
      return percentageComplete;

    } catch (error) {
      console.error(error);
      throw error;
    }
};



exports.getAccountDetails = async (req, res) =>  {
  
  //Validating login
  if(sessionHandler.getSessionName() !== null){


    try {

      if(sessionHandler.getSessionName() === 'AdminUser'){

        
      }else{
        console.log(currentDate.toISOString().slice(0, 10))
      //Getting session name from sessionHandler
      console.log('Session name from userAccountController.js : ' + sessionHandler.getSessionName())

        // Search for user in the database
        const User = await getUser.findOne({ userName: sessionHandler.getSessionName()});

        const accStat = await accCmpltGen(User.userName);
        
      //Use this model to output the user details as JSON
      const newUser = new sendUser({
        userID:User.userID,
        userName: User.userName,
        fName: User.fName,
        lName: User.lName,
        email: User.email,
        contactNo: User.contactNo,
        emergencyContact:User.emergencyContact,
        height : User.height,
        weight : User.weight,
        BMI : User.BMI,
        goal : User.goal,
        address : User.address,
        proPic : User.proPic,
        myFitnessPlan : User.myFitnessPlan,
        accountStatus : accStat,
        DOB:User.DOB,
        NIC:User.NIC,
        TFP:User.TFP,
        age:User.age,

      });

       console.log(newUser.userName,newUser.email,newUser.contactNo, newUser.userID, newUser.age);
         
      try {
           
            res.status(201).json(newUser);
      } catch (error) {
        res.status(400).json({error:error.message})
      }
      

      }
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error at userAccountController class' });
    }
   }else{
    console.log("User is not logged in yet. Validation failed!");
    res.status(401).json({ error: 'Not authorized to access account details. Please login to access your account details!' });
   }
  }
   

  //User detail Update process. CRUD - Update
exports.updateMyDetails = async(req,res) =>{

//Validating session
  if(sessionHandler.getSessionName() !== null){
    try {
      function calculateAge(birthday) {
        const today = new Date();
        const birthDate = new Date(birthday);
        let age = today.getFullYear() - birthDate.getFullYear();
        const month = today.getMonth() - birthDate.getMonth();
        if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        return age;
      }

      const birthday = req.body.DOB;
      const AgeCalc = calculateAge(birthday);
      const accStat = await accCmpltGen(sessionHandler.getSessionName());
       
      function calculateBMI(weight, height) {
        const BMICalc = weight / (height * height);
        const roundedBMI = BMICalc.toFixed(1);  // Round to one decimal place
        return roundedBMI;
      }
  
      const updateBody = {
        $set:req.body,
        BMI: calculateBMI(req.body.weight, req.body.height),
        age:AgeCalc,
        proPic:'http://localhost:4000/static/img/'+ sessionHandler.getSessionName() + '_proPic.png',
        accountStatus:accStat,
      }
    
      const updatedUser = await updUser.findOneAndUpdate(

        {userName :sessionHandler.getSessionName()},
        updateBody,
        {new:true}
      
      );

      console.log('Update function runs for ' + sessionHandler.getSessionName())

     res.status(200).json(updatedUser);
    } catch (error) {
     console.error(error);
     res.status(500).json({ message: 'Internal server error at update user' });
   }

  }else{
    console.log("User is not logged in yet. Updating terminated due to validation error!");
    res.status(401).json({ error: 'Not authorized to access account details. Please login to access your account details!' });
  }

}

exports.paymentHandler = async(req,res) =>{

  try {

    const formattedDate = currentDate.toISOString().slice(0, 10);
    const updateBody = {
      myFitnessPlan : req.body.myFitnessPlan,
      paymentMethod : req.body.paymentMethod,
      planStartedDate : formattedDate
    }

    const updatedpayment = await updUser.findOneAndUpdate(

      {userName :sessionHandler.getSessionName()},
      updateBody,
      {new:true}
    
    );
    res.status(200).json(updatedpayment);

  } catch (error) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error at payment handler' });
  }
}

exports.deleteMyAccount = async (req, res) => {
  try {
    await sendUser.findOneAndDelete({
      userName: sessionHandler.getSessionName(),
    });
    console.log('User deleted!');
    res.status(201).json({ message: 'User deleted!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error at delete user' });
  }
};


exports.updateFitPlan = async(req,res)=>{
  try {
    
    const updateBody = {
      myFitnessPlan : req.body.myFitnessPlan,
    }

    const updatedPlan = await updUser.findOneAndUpdate(

      {userName :sessionHandler.getSessionName()},
      updateBody,
      {new:true}
    
    );
    res.status(200).json(updatedPlan);
    console.log("Plan updated!")
  } catch (error) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error at delete user' });
  }
}

exports.searchAccount = async(req,res) =>{
  try {
      
      const query = req.query.q;
      const results = await getUser.find({ $text: { $search: query } });
      console.log('user data retrived from search ')
      res.status(201).json(results);

  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error at searchAccount method' })
  }
}