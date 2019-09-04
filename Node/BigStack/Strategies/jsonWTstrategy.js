const JwtStrategy = require('passport-jwt').Strategy,
 const   ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const  Person = mongoose.model("myPerson");
// myperson is from Person.js => defined in model in the export statement

const myKey = require("../setup/myurl");

// coming from documentation
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = myKey.secret;

module.exports = passport =>{
    passport.use(new JwtStrategy(opts,(jwt_payload, done)=>{
        Person.findById(jwt_payload.id)
            .then(person =>{
                if(person){
                    return done(null, person);
                }
                return done(null, false);
                
            })
            .catch(err=>{
                console.log("error in strategy");
                console.log(" jsonWTstrategy.js");
                console.log(err);
            });
            
        
    }));
    
}