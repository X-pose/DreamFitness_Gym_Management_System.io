//This class defines the schema of the mongoDB collection and enforce data validations and rules 
//related to login phase

const mongoose = require('mongoose');
const connectDB = require('../config/database')

const AdminloginSchema = new mongoose.Schema({
    role:{type:String, required:false}, 
  userName: { type: String, required: true},
  psw: { type: String, required: true },
  proPic:{type:String,required:false}
  
},{ collection: 'AdminDetails' });

connectDB.getInstance_C();

const AdminloginModel = mongoose.model('AdminloginModel', AdminloginSchema, 'AdminDetails')
 
module.exports = AdminloginModel;