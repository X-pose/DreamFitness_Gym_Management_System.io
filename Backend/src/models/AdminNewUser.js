
const mongoose = require('mongoose');
const connectDB = require('../config/database')

const AdminAddNewSchema = new mongoose.Schema({
    role:{type:String, required:false}, 
  userName: { type: String, required: true},
  psw: { type: String, required: true },
  proPic:{type:String,required:false}
  
},{ collection: 'AdminDetails' });

connectDB.getInstance_C();

const AdminAddNewModel = mongoose.model('AdminAddNewModel', AdminAddNewSchema, 'AdminDetails')
 
module.exports = AdminAddNewModel;