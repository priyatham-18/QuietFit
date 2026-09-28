const db = require("../config/db");

const checkIn = async (req, res) => {
    try {
        const userId = req.user.id;

        // Check if the member is already inside
        const [existing] = await db.promise().query(
            "SELECT id FROM attendance WHERE user_id = ? AND check_out IS NULL",
            [userId]
        );

        if (existing.length > 0) {
            return res.status(400).json({
                message: "You are already checked in"
            });
        }

        await db.promise().query(
            "INSERT INTO attendance (user_id, check_in) VALUES (?, datetime('now'))",
            [userId]
        );

        // Update current occupancy
        await db.promise().query(
            "UPDATE gym_capacity SET current_occupancy = current_occupancy + 1 ORDER BY id DESC LIMIT 1"
        );

        res.status(201).json({
            message: "Check-in successful"
        });

    } catch (error) {
        console.error("Check-in error:", error);

        res.status(500).json({
            message: "Unable to check in"
        });
    }
};

const checkOut = async (req, res) => {
    try {
        const userId = req.user.id;

        const [attendance] = await db.promise().query(
            "SELECT id FROM attendance WHERE user_id = ? AND check_out IS NULL ORDER BY check_in DESC LIMIT 1",
            [userId]
        );

        if (attendance.length === 0) {
            return res.status(400).json({
                message: "You are not currently checked in"
            });
        }

        await db.promise().query(
            "UPDATE attendance SET check_out = datetime('now') WHERE id = ?",
            [attendance[0].id]
        );

        // Update current occupancy
        await db.promise().query(
            "UPDATE gym_capacity SET current_occupancy = CASE WHEN current_occupancy - 1 > 0 THEN current_occupancy - 1 ELSE 0 END ORDER BY id DESC LIMIT 1"
        );

        res.status(200).json({
            message: "Check-out successful"
        });

    } catch (error) {
        console.error("Check-out error:", error);

        res.status(500).json({
            message: "Unable to check out"
        });
    }
};

module.exports = {
    checkIn,
    checkOut
};