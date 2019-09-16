const mongoose = require('mongoose');

const schema = mongoose.Schema;

const PersonSchema = new schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    username : {
        type : String,
        required : true,
    },
    profilePic : {
        type : String,
        default : "../DefaultData/manIcon.png",
    },
    gender : {
        type : String,
        required : true,
        default : "male" ,
    }
    ,
    date : {
        type : Date,
        default : Date.now,
    }
});


let Person = mongoose.model('myPerson', PersonSchema);
module.exports =  Person;