//All the request from workout schduler system will be handled by here

const express = require('express')
const router = express.Router()
const workoutScheduler = require('../controllers/workoutController');


//Upon page landing 
router.get('/api/myWorkoutSchedule', (req,res) =>{
    workoutScheduler.createSchdule(req,res);
})

//Upon requesting update schedule
router.post('/api/updateWorkoutSchedule',(req,res) => {
    workoutScheduler.updateSchedule(req,res);
})

//upon requesting delete schedule
router.delete('/api/deleteSchedule',(res) => {
    workoutScheduler.deleteSchedule(res);
})

//Search user profiles
router.get('/api/searchWorkoutSchdulerUsers', (req,res)=>{
    workoutScheduler.searchAccount(req,res);
  })


//Exports Router
module.exports = router;
