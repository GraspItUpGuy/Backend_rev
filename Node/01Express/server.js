const express = require('express');
const app = express();

const port = 3001 || process.env.PORT ;


app.get('/',(request ,response)=>{
    response.send('Hello World');
})

app.get('/about',(request, response)=>{
    //response.send("<h1>I am about Page</h1>")
    
    //response.status(200).json({user : "Shayam", balance : "2000", id : "edb2i7w"});
    response.status(200).json({error : "something is not right"});

})

app.get('/contact',(req,res)=>{
    res.send('You can reach me at <a href ="http://www.google.com" >birmaan.puneet19@gmail.com</a>');
})

app.get('/services',(req,res)=>{
    res.send(' <h1>Services Offered </h1> <br> <ul><li><h2>Sarcasm</h2></li><li><h2>More Sarcasm</h2></li><li><h2> Even more Sarcasm</h2></li></ul>');
})

app.post('/login',(req,res)=>{
    res.send("Login succcesful");
});

app.delete('/options',(req,res)=>{
    res.send("delete request on /options processed")
})


app.get("/ab*cd",(req,res)=>{
    res.send("regex page");
})

app.get("/user/:id/status/:status_id",(req,res)=>{
    res.send(req.params);
})

app.get('/flights/:from-:to',(req,res)=>{
    res.send(req.params);  // returns JSON
})



app.listen(port,()=>{
    console.log(`Server is running at port : ${port}`);
})