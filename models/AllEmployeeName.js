const mongoose = require("mongoose");


const employeeNameSchema = new mongoose.Schema({
    employeeName:{
        type:String,
        trim:true,
        required:true,
    },
});


module.exports = mongoose.model("employeeNameSchema",employeeNameSchema)