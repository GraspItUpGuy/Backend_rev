const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const passport = require('passport');


const app = express();
const port =  process.env.PORT || 5001;


// bring all routes
const auth = require("./routes/api/auth");
const profile = require("./routes/api/profile");
const questions = require("./routes/api/questions");


// middle ware for body-parser
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());


// mongoDB configuration
const db = require('./setup/myurl').mongoURL ;  

// attempt to connect to database
mongoose.connect(db, {useNewUrlParser: true}) 
        .then(()=>{ console.log('MongoDB connected successfully');})
        .catch((err)=>{ console.log('DB not connected' + err);});
              
    
// passport middleware
app.use(passport.initialize());      

// config for JWT strategy
require("./Strategies/jsonWTstrategy")(passport);

// test route
app.get('/',(req,res)=>{
    res.send('Hey there big stack');
});

// actual routes
app.use('/api/auth',auth);
app.use('/api/profile',profile);
app.use('/api/questions',questions);


app.listen(port,()=>{
    console.log(`server up and running on ${port} `);
})

