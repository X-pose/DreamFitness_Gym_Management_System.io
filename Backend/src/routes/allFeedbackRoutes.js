const express = require('express');
const router = express.Router();
const  FeedbackController = require('../controllers/feedbackController')

router.get('/', (req,res) =>{
    FeedbackController.getFeedbacks(req,res)

})


//Exports Router
module.exports=router