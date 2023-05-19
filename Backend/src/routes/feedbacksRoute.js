const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController')

router.get('/', (req,res) =>{
    feedbackController.getFeedbackdetails(req,res)

})



//Create feedback 
router.post('/',(req,res)=>{

    feedbackController.createFeedbackrecord(req,res)
})

//update feedback 
router.put('/:id', (req,res)=>{
    console.log('pasing alpha')
    feedbackController.updateFeedbackrecord(req,res)
})

//delete feedback 
router.delete('/:id',(req,res)=>{

    feedbackController.deleteFeedbackrecord(req,res)

})

//Exports Router
module.exports=router;