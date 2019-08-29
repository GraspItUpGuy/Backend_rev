const express  = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 5000 || process.env.PORT;

app.use(bodyParser.urlencoded({extended : true}));//bodyparser-middleware
app.use('/login', express.static(__dirname + '/public')); 
// serving static file

app.get('/',(req,res)=>{
    res.send("Hello application");
})
app.post('/login',(req,res)=>{
     console.log(req.body);
     console.log(req.body.email);
     console.log(req.body.password);

     // do some db processing

     res.redirect('/'); // redirect to home page
    
})


app.listen(port,()=>{
    console.log('server up and running on port 5000');
})