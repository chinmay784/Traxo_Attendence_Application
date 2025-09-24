const express = require("express");
const { punchInEmployee, punchOutEmployee, fetchAllEmployeeAttendence } = require("../controllers/EmployeeAttendenceController");
const { adminSignUp, login, adminProfile, updateAdminRadius, fetchAllAttendence, adminAddEmployeeName, adminDeleteEmployeeName, fetchAllEmployeeName } = require("../controllers/AdminController");
const { authMiddelWere } = require("../middelwere/authMiddelwere");
const router = express.Router();


router.post("/adminSignUp",adminSignUp);
router.post("/login",login)
router.post("/adminProfile",authMiddelWere,adminProfile)
router.post("/updateAdminRadius",authMiddelWere,updateAdminRadius)
router.post("/punchInEmployee",punchInEmployee);
router.post("/punchOutEmployee",punchOutEmployee);
// router.post("/fetchAllEmployeeAttendence",fetchAllEmployeeAttendence)
router.post("/fetchAllAttendence",authMiddelWere,fetchAllAttendence);
router.post("/adminAddEmployeeName",authMiddelWere,adminAddEmployeeName);
router.post("/adminDeleteEmployeeName",authMiddelWere,adminDeleteEmployeeName);
router.post("/fetchAllEmployeeName",fetchAllEmployeeName)


module.exports = router;