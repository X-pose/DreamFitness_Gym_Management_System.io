//This is the entry point to the express app server. All the app related configurations should be done in here
console.log('Loading app.js...');
const express = require('express');
//const connectDB = require('./config/database');
const userManagementRoutes = require('./routes/userManagementRoutes');
const app = express();
const appRouter = express.Router();


//setting up middleware
app.use(express.json());

app.use('/', appRouter);

app.use('/', userManagementRoutes);

module.exports = app;
console.log('Exporting app instance...');