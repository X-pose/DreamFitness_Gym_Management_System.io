//All the CRUDs related to sign up will be handled by this class
//SignUp basic functionalities are done. validations are not yet completed - completion -> 80%
//ToDo -> 1. Validations - check whether userName is alredy in the database - 4/16/2023

const bcrypt = require('bcrypt');
const User = require('../models/signUPModel');
const connectDB = require('../config/database');
const currentDate = new Date();
const notifyNewUser = require('../controllers/NotificationsController')
const saltCount = 10;
let UserIDNo = null;



const hashPassswordGen = async(plainPsw) => {
    const hashPsw = await bcrypt.hash(plainPsw, saltCount);
    return hashPsw;

};

//Getting the number of documents in userDetails collection for userID generation process
async function getDocumentCount() {
  const connection = await connectDB.getInstance_C();
  const collection = connection.connection.collection('UserDetails');
  const count = await collection.countDocuments();
  console.log(`Number of documents in the collection: ${count}`);
  return count;
}

//Getting literal count value
getDocumentCount().then((count) => {
  UserIDNo = count;
  UserIDNo += 1; // Adding 1 to get the new ID value
});

exports.signUpUser = async (req, res) =>  {
    try {
      const hashedPassword = await hashPassswordGen(req.body.psw);
      const newUser = new User({
        userID:UserIDNo,
        userName: req.body.userName,
        fName: req.body.fName,
        lName: req.body.lName,
        email: req.body.email,
        contactNo: req.body.contactNo,
        psw: hashedPassword,

        DOB : null,
        gender : 'N/A',
        NIC :'N/A',
        age : null,
        height : null,
        weight : null,
        TFP : null,
        BMI : null,
        goal : "Strength",
        emergencyContact : 'N/A',
        address : 'N/A',
        proPic : 'http://localhost:4000/static/img/defaultProPic.png',
        myFitnessPlan :  'Basic',
        paymentMethod : 'N/A',
        paymentStatus : 'N/A',
        planStartedDate : "N/A",
        accountStatus : 25,
        mySchedule : 'N/A',
        myDiet : 'N/A',
        myProgress : 'N/A',
        accountCreatedDate:currentDate.toISOString().slice(0, 10),
        
      });

       //Testting begins
       console.log(newUser.userName,newUser.email,newUser.contactNo, newUser.accountCreatedDate)
       //Testing ends. 
      try {
        const savedUser = await newUser.save()
            notifyNewUser.newUserAdded(savedUser);
            res.status(201).json(savedUser);
        
      } catch (error) {
        res.status(400).json({error:error.message})
        console.log("Error in signup")
      }
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error at signUPController class' });
    }
  }



