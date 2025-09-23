const express = require("express");
const { punchInEmployee, punchOutEmployee, fetchAllEmployeeAttendence } = require("../controllers/EmployeeAttendenceController");
const { adminSignUp, login, adminProfile } = require("../controllers/AdminController");
const { authMiddelWere } = require("../middelwere/authMiddelwere");
const router = express.Router();


router.post("/adminSignUp",adminSignUp);
router.post("/login",login)
router.post("/adminProfile",authMiddelWere,adminProfile)
router.post("/punchInEmployee",punchInEmployee);
router.post("/punchOutEmployee",punchOutEmployee);
router.post("/fetchAllEmployeeAttendence",fetchAllEmployeeAttendence)


module.exports = router;