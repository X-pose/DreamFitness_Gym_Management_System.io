//This is the entry point to the express app server. All the app related configurations should be done in here
console.log('Loading app.js...');
const express = require('express');
const session = require('express-session');
const userManagementRoutes = require('./routes/userManagementRoutes');
const app = express();
const appRouter = express.Router();


//setting up middleware
app.use(express.json());

app.use('/', appRouter);

app.use('/', userManagementRoutes);

//Setting up session middleware
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 3600000 // 1 hour
    }
  }));

module.exports = app;
console.log('Exporting app instance...');