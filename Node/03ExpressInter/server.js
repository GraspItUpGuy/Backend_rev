const express = require('express');
const app = express();

const port = 5000 || process.env.PORT;

// middleware is a code that is executed before the 
//request is being made
    var myConsoleLog = function(req,res,next){
    console.log('I am a middleware')
    next();
    }
   
   






var serverTime = function(req,res,next){
    console.log('I am a middleware 2')
    req.requestTime = Date.now();
    next();
}

app.use(serverTime);
app.use(myConsoleLog);


app.get('/',(req,res)=>{
    res.send('<h1>Hello</h1>  <br>  "time is : "'  + req.requestTime)
    console.log('Hello world from route');

});


app.listen(5000,()=>{
    console.log(`Server is up and running on localhost:5000`)
});