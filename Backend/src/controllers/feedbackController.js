const FeedbackModel =require('../models/FeedbackModel')
const sessionHandler = require('../config/sessionHandler');

exports.getFeedbackdetails =  async(req,res) =>{

    //validating login
    if(sessionHandler.getSessionName() !== null){
    
        const feedback = await FeedbackModel.find({ username: sessionHandler.getSessionName()}).sort({createdAt: -1})
        res.status(200).json(feedback)
    
     }else{ console.log("User is not logged in yet. Validation failed!");
            res.status(401).json({ error: 'Not authorized to access account details. Please login to access your account details!' });
     }
}

//get all feedback
exports.getFeedbacks = async (req, res) => {
    const feedback = await FeedbackModel.find({}).sort({createdAt: -1})   // -1 means decesending order. show latest one in the top
    console.log('Running viewFeedback controller')
    
    res.status(200).json(feedback)  // sending that as json, back to the browser
}

 exports.createFeedbackrecord = async(req,res) =>{
    const {description, rating} = req.body
    const username=sessionHandler.getSessionName()
    try{
        const feedback = await FeedbackModel.create({username,description, rating})
        res.status(200).json(feedback)
    } catch(error){
        res.status(400).json({error: error.message})
    }
    
 }   


 exports.deleteFeedbackrecord  = async(req,res) => {
    const { id } = req.params
    const feedback = await FeedbackModel.findOneAndDelete({_id: id});

    if(!feedback) {
        return res.status(400).json({error: 'No such Feedback Record'})
      }
    
      res.status(200).json(feedback)
}

exports.updateFeedbackrecord  = async(req,res) => {
    const {id} = req.params

    console.log("testing update incoming : " + req.body.description)
    try{
    
        const updatedFeedback = await FeedbackModel.findByIdAndUpdate(id, {
            
            $set:req.body
        })
        console.log("Updatedfeeed back"+updatedFeedback)
        res.status(200).json(updatedFeedback)
    }catch(error){
        res.status(400).json({ error: error.message });
    }
}