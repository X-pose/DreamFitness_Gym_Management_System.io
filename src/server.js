//This is Node.js server. All the server related configurations should be in here
//In here, we create and starts the HTTP server
const http = require('http');
const app = require('./app');

//Creates HTTP server
const server = http.createServer(app); //Gets express app instance to create the server
module.exports = server; //Exports the HTTP server