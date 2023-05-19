const dietPlan = require('../models/dietPlanModel')
const mongoose = require('mongoose')


//get all dietplan

const getDietPlans = async(req,res) =>{
        const readDietPlans = await dietPlan.find({}).sort({createdAt:-1})
        res.status (200).json(readDietPlans)
}

// get single dietplan

const getDietPlan = async(req,res)=>{

        const  { id } = req.params

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: 'No such diet plan'})
        }

        const readDietPlan = await readDietPlan.findById(id)

        if(!readDietPlan){
            return res.status(404).json({error:'NO such diet plan'})
        }

        res.status(200).json(readDietPlan)


} 


// create new dietplan

const createDietPlan = async (req,res) =>{
    const {title,gram,description} = req.body

    try {
        const createDietPlan = await dietPlan.create({title,gram,description})
        res.status(200).json(createDietPlan)

    }catch(error){
        res.status(400).json({error:error.message})

    }
}


// delete a dietplan

    const deleteDietPlan = async(req,res) =>{
        const  {id}  = req.params

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: 'No such diet plan'})
        }
        
        const deletedDietPlan = await dietPlan.findOneAndDelete({_id: id})

        if(!deletedDietPlan){
            return res.status(404).json({error:'NO such diet plan'})
        }

        res.status(200).json(deletedDietPlan)

    }   



// update dietplan

    const updateDietPlan = async(req,res) =>{

        const  { id } = req.params

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: 'No such diet plan'})
        }

        const updatedDietPlan = await dietPlan.findOneAndUpdate({_id: id},{
            ...req.body
        })

        if(!updatedDietPlan){
            return res.status(404).json({error:'NO such diet plan'})
        }

        res.status(200).json(updatedDietPlan)

    }


module.exports = {
    createDietPlan,
    getDietPlans,
    getDietPlan,
    deleteDietPlan,
    updateDietPlan

}