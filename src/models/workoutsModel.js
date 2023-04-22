//This class defines the schema of the mongoDB collection and enforce data validations and rules
//related to displaying account details phase

const mongoose = require('mongoose');
const connectDB = require('../config/database')



const workoutSchema = new mongoose.Schema({  
  
    workoutID : {type: String, required: false},
    wName : {type: String, required: false},
    wDescription : {type: String, required: false},
    wGifSource : {type: String, required: false},
    Muscle : {type: String, required: false}, 
    PrimaryGoal : {type: String, required: false},
    GoalDescription : {type: String, required: false}
  
},{ collection: 'Workouts' });

connectDB.getInstance_C();

 
const workout = mongoose.model('workout', workoutSchema, 'Workouts')
 
console.log('workout model executed ok!')
module.exports = workout;