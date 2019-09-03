const express = require('express');
const mongoose = require('mongoose');


const app = express();
const port =  process.env.PORT || 5001;

// mongoDB configuration
const db = require('./setup/myurl').mongoURL ;  

// attempt to connect to database
mongoose.connect(db) 
        .then(()=>{ console.log('MongoDB connected successfully');})
        .catch((err)=>{ console.log('DB not connected' + err);});
                    

app.get('/',(req,res)=>{
    res.send('Hey there big stack');
});




app.listen(port,()=>{
    console.log(`server up and running on ${port} `);
})