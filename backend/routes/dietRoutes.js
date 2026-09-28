const express = require("express");
const protect = require("../middleware/authMiddleware");

const {
    getDietPlan
} = require("../controllers/dietController");

const router = express.Router();

router.get("/", protect, getDietPlan);

module.exports = router;