//This class defines the schema of the mongoDB collection and enforce data validations and rules
//related to displaying progress details phase


const mongoose = require('mongoose');
const connectDB = require('../config/database')


const progressSchema =  new mongoose.Schema({

    username: {type: String,required: true},
    selectDate: {type:String, required:true},
    StartTime: {type:String, required:true},
    EndTime: {type:String, required:true},
    Weight: {type:Number, require:true},
    Cal_burn_treadmil: {type:Number, required:true},
    Cal_burn_cycling: {type:Number, required:true},
    Time_squates: {type:Number, required:true},
    Time_legpress: {type:Number, required:true},
    Time_breanchpress: {type:Number, required: true},
    Time_shoulderpress: {type:Number, required: true},
    Time_situps: {type:Number, required: true},
    Time_pullups: {type:Number, required:true},
    cal_squates: {type:Number, required:false},
    cal_legpress: {type:Number, required:false},
    cal_breanchpress: {type:Number, required:false},
    cal_shoulderpress: {type:Number, required:false},
    cal_situps: {type:Number, required:false},
    cal_pullups: {type:Number, required:false},
    Total_calories: {type:Number, required:false}

})


connectDB.getInstance_C();
console.log('Progress model executed ok!')
const ProgressModel = mongoose.model('ProgressModel', progressSchema, 'ProgressDetails')

module.exports = ProgressModel;