const app = require("./app");
const debug = require("debug")("node-angular");
const http = require("http");
const socket=require('socket.io');

//when recieving a port through environment variable or setting up portchecking if the port is valid
const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

//checks errors and exits
const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

//console logs that we're listening for requests
const onListening = () => {
  const addr = server.address();
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  debug("Listening on " + bind);
};

//setting up port
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

//start the server using express app as parameter
const server = http.createServer(app);
//checking if anything is wrong when starting server
server.on("error", onError);
server.on("listening", onListening);
//listen for requests
//server.listen(port);
// 3000
server.listen(port)
console.log(server);
const io = socket.listen(server);
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});



// server.listen(port)
// console.log(server);
// const io = socket.listen(server);
// io.on('connection', function(socket){
//   var currentMessages=[];
//   socket.on('gettingMessage', function(msg){
//     console.log('user disconnected'+ msg);
//   });
//   socket.emit('sendMessage', function(msg){
//     console.log('user disconnected'+ msg);
//   });
// });

