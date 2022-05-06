const express = require("express");

//Create a express app with following command
const app = express();

//express is a chain of middlewares, that we apply to the incoming requests. Each part of the funnel can do something with the request
//It could read it, manipulate it, or do something with response,send response.

// We add that middleware with following
//use function takes 3 arguments
//If you use next function then request will continue it's journey
app.use((req, res, next)=>{
    console.log('Middleware');
    next();
});

app.use((req, res, next)=>{
    res.send('Hello!');
});

// we want to use this app in server. to do that we need export it
module.exports = app;