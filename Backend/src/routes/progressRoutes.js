//All the request from userManagement system will be handled by here



const express = require('express');
const router = express.Router();
const progressController =  require('../controllers/progressController')

//Get progress record to display
router.get('/', (req,res) =>{
    progressController.getProgressdetails(req,res)

})


//Create progress Record
router.post('/',(req,res)=>{

    progressController.createProgressrecord(req,res)
})

//update progress Detail
router.put('/:id', (req,res)=>{

    progressController.updateProgressRecord(req,res)
})

//delete progress record
router.delete('/:id',(req,res)=>{

    progressController.deleteProgressRecord(req,res)

})

//Exports Router
module.exports = router;
