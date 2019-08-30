const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const ejs = require('ejs');
const multer = require('multer');


const app = express();

const port = 5000 || process.env.PORT;



app.use(bodyParser.urlencoded({extended : true}));
app.set('view engine', 'ejs')
app.use(express.static('./public'));


// multer documemntation
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/myupload')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));

    }
  })
   
  var upload = multer({ 
      storage: storage,
     }).single("profilepic")  // name of the tag from html
// multer




app.get('/',(req,res)=>{
   // res.send('app is up !!');
   res.render('index');

})

// Desc
app.post('/upload',(req,res)=>{
 upload(req,res,(error) =>{
     if(error){
         res.render("index", {
             message : error ,
         });
     }else {
         res.render("index", {
             message : 'sucessfully uplaoded...',
             filename : `myupload/${req.file.filename}`,
             
         })
     }
 })        // funtion from things defined from documentation
});


app.listen(port,()=>{ console.log('server up and running');})



