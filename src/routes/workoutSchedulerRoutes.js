//All the request from workout schduler system will be handled by here

const express = require('express')
const router = express.Router()
const workoutScheduler = require('../controllers/workoutSchedulerController');


//Upon page landing 
router.get('/api/myWorkoutSchedule', (req,res) =>{
    workoutScheduler.createSchdule(req,res);
})

//Upon requesting update schedule
router.post('/api/updateWorkoutSchedule',(req,res) => {
    workoutScheduler.updateSchedule(req,res);
})

//Upon requesting delete schedule
router.delete('/api/deleteMyschedule',(res)=>{
    workoutScheduler.deleteSchedule(res);
})


//Exports Router
module.exports = router;
