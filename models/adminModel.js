const mongoose = require("mongoose")
const { type } = require("os")


const AdminSchema = new mongoose.Schema({
    userName: {
        type: String,
        trim: true
    },
    password: {
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

    // Adjust The Radius
    radius: {
        type: Number,
        default: 0
    }
});


module.exports = mongoose.model("Admin", AdminSchema)