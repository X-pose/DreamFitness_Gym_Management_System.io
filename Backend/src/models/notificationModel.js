//This class defines the schema of the mongoDB collection and enforce data validations and rules 
//related to login phase

const mongoose = require('mongoose');
const connectDB = require('../config/database')

const NotificationsSchema = new mongoose.Schema({
    Destination:{type:String, required:false}, 
  Title: { type: String, required: true},
  Description: { type: String, required: true },
  Date:{ type: String, required: true },
  
  
},{ collection: 'Notifications' });

connectDB.getInstance_C();

const NotificationsModel = mongoose.model('NotificationsModel', NotificationsSchema, 'Notifications')
 
module.exports = NotificationsModel;