//This is the entry point to the express app server. All the app related configurations should be done in here
console.log('Loading app.js...');
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/database')
const app = express();
//Test_connection
connectDB.getInstance_SA();
connectDB.getInstance_M();
connectDB.getInstance_I();
connectDB.getInstance_C();
//setting up middleware
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
  });

module.exports = app;
console.log('Exporting app instance...');