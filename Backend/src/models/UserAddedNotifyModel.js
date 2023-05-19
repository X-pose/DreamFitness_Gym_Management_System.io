//This class defines the schema of the mongoDB collection and enforce data validations and rules
//related to user Added notification

const mongoose = require('mongoose');
const connectDB = require('../config/database')

const userAddedSchema = new mongoose.Schema({
  proPic: {type: String, required: true},
  userID : {type: String, required: true},  
  userName: { type: String, required: true},
    addedDate : { type: String, required: true},
  

},{ collection: 'UserAddedNotify' });

connectDB.getInstance_C();

const userAddedModel = mongoose.model('userAddedModel', userAddedSchema, 'UserAddedNotify')

module.exports = userAddedModel;
