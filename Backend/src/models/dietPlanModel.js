const mongoose = require('mongoose')
const connectDB = require('../config/database')
const Schema = mongoose.Schema


const dietPlanSchema = new Schema({

    title:{
        type:String,
        required:true,

    },

    gram:{
        type:Number,
        required:true
    },

    description:{
        type:String,
        required:true
    },

 
 },


 { collection: 'dietPlan' })
 connectDB.getInstance_C();
 const dietPlan = mongoose.model('dietPlans', dietPlanSchema, 'dietPlan')
 module.exports = dietPlan;
 
