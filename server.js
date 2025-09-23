const express = require("express");
const app = express();
const PORT = 7000;
const cors = require("cors");
const { connectToDatabase } = require("./dataBase/db");

app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));


// write api EndPoint
app.use("/user",require("./routes/employeeAttendenceRoute"))


app.listen(PORT , () =>{
    console.log('Server Running on PORT No',`${PORT}`);
    console.log("Server Url is Running on http://localhost:7000")
})
// call DataBase Here()
connectToDatabase();