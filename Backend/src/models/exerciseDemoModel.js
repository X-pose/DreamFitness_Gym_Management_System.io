const mongoose = require ('mongoose');
const connectDB = require('../config/database')
const Schema = mongoose.Schema;

const workoutSchema = new Schema ({
  workoutName: {
    type: String,
    required: true
  },
  workoutDesc: {
    type: String,
    required: true
  },
  workoutGif: {
    type: String,
    required: true
  },
  muscle: {
    type: String,
    required: true
  },
  primaryGoal: {
    type: String,
    required: true
  },
  goalDesc: {
    type: String,
    required: true
  }
}, { collection: 'Workouts' });

connectDB.getInstance_C();

const Workout = mongoose.model('Workout', workoutSchema, 'Workouts');
module.exports = Workout;