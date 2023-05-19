//This class defines the schema of the mongoDB collection and enforce data validations and rules 
//related to login phase

const mongoose = require('mongoose');
const connectDB = require('../config/database')

const loginSchema = new mongoose.Schema({
   
  userName: { type: String, required: true},
  psw: { type: String, required: true },
  proPic:{type:String,required:false}
  
},{ collection: 'UserDetails' });

connectDB.getInstance_C();

const loginModel = mongoose.model('loginModel', loginSchema, 'UserDetails')
 
module.exports = loginModel;