const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({extended : true}));

const port = 5000 || process.env.PORT;
// seting view engine
app.set('views',path.join(__dirname, '/views') );
app.set('view engine', 'pug');




app.get('/', (req,res)=>{
    res.render('index');
    //res.send('I am here and so are you !!!')
})



app.listen(port,()=>{ console.log('up and running');})