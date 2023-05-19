//This class defines the schema of the mongoDB collection and enforce data validations and rules
//related to displaying account details phase

const mongoose = require('mongoose');
const connectDB = require('../config/database')

const workoutScheduleSchema = new mongoose.Schema({  
  
    schdeleID: {type: String, required: false},  
    userID : {type: String, required: true}, 
    cardio : {type: Number, required: false},
    workoutsArray : [{ type: String, required: false }],
    workOutRepArray : [{ type: Number, required: false }],
    workOutSetArray : [{ type: Number, required: false }]
 
},{ collection: 'WorkoutSchedules' });

connectDB.getInstance_C();

const workoutSchedule = mongoose.model('workoutSchedule', workoutScheduleSchema, 'WorkoutSchedules')
 
module.exports = workoutSchedule;




 
