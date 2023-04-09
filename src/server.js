//This is Node.js server. All the server related configurations should be in here
const http = require('http');
const app = require('./app');


const server = http.createServer(app);


const port = process.env.PORT || 3000;


console.log(`Server will listen on port ${port}`);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});