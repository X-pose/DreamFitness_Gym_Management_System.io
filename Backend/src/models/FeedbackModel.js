const mongoose = require('mongoose');
const connectDB = require('../config/database')


const feedbackSchema = new mongoose.Schema({
    
    username : {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: false
    },
    rating : {
        type: Number,
        required: false
    },


})

connectDB.getInstance_C();
console.log('Feedback model executed OK!')

const FeedbackModel = mongoose.model('FeedbackModel', feedbackSchema,'Feedbacks')
module.exports = FeedbackModel;
