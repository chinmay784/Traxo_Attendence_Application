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
    },
    latitude: {
        type: Number,
        default: 0
    },
    longitude: {
        type: Number,
        default: 0
    },
});

module.exports = mongoose.model("EmployeeAttendence", EmployyeAttendenceSchema);