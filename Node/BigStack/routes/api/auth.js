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


// @type    -   POST
// @route   -   /api/auth/login
// @desc    -   route for login of existing users
// @access  -   PUBLIC
authRouter.post('/login',(req,res)=>{
    const email = req.body.email ;
    const password = req.body.password; // is in cleartext
    // needed to me converted into hash for comparison using bcrypt
    Person.findOne({email})
        .then(person => {
            if(!person){
                return res.status(404).json({emailerror : 'user not found with this email'})
            }
             // match the password
            bcrypt.compare(password, person.password)
                  .then(isMatched =>{
                         if(isMatched){
                             //res.json({success : "User is logged in successfully"});
                             // Strategy to be done here
                             // use payload and create token for user
                             // documentation
                             const payload = {
                                 id : person.id,
                                 name : person.name,
                                 email: person.email,
                                 username : person.username,
                             };
                             jsonWebToken.sign(
                                 payload,
                                 key.secret,
                                 { expiresIn: 60 *60}, // 1 hour
                                 (err, token) => {
                                     res.json({
                                         success : true,
                                         token : "Bearer" + " " + token,
                                     })
                                 }
                             )
                         }else{
                             res.status(400).json({passworderror : "password is not correct"})
                         }
                  })
                  .catch( err =>{
                      console.log("inncorrect password" + "auth.js");
                      console.log(err)
                  })
            
        })
        .catch(
            err=>{
                console.log('cant find user email');
                console.log('DB error in auth.js');
                console.log(err);

            }
        )
})

// @type    -   GET
// @route   -   /api/auth/profile
// @desc    -   route for user profile
// @access  -   PRIVATE
// private route from passport-jwt strategy
authRouter.get('/profile',
passport.authenticate('jwt'),{session : false},
(req,res)=>{
    console.log(req);

}
)



module.exports  = authRouter;