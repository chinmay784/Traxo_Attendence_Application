const EmployeeAttendence = require("../models/employeeAttendenceModel");
const Admin = require("../models/adminModel");

// exports.punchInEmployee = async (req, res) => {
//     try {
//         const { employeeName, punchIn, date, latitude, longitude } = req.body;

//         if (!employeeName) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Please Provide Employee Name"
//             });
//         }

//         if (!punchIn) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Please Provide punchIn time"
//             });
//         }

//         if (!date) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Please Provide date"
//             });
//         }


//         if (!latitude) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Please Provide latitude"
//             });
//         }

//         if (!longitude) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Please Provide longitude"
//             });
//         }

//         // ✅ Check if employee already punched in today
//         const existing = await EmployeeAttendence.findOne({
//             employeeName: employeeName,
//             date: date
//         });

//         if (existing) {
//             return res.status(400).json({
//                 success: false,
//                 message: `${employeeName} has already punched in today`
//             });
//         }

//         // Save new punchIn
//         const attendence = new EmployeeAttendence({
//             employeeName,
//             punchIn,
//             date,
//             latitude,
//             longitude
//         });

//         await attendence.save();

//         return res.status(200).json({
//             success: true,
//             message: "Employee PunchIn Successful"
//         });

//     } catch (error) {
//         console.log("Server Error in punchInEmployee", error.message);
//         return res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// };



const haversineDistance = (coords1, coords2) => {
    const toRad = (value) => (value * Math.PI) / 180;

    const R = 6371000; // Earth radius in meters
    const dLat = toRad(coords2.latitude - coords1.latitude);
    const dLon = toRad(coords2.longitude - coords1.longitude);

    const lat1 = toRad(coords1.latitude);
    const lat2 = toRad(coords2.latitude);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // distance in meters
};

