//All the CRUDs related to sign up will be handled by this class
//SignUp basic functionalities are done. validations are not yet completed - completion -> 80%
//ToDo -> 1. Validations - check whether userName is alredy in the database - 4/16/2023

const bcrypt = require('bcrypt');
const User = require('../models/signUPModel');
const connectDB = require('../config/database')
//const router = require('../routes/userManagementRoutes')
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
        
      });

       //Testting begins
       console.log(newUser.userName,newUser.email,newUser.contactNo, newUser.psw)
       //Testing ends. Test result - req.body values are undefined!!
      try {
        const savedUser = await newUser.save()
            res.status(201).json(savedUser);
      } catch (error) {
        res.status(400).json({error:error.message})
      }
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error at signUPController class' });
    }
  }



