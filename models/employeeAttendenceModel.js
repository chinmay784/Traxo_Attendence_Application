const mongoose = require("mongoose");

const EmployyeAttendenceSchema = new mongoose.Schema({
    employeeName: {
        type: String,
        trim: true,
        required: true,
    },
    punchIn: {
        type: String, // <-- change to String
        trim: true,
    },
    punchOut: {
        type: String, // <-- change to String
        trim: true,
    },
    date: {
        type: String,
        trim: true
    }
});

module.exports = mongoose.model("EmployeeAttendence", EmployyeAttendenceSchema);