const mongoose = require('mongoose')
const connectDB = require('../config/database')
const Schema = mongoose.Schema

const FAQSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  load: {
    type: String,
    required: true
  },
  cat: {
    type: String,
    required: true
  },

  
}, { collection: 'FAQ' })

 

connectDB.getInstance_C();
const FAQ = mongoose.model('FAQ', FAQSchema, 'FAQ')

module.exports = FAQ;