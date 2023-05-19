const mongoose = require('mongoose')
const  Schema = mongoose.Schema
const connectDB = require('../config/database')

const  instructorSchema = new Schema({
    title: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    quote: {
        type: String,
        required: false
    },
    certification: {
        type: String,
        required: false
    },
    bodybuilding : {
        type: Number,
        required: false
    },
    cardio : {
        type: Number,
        required: false
    },
    weightloss : {
        type: Number,
        required: false
    },
    displayImg:{
        type:String,
        required:false
    }
 
},{ collection: 'InstructorDetails' })

connectDB.getInstance_C();

const instructorModel = mongoose.model('instructorModel', instructorSchema, 'InstructorDetails');


module.exports = instructorModel;
//InstructorDetails
