const mongoose = require('mongoose');

const schema = mongoose.Schema;

const PersonSchema = new Schema({
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
    DOB : {
        type : Date,
        required : true,
    },
    date : {
        type : Date,
        default : Date.now,
    }
});


let dbModel = mongoose.model('myPerson', PersonSchema);
module.exports =  dbModel;