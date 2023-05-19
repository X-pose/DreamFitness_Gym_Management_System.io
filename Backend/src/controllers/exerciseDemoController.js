const Workout = require('../models/exerciseDemoModel');
const mongoose = require('mongoose');

// Get all workouts
const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({}).sort({ createdAt: -1 });
    res.status(200).json(workouts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid workout ID' });
  }

  try {
    const workout = await Workout.findById(id);

    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }

    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Create a new workout
const createWorkout = async (req, res) => {
  const workoutName = req.body.workoutName 
  const workoutDesc = req.body.workoutDesc
  const muscle = req.body.muscle
  const goalDesc = req.body.goalDesc
  const primaryGoal = req.body.primaryGoal
  const workoutGif = 'http://localhost:4000/static/img/'+ req.body.workoutName + '_exDemo.gif'

  try {
    const workout = await Workout.create({ 
      workoutName, 
      workoutDesc, 
      muscle, 
      goalDesc, 
      primaryGoal, 
      workoutGif 
    });
    res.status(201).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid workout ID' });
  }

  try {
    const workout = await Workout.findOneAndDelete({ _id: id });

    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }

    res.status(200).json({ message: 'Workout deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid workout ID' });
  }

  try {
    const updateWorkOutBody = {
      $set:req.body,
      workoutGif:'http://localhost:4000/static/img/'+ req.body.workoutName + '_exDemo.gif',
    } 
    const workout = await Workout.findByIdAndUpdate(id, updateWorkOutBody, { new: true });

    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }

    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Export functions
module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
};