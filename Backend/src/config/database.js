//All the database operations should be in here as functions
const mongoose = require('mongoose');
//In here we are going to define 4 connections for 4 roles in our database. SA - Site Admin, M - Manager, I - Instructor, C -Customers
const mongoDB_SA_Uri = 'mongodb+srv://Site_admin:SiteAdmin_ITP29@dreamfitnessdatabaseitp.jaytgsq.mongodb.net/DreamFitnessDatabase?retryWrites=true&w=majority';
const mongoDB_M_Uri = 'mongodb+srv://Manager:Manager_ITP29@dreamfitnessdatabaseitp.jaytgsq.mongodb.net/DreamFitnessDatabase?retryWrites=true&w=majority';
const mongoDB_I_Uri = 'mongodb+srv://Instructors:Instructors_ITP29@dreamfitnessdatabaseitp.jaytgsq.mongodb.net/DreamFitnessDatabase?retryWrites=true&w=majority';
const mongoDB_C_Uri = 'mongodb+srv://Customers:Customers_ITP29@dreamfitnessdatabaseitp.jaytgsq.mongodb.net/DreamFitnessDatabase?retryWrites=true&w=majority';
//4 connection instance for 4 roles
let mongoInstance_SA = null;
let mongoInstance_M = null;
let mongoInstance_I = null;
let mongoInstance_C = null;


/* Function to connect to MongoDB. Using async function so that we can use "await" keyword to pause execution till promise resolved.
    Connect function for Site Admin*/
async function connect_SA() {
  try {
    const conn = await mongoose.connect(mongoDB_SA_Uri, {
      //Using the following option to make this compatible with future versions of node.js and mongoDB
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB_C connected');

    return conn;

  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}

// connect function for manager
async function connect_M() {
  try {
    const conn = await mongoose.connect(mongoDB_M_Uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB_C connected');

    return conn;

  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}

//Connect function for Instructors
async function connect_I() {
  try {
    const conn = await mongoose.connect(mongoDB_I_Uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB_C connected');

    return conn;

  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}
//Connect function for Customers
async function connect_C() {
  try {
    const conn = await mongoose.connect(mongoDB_C_Uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB_C connected');

    return conn;
    
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}

// Singleton instance of mongoose for Site Admin
function getInstance_SA() {
  if (!mongoInstance_SA) {
    mongoInstance_SA = connect_SA();
    
  }
  return mongoInstance_SA;
}

// Singleton instance of mongoose for Manager
function getInstance_M() {
  if (!mongoInstance_M) {
    mongoInstance_M = connect_M();
    
  }
  return mongoInstance_M;
}

// Singleton instance of mongoose for Instructors
function getInstance_I() {
  if (!mongoInstance_I) {

    mongoInstance_I = connect_I();
    
  }
  return mongoInstance_I;
}

// Singleton instance of mongoose for Customers
 async function getInstance_C() {
  
  if (!mongoInstance_C) {
    
    mongoInstance_C = connect_C();
    
  }
  return mongoInstance_C;
}


module.exports = {
  getInstance_SA, getInstance_M, getInstance_I, getInstance_C,
};

