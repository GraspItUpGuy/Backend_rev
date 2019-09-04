const express = require('express');
const authRouter = express.Router();
const bcrypt = require('bcrypt'); 
const jsonWebToken = require('jsonwebtoken');
const passport  = require('passport');

const key = require('../../setup/myurl');  

//  we are using router because we are sending this file to index.js 
// middleware => hence we need to send it through router

// here / is /api/auth coming from index .js
// if we use /my then url becomes /api/auth/my

// @type    -   GET
// @route   -   /api/auth
// @desc    -   testing for route
// @access  -   PUBLIC
authRouter.get('/',(req,res)=>{
    res.json({test : 'Auth is being tested'});
})


// Import Schema for person to register
const Person = require('../../models/Person');


// @type    -   POST
// @route   -   /api/auth/register
// @desc    -   route for registration of users
// @access  -   PUBLIC
authRouter.post('/register',(req,res)=>{
    // should do to prevent re-register
    Person.findOne({email : req.body.email})
          .then(person => {
              if(person){
                return res.status(400)
                        .json({emailerror : 'Email is already registered'})
              } else{
                 const newPerson = new Person({
                     name : req.body.name,
                     email : req.body.email,
                     password : req.body.password, // in cleartext => needed to be encrypted
                     username : req.body.username,
                 });
                 // encrypt password using bcrypt 
                 // coming from documentation
                 const saltRounds = 10;
                 bcrypt.genSalt(saltRounds, (err, salt)=>{
                 bcrypt.hash(newPerson.password,salt,(err, hash)=>{
                        // Store hash in your password DB.
                        if(err) {
                            console.log('error in hashing the password');
                            console.log('in auth.js' + err);
                        }else{
                            newPerson.password = hash;
                            newPerson.save()
                                     .then(person => res.json(person))
                                     .catch(
                                         err =>{
                                             console.log('db error');
                                             console.log('auth.js');
                                             console.log('cant save the hashed password');
                                             console.log(err);


                                         }
                                     )
                        }
                        
                    });
                });
            

              }
          })
          .catch(err => { console.log('err in auth.js ' + err)})
});


module.exports  = authRouter;