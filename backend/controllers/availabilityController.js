const db = require("../config/db");

const getAvailability = async (req, res) => {
    try {
        // Get gym capacity
        const [capacityRows] = await db.promise().query(
            "SELECT max_capacity FROM gym_capacity ORDER BY id DESC LIMIT 1"
        );

        if (capacityRows.length === 0) {
            return res.status(404).json({
                message: "Gym capacity has not been configured yet"
            });
        }

        const maxCapacity = capacityRows[0].max_capacity;

        // Count members currently inside the gym
        const [attendanceRows] = await db.promise().query(
            "SELECT COUNT(*) AS current_occupancy FROM attendance WHERE check_out IS NULL"
        );

        const currentOccupancy = attendanceRows[0].current_occupancy;

        const availableSpots = Math.max(
            maxCapacity - currentOccupancy,
            0
        );

        const occupancyPercentage =
            maxCapacity > 0
                ? Number(((currentOccupancy / maxCapacity) * 100).toFixed(2))
                : 0;

        let status;

        if (occupancyPercentage >= 90) {
            status = "full";
        } else if (occupancyPercentage >= 70) {
            status = "busy";
        } else if (occupancyPercentage >= 40) {
            status = "moderate";
        } else {
            status = "quiet";
        }

        res.status(200).json({
            maxCapacity,
            currentOccupancy,
            availableSpots,
            occupancyPercentage,
            status
        });

    } catch (error) {
        console.error("Availability error:", error);

        res.status(500).json({
            message: "Unable to fetch gym availability"
        });
    }
};

module.exports = {
    getAvailability
};