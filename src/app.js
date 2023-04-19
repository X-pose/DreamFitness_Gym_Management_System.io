//This is the entry point to the express app server. All the app related configurations should be done in here
console.log('Loading app.js...');
const express = require('express');
const session = require('express-session');
const crypto = require('crypto');
const userManagementRoutes = require('./routes/userManagementRoutes');
const cookieParser = require('cookie-parser');
const app = express();
const appRouter = express.Router();

const secretKey = crypto.randomBytes(32).toString('hex');
//Setting up session middleware
app.use(session({
  secret: secretKey,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure:true,
    maxAge: 3600000 // 1 hour
  }
}));

//setting up other middlewares
app.use(cookieParser());

app.use(express.json());

app.use('/', appRouter);

app.use('/', userManagementRoutes);



module.exports = app;
console.log('Exporting app instance...');