const mongoose = require("mongoose");

// connect to DtaBase Url
exports.connectToDatabase = async () => {
    try {
        // pass dataBase URL
        await mongoose.connect("mongodb+srv://chinmaypuhan420_db_user:EaCvDzam6K1PsdXB@cluster0.eekljur.mongodb.net/Traxo_Attendence");
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1); // Exit the process with failure
    }
};

// chinmaypuhan420_db_user
// EaCvDzam6K1PsdXB