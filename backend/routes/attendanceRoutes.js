const express = require("express");
const protect = require("../middleware/authMiddleware");

const {
    checkIn,
    checkOut
} = require("../controllers/attendanceController");

const router = express.Router();

router.post("/check-in", protect, checkIn);
router.post("/check-out", protect, checkOut);

module.exports = router;