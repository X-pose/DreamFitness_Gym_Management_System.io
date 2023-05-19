//This class defines the schema of the mongoDB collection and enforce data validations and rules
//related to displaying account details phase

const mongoose = require('mongoose');
const connectDB = require('../config/database')

const getUserDetailSchema = new mongoose.Schema({  

  userID : {type: String, required: true},  
  userName: { type: String, required: true},
  fName: { type: String, required: true },
  lName: { type: String, required: true },
  email: { type: String, required: true },
  contactNo: { type: String, required: true },
  height : { type: Number, required: false },
  weight : { type: Number, required: false },
  BMI : { type: Number, required: false },
  goal : { type: String, required: false },
  address : { type: String, required: false },
  proPic : { type: String, required: false },
  myFitnessPlan :  { type: String, required: false },
  paymentMethod :  { type: String, required: false },
  paymentStatus : { type: String, required: false },
  planStartedDate : { type: Date, required: false },
  accountStatus : { type: Number, required: false },
  mySchedule : { type: String, required: false },
  myDiet : { type: String, required: false },
  myProgress : { type: String, required: false }


},{ collection: 'UserDetails' });

connectDB.getInstance_C();

const getUserDetails = mongoose.model('getUserDetails', getUserDetailSchema, 'UserDetails');

module.exports = getUserDetails;