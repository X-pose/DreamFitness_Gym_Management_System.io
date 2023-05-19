//This class defines the schema of the mongoDB collection and enforce data validations and rules
//related to sign-up phase

const mongoose = require('mongoose');
const connectDB = require('../config/database')

const signUpSchema = new mongoose.Schema({
  userID : {type: String, required: true},  
  userName: { type: String, required: true},
  fName: { type: String, required: false },
  lName: { type: String, required: false },
  DOB : { type: Date, required: false },
  gender : { type: String, required: false },
  NIC :{ type: String, required: false },
  age : { type: Number, required: false },
  height : { type: Number, required: false },
  weight : { type: Number, required: false },
  TFP : { type: Number, required: false },
  BMI : { type: Number, required: false },
  goal : { type: String, required: false },
  email: { type: String, required: false },
  contactNo: { type: String, required: false },
  emergencyContact : { type: String, required: false },
  address : { type: String, required: false },
  psw: { type: String, required: false },
  proPic : { type: String, required: false },
  myFitnessPlan :  { type: String, required: false },
  paymentMethod : { type: String, required: false },
  paymentStatus : { type: String, required: false },
  planStartedDate : { type: String, required: false },
  accountStatus : { type: String, required: false },
  mySchedule : { type: String, required: false },
  myDiet : { type: String, required: false },
  myProgress : { type: String, required: false },
  PARQ_agreeArray : { type: {Boolean}, required: false }, //Boolean array here
  accountCreatedDate:{ type: String, required: false },

},{ collection: 'UserDetails' });

connectDB.getInstance_C();

const SignUpModel = mongoose.model('SignUpModel', signUpSchema, 'UserDetails')

module.exports = SignUpModel;
