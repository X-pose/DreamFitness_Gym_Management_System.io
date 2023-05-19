//This class defines the schema of the mongoDB collection and enforce data validations and rules
//related to account details update phase

const mongoose = require('mongoose');
const connectDB = require('../config/database')

const updateSchema = new mongoose.Schema({

  fName: { type: String, required: true },
  lName: { type: String, required: true },
  address : { type: String, required: false },
  contactNo: { type: String, required: false },
  emergencyContact : { type: String, required: false },
  DOB : { type: Date, required: false },
  gender : { type: String, required: false },
  NIC :{ type: String, required: false },
  email: { type: String, required: false },
  height : { type: Number, required: false },
  weight : { type: Number, required: false },
  TFP : { type: Number, required: false },
  BMI : { type: Number, required: false },
  PARQ_agreeArray : { type: {Boolean}, required: false }, //Boolean array here
  goal : { type: String, required: false },
  proPic : { type: String, required: false },
  age:{type:Number, required:false},
  accountStatus:{type:Number, required:false}
  
},{ collection: 'UserDetails' });

connectDB.getInstance_C();

const updateModel = mongoose.model('updateModel', updateSchema, 'UserDetails')
 
module.exports = updateModel;