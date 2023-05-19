const express = require('express');
const multer  = require('multer');
// importing workoutController functions
const { 
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
} = require('../controllers/exerciseDemoController');

const router = express.Router();

const Workout = require('../models/exerciseDemoModel');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../public/img')
  },

  filename: function (req, file, cb) {
    const imgName =  req.body.workoutName + '_exDemo.gif';
    console.log('Multer running okay')
    cb(null,  imgName)
  }
  
})

const upload = multer({ storage: storage });

// get all workouts
router.get('/', getWorkouts);

// get a single workout
router.get('/:id', getWorkout);

// create a new workout
router.post('/', upload.single('workoutGif'),createWorkout);

// delete a workout
router.delete('/:id', deleteWorkout);

// update a workout
router.patch('/:id',upload.single('workoutGif'), updateWorkout);

module.exports = router;