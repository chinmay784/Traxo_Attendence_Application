const express = require("express");
const { punchInEmployee, punchOutEmployee, fetchAllEmployeeAttendence } = require("../controllers/EmployeeAttendenceController");
const router = express.Router();

router.post("/punchInEmployee",punchInEmployee);
router.post("/punchOutEmployee",punchOutEmployee);
router.post("/fetchAllEmployeeAttendence",fetchAllEmployeeAttendence)


module.exports = router;