const express = require("express");
const protect = require("../middleware/authMiddleware");

const {
    getMembership
} = require("../controllers/membershipController");

const router = express.Router();

router.get("/", protect, getMembership);

module.exports = router;