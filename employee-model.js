const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var employeeSchema = new mongoose.Schema({
    name:{
        type:String
    },
    number:{
        type:String
    },
    email:{
        type:String
    }
    

});
module.exports=mongoose.model('Employee',employeeSchema);