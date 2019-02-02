//Creating a basic server...

const http= require('http');

//importing the express app
const app=require('./backend/app')

//Setting a const for port number
//process.env.PORT is the real one or 3000 if not put yet.
const port=process.env.PORT||3000;

//setting the port in the express app to be the const
app.set('port',port);

//creating the server through http by passing in the code
const server= http.createServer(app
//ej6 functions: (param1, param2, paramN) => return what to do
    /*(req,res)=>{
    res.end("here");}*/
);

//making the server listen for requests
server.listen(port);

