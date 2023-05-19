const instructorModel = require('../models/InstructorModel')
const mongoose = require('mongoose')

//get all instructors
const getInstructors = async (req,res) => {

    try {
        const instructors= await instructorModel.find({}).sort({createdAt: -1})
        console.log("Passing bravo")
    
        
        res.status(200).json(instructors)
        
    } catch (error) {
        res.status(500).json({error:'server error at getInstructors'})
    }

}

// get an single instructors
const getInstructor = async (req,res) =>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }

    const instructor = await instructorModel.findById(id)

    if(!instructor){
        return res.status(404).json({error: 'No such workout'})
    }

    res.status(200).json(instructor)
}

//create a new instructors
const createInstructor = async (req, res) => {
    const title = req.body.title
    const description = req.body.description
    const quote = req.body.quote 
    const certification = req.body.certification
    const bodybuilding = req.body.bodybuilding
    const cardio = req.body.cardio 
    const weightloss = req.body.weightloss
    const displayImg = 'http://localhost:4000/static/img/'+ req.body.title + '_Display.png'

    //add doc to db
    try{
        const instructor = await instructorModel.create({title, description, quote ,certification,bodybuilding, cardio, weightloss, displayImg})
        res.status(200).json(instructor) 

    }catch(error){
        res.status(430).json({error: error.message})
    }
}

//delete a instructors

 const deleteInstructor = async(req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }
    
    const instructor = await instructorModel.findOneAndDelete({_id: id})

    if(!instructor){
        return res.status(404).json({error: 'No such workout'})
    }

    res.status(200).json(instructor)

 }

//update a instructors
const updateInstructor = async (req, res) => {
    console.log("passing Delta-1");
    const { id } = req.params;
  
    const updateBody = {
      $set: req.body,
      displayImg: 'http://localhost:4000/static/img/' + req.body.title + '_Display.png',
    };
  
    const instructor = await instructorModel.findByIdAndUpdate(id, updateBody);
  
    console.log("passing Delta-2", instructor);
  
    res.status(200).json(instructor);
  };
  
module.exports = {
   
     getInstructors,
     getInstructor,
     createInstructor,
     deleteInstructor,
    updateInstructor,
}