const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const Strategy = require('passport-facebook').Strategy;

// from documentation => setting for passport-facebook
passport.use(new Strategy({
    clientID : "349835245895670",
    clientSecret : "3070bf9a5aa57f11bb462065e0e1258c",
    callbackURL : "http://localhost:4000/login/facebook/return"

}, 
 (accessToken , refreshToken, profile, cb )=>{
     return cb(null,profile);
 }
 )
);

passport.serializeUser((user,cb)=>{
    cb(null, user); // theory at the bottom
})

passport.deserializeUser((obj,cb)=>{
    cb(null, obj);
})
// from documentation till here

const port = 4000 || process.env.PORT;
const app = express();

// set views
app.set('views',__dirname + '/views');
app.set('view engine','ejs');


// requiring from npm page documentations of each
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(bodyParser.urlencoded({extended : true}));
app.use(require('express-session')({
    secret : 'GraspItUpGuy App',
    resave : true, 
    saveUninitialized : true,
    cookie: { secure: true },

}))




// @route   -   GET  /home
// @desc    -   a route to home page
// @access  -   PUBLIC
app.get('/',(req,res)=>{
    res.render('home',{user : req.user});
})

// @route   -   GET  /login
// @desc    -   a route to LOGIN page
// @access  -   PUBLIC
app.get('/login',(req,res)=>{
    res.render('login')
})

// @route   -   GET  /login/facebook
// @desc    -   a route to  facebook Auth
// @access  -   PUBLIC
// @source  -    documentation
app.get('/login/facebook',(req,res)=>{
    app.get('/auth/facebook',
  passport.authenticate('facebook'));
})

// @route   -   GET  /login/facebook//callback
// @desc    -   a route to  facebook Auth success => redirect to home
// @access  -   PUBLIC
// @source  -    documentation
app.get('/login/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) =>{
    // Successful authentication, redirect home.
    res.redirect('/');
  });
  
// @route   -   GET  /login/facebook/
// @desc    -   a route to  facebook Auth failure => Re-authenticate
// @access  -   PUBLIC
// @source  -    documentation
app.get('/login/facebook',
passport.authenticate('facebook', { authType: 'reauthenticate' }));

// @route   -   GET  /profile
// @desc    -   a route to profile of the user
// @access  -   PRIVATE
// @source  -    documentation
app.get('/profile',require('connect-ensure-login').ensureLoggedIn(),
  (req,res)=>{
      res.render('profile', {user : req.user});

  }
)


app.listen(port, ()=>{
    console.log(`server is up and running ${port}`);
})

// theory on serializeUSer and Deserialize user


// The user id (you provide as the second argument of the done function)
// is saved in the session and is later used to retrieve the whole object 
//via the deserializeUser function.

// serializeUser determines which data of the user object should be 
//stored in the session. The result of the serializeUser method is 
//attached to the session as req.session.passport.user = {}. 
//Here for instance, it would be (as we provide the user id as the key) 
// req.session.passport.user = {id: 'xyz'}

// We are calling passport.deserializeUser right after it where does it
// fit in the workflow?
// The first argument of deserializeUser corresponds to the key of the
// user object that was given to the done function (see 1.). So your
// whole object is retrieved with help of that key. That key here is 
//the user id(key can be any key of the user object i.e. name,email etc). 
//In deserializeUser that key is matched with the in memory
// array / database or any data resource.

// The fetched object is attached to the request object as req.user

// Visual Flow

// passport.serializeUser(function(user, done) {
//     done(null, user.id);
// });              │
//                  │ 
//                  │
//                  └─────────────────┬──→ saved to session
//                                    │    req.session.passport.user = {id: '..'}
//                                    │
//                                    ↓           
// passport.deserializeUser(function(id, done) {
//                    ┌───────────────┘
//                    │
//                    ↓ 
//     User.findById(id, function(err, user) {
//         done(err, user);
//     });            └──────────────→ user object attaches to the request as req.user   
// });
