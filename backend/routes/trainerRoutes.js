const express = require("express");

const {
    getTrainers,
    getTrainerAvailability
} = require("../controllers/trainerController");

const router = express.Router();

router.get("/", getTrainers);

router.get("/:id/availability", getTrainerAvailability);

module.exports = router;