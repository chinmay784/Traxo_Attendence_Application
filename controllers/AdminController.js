const Admin = require("../models/adminModel");
const jwt = require("jsonwebtoken")
const EmployeeAttendence = require("../models/employeeAttendenceModel")


exports.adminSignUp = async (req, res) => {
    try {
        const { userName, password } = req.body;

        if (!userName || !password) {
            return res.status(200).json({
                sucess: false,
                message: "Please Provide UserName or Password"
            })
        }

        const isUserExist = await Admin.findOne({ userName });

        if (isUserExist) {
            return res.status(200).json({
                sucess: false,
                message: `${userName} Already Exist`
            })
        }

        const user = await Admin.create({
            userName,
            password
        })

        return res.status(200).json({
            sucess: true,
            message: "Admin SignUp SucessFully"
        })

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            sucess: false,
            message: "Server Error in while SignUp Time"
        })
    }
}


exports.login = async (req, res) => {
    try {
        const { userName, password, latitude, longitude } = req.body;

        // Validate input
        if (!userName || !password) {
            return res.status(400).json({
                message: 'userName and password are required',
                success: false
            });
        }


        if (!latitude || !longitude) {
            return res.status(400).json({
                message: 'latitude and longitude are required',
                success: false
            });
        }

        // Find user by email
        const user = await Admin.findOne({ userName });
        if (!user) {
            return res.status(200).json({
                message: 'Admin not found',
                success: false
            });
        }

        // Check password (in a real application, you should hash the password and compare)
        if (user.password !== password) {
            return res.status(401).json({
                message: 'Invalid password',
                success: false
            });
        }

        user.latitude = latitude;
        user.longitude = longitude;

        await user.save();

        const token = jwt.sign({ userId: user._id }, "attendence", { expiresIn: "24h" })

        res.status(200).json({
            message: 'Admin logged in successfully',
            success: true,
            user: {
                id: user._id,
                name: user.userName,
                radius:user.radius,
            },
            token,
        });

    } catch (error) {
        console.error('Error logging in admin:', error);
        res.status(500).json({
            message: `Internal Server Error Or ${error.message}`,
            success: false
        });
    }
}


exports.adminProfile = async (req, res) => {
    try {
        const userId = req.user.userId;


        if (!userId) {
            return res.status(200).json({
                sucess: false,
                message: "Please Provide UserId"
            })
        }

        const user = await Admin.findById(userId);

        if (!user) {
            return res.status(200).json({
                sucess: false,
                message: "User Not Found"
            })
        }


        res.status(200).json({
            message: 'User profile retrieved successfully',
            success: true,
            user: {
                id: user._id,
                name: user.userName,
                radius: user.radius
            }
        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            sucess: false,
            message: "Server error in adminProfile"
        })
    }
}



exports.updateAdminRadius = async (req, res) => {
    try {
        const userId = req.user.userId;
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'Please provide userId'
            });
        }

        const { radius } = req.body;
        if (!radius) {
            return res.status(400).json({
                success: false,
                message: 'Please provide radius'
            });
        }

        // ✅ Fetch admin by ID
        const admin = await Admin.findById(userId);

        if (!admin) {
            return res.status(404).json({
                success: false,
                message: "Admin not found"
            });
        }

        admin.radius = radius;
        await admin.save();

        return res.status(200).json({
            success: true,
            message: "Radius updated successfully",
            radius: admin.radius
        });

    } catch (error) {
        console.log("Server Error in updateAdminRadius:", error.message);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



exports.fetchAllAttendence = async (req, res) => {
    try {
        const userId = req.user.userId;
        if (!userId) {
            return res.status(200).json({
                sucess: false,
                message: "Please Provide UserId"
            })
        }


        // find all Attendence of Employee
        const Allattendence = await  EmployeeAttendence.find({});

        if(!Allattendence){
            return res.status(200).json({
                sucess:false,
                message:"No Data Present in Allattendence"
            })
        }

        return res.status(200).json({
            sucess:true,
            message:"Allattendence Fetched SucessFully",
            Allattendence,
        })

    } catch (error) {
        console.log(error, error.message);
        return res.status(500).json({
            sucess: false,
            message: "Server In FetchUserAttendence"
        })
    }
}