exports.punchInEmployee = async (req, res) => {
    try {
        const { employeeName, punchIn, date, latitude, longitude } = req.body;

        if (!employeeName) {
            return res.status(400).json({ success: false, message: "Please Provide Employee Name" });
        }
        if (!punchIn) {
            return res.status(400).json({ success: false, message: "Please Provide punchIn time" });
        }
        if (!date) {
            return res.status(400).json({ success: false, message: "Please Provide date" });
        }
        if (!latitude || !longitude) {
            return res.status(400).json({ success: false, message: "Please Provide latitude & longitude" });
        }

        // ✅ Fetch Admin location
        const admin = await Admin.findOne();
        if (!admin || !admin.latitude || !admin.longitude) {
            return res.status(400).json({ success: false, message: "Admin location not set" });
        }

        // ✅ Calculate distance between Admin and Employee
        const distance = haversineDistance(
            { latitude: admin.latitude, longitude: admin.longitude },
            { latitude: parseFloat(latitude), longitude: parseFloat(longitude) }
        );

        if (distance > 50) {
            return res.status(400).json({
                success: false,
                message: `You are outside the allowed punch-in area. Distance: ${distance.toFixed(2)} meters`
            });
        }

        // ✅ Check if employee already punched in today
        const existing = await EmployeeAttendence.findOne({ employeeName, date });
        if (existing) {
            return res.status(400).json({
                success: false,
                message: `${employeeName} has already punched in today`
            });
        }

        // ✅ Save new punchIn
        const attendence = new EmployeeAttendence({
            employeeName,
            punchIn,
            date,
            latitude,
            longitude
        });

        await attendence.save();

        return res.status(200).json({
            success: true,
            message: "Employee PunchIn Successful",
            distance: `${distance.toFixed(2)} meters`
        });

    } catch (error) {
        console.log("Server Error in punchInEmployee", error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
};



// exports.punchOutEmployee = async (req, res) => {
//     try {
//         const { employeeName, punchOut, date, latitude, longitude } = req.body;

//         if (!employeeName) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Please provide Employee Name"
//             });
//         }

//         if (!punchOut) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Please provide punchOut time"
//             });
//         }

//         if (!date) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Please provide date"
//             });
//         }

//         if (!latitude) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Please Provide latitude"
//             });
//         }

//         if (!longitude) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Please Provide longitude"
//             });
//         }

//         // ✅ Find today's attendance record for this employee
//         const existing = await EmployeeAttendence.findOne({
//             employeeName,
//             date
//         });

//         if (!existing) {
//             return res.status(400).json({
//                 success: false,
//                 message: `${employeeName} has not punched in today`
//             });
//         }

//         if (existing.punchOut) {
//             return res.status(400).json({
//                 success: false,
//                 message: `${employeeName} has already punched out today`
//             });
//         }

//         // ✅ Update existing record instead of creating a new one
//         existing.punchOut = punchOut;
//         existing.latitudeOut = latitude;  // optional: separate field for punchOut location
//         existing.longitudeOut = longitude;

//         await existing.save();

//         return res.status(200).json({
//             success: true,
//             message: "Employee PunchOut Successful"
//         });

//     } catch (error) {
//         console.log("Server Error in punchOutEmployee", error.message);
//         return res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// };




exports.punchOutEmployee = async (req, res) => {
    try {
        const { employeeName, punchOut, date, latitude, longitude } = req.body;

        if (!employeeName) {
            return res.status(400).json({ success: false, message: "Please provide Employee Name" });
        }
        if (!punchOut) {
            return res.status(400).json({ success: false, message: "Please provide punchOut time" });
        }
        if (!date) {
            return res.status(400).json({ success: false, message: "Please provide date" });
        }
        if (!latitude || !longitude) {
            return res.status(400).json({ success: false, message: "Please provide latitude & longitude" });
        }

        // ✅ Fetch Admin location
        const admin = await Admin.findOne();
        if (!admin || !admin.latitude || !admin.longitude) {
            return res.status(400).json({ success: false, message: "Admin location not set" });
        }

        // ✅ Calculate distance between Admin and Employee
        const distance = haversineDistance(
            { latitude: admin.latitude, longitude: admin.longitude },
            { latitude: parseFloat(latitude), longitude: parseFloat(longitude) }
        );

        if (distance > 50) {
            return res.status(400).json({
                success: false,
                message: `You are outside the allowed punch-out area. Distance: ${distance.toFixed(2)} meters`
            });
        }

        // ✅ Find today's attendance record for this employee
        const existing = await EmployeeAttendence.findOne({ employeeName, date });

        if (!existing) {
            return res.status(400).json({
                success: false,
                message: `${employeeName} has not punched in today`
            });
        }

        if (existing.punchOut) {
            return res.status(400).json({
                success: false,
                message: `${employeeName} has already punched out today`
            });
        }

        // ✅ Update existing record instead of creating a new one
        existing.punchOut = punchOut;
        existing.latitudeOut = latitude;   // optional: track punchOut location separately
        existing.longitudeOut = longitude;

        await existing.save();

        return res.status(200).json({
            success: true,
            message: "Employee PunchOut Successful",
            distance: `${distance.toFixed(2)} meters`
        });

    } catch (error) {
        console.log("Server Error in punchOutEmployee", error.message);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};






exports.fetchAllEmployeeAttendence = async (req, res) => {
    try {
        const allAttendence = await EmployeeAttendence.find();

        // Merge punchIn and punchOut per employee per date
        const mergedData = {};

        allAttendence.forEach((entry) => {
            const key = `${entry.employeeName}-${entry.date}`;
            if (!mergedData[key]) {
                mergedData[key] = {
                    employeeName: entry.employeeName,
                    date: entry.date,
                    punchIn: entry.punchIn || null,
                    punchOut: entry.punchOut || null
                };
            } else {
                if (entry.punchIn) mergedData[key].punchIn = entry.punchIn;
                if (entry.punchOut) mergedData[key].punchOut = entry.punchOut;
            }
        });

        const result = Object.values(mergedData);

        return res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        console.log("Server Error in fetchAllEmployeeAttendence", error.message);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};