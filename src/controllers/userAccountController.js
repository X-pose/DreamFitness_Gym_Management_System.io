//All the CRUDs related to user account will be handled by this class
//userAccountController function works as expected. completion -> 80%

const sendUser = require('../models/signUPModel');
const getUser = require('../models/myAccountDetailsModel');
const {sessionDetails} = require('../controllers/loginController');


const accCmpltGen = async(userNametxt) => {
 
    try {
      // Find the user document in MongoDB based on the username
      //CRUD -Read
      const user = await sendUser.findOne({ userName: userNametxt });

      // Get the count of fields that have null type values in the user document
      let nullFieldCount = 0;
      const userObject = user.toObject();
      for (const [key, value] of Object.entries(userObject)) {
        if (value === null) {
          nullFieldCount++;
        }
      }
  
      // Calculate the percentage value by comparing the null type count and all field count
      const totalFieldCount = Object.keys(userObject).length;
      const percentageComplete = (nullFieldCount / totalFieldCount) * 100;
  
      return percentageComplete;
    } catch (error) {
      console.error(error);
      throw error;
    }
};

//Gets proPic if available, assign a default one if not found a one
const getProPic = async(userNametxt) => {
  try {
    //CRUD - Read
    const user = await sendUser.findOne({ userName: userNametxt });
    let path = user.proPic;

    if(path === null){
      path = "./public/img/defaultProPic.png";
    }

    return path;

  } catch (err) {
    console.error(err);
      throw err
  }
}



exports.getAccountDetails = async (req, res) =>  {
    try {
      //Getting session name from login
      const sessionUserName = await sessionDetails();
      console.log('Session name from userAccountController.js : ' + sessionUserName)
      
      //Use this model to find and store user details
      const getUserName = new getUser({
        userID:null,
        userName: sessionUserName,
        fName: null,
        lName: null,
        email: null,
        contactNo:null,
        height : null,
        weight : null,
        BMI : null,
        goal : null,
        address : null,
        proPic : null,
        myFitnessPlan : null,
        accountStatus : null,
        
      })

    

        // Search for user in the database
        const User = await getUser.findOne({ userName: getUserName.userName});

        const accStat = await accCmpltGen(User.userName);
        const proPicPath = await getProPic(User.userName);
      //Use this model to output the user details as JSON
      const newUser = new sendUser({
        userID:User.userID,
        userName: User.userName,
        fName: User.fName,
        lName: User.lName,
        email: User.email,
        contactNo: User.contactNo,
        height : User.height,
        weight : User.weight,
        BMI : User.BMI,
        goal : User.goal,
        address : User.address,
        proPic : proPicPath,
        myFitnessPlan : User.myFitnessPlan,
        accountStatus : accStat,
      });

       console.log(newUser.userName,newUser.email,newUser.contactNo, newUser.userID);
         
      try {
            res.status(201).json(newUser);
      } catch (error) {
        res.status(400).json({error:error.message})
      }
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error at userAccountController class' });
    }
  }

