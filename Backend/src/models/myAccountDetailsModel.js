//This class defines the schema of the mongoDB collection and enforce data validations and rules
//related to displaying account details phase

const mongoose = require('mongoose');
const connectDB = require('../config/database')

const getUserSchema = new mongoose.Schema({  

  userID : {type: String, required: true},  
  userName: { type: String, required: true},
  fName: { type: String, required: true },
  lName: { type: String, required: true },
  email: { type: String, required: true },
  contactNo: { type: String, required: true },
  height : { type: Number, required: false },
  weight : { type: Number, required: false },
  age : { type: Number, required: false },
  BMI : { type: Number, required: false },
  goal : { type: String, required: false },
  address : { type: String, required: false },
  proPic : { type: String, required: false },
  myFitnessPlan :  { type: String, required: false },
  accountStatus : { type: String, required: false },
  emergencyContact: { type: String, required: false },
  DOB: { type: String, required: false },
  NIC: { type: String, required: false },
  TFP: { type: Number, required: false },

},{ collection: 'UserDetails' });

connectDB.getInstance_C();

const getUser = mongoose.model('getUser', getUserSchema, 'UserDetails')

module.exports = getUser;