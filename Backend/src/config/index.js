//This is the entry point to the back end. In here we starts the by importing app.js

const server = require("../server"); //Imports HTTP server
const port = process.env.PORT || 4000;

console.log(`Server will listen on port ${port}`);

//Server then  listen to the port (3000)
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});