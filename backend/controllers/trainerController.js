const db = require("../config/db");

const getTrainers = async (req, res) => {
    try {
        const [trainers] = await db.promise().query(
            `SELECT 
                u.id,
                u.name,
                u.email
             FROM users u
             WHERE u.role = 'trainer'
             ORDER BY u.name ASC`
        );

        res.status(200).json({
            trainers
        });

    } catch (error) {
        console.error("Trainer fetch error:", error);

        res.status(500).json({
            message: "Unable to fetch trainers"
        });
    }
};

const getTrainerAvailability = async (req, res) => {
    try {
        const trainerId = req.params.id;

        const [availability] = await db.promise().query(
            `SELECT
                day_of_week,
                start_time,
                end_time,
                status
             FROM trainer_availability
             WHERE trainer_id = ?
             ORDER BY id ASC`,
            [trainerId]
        );

        res.status(200).json({
            trainerId,
            availability
        });

    } catch (error) {
        console.error("Trainer availability error:", error);

        res.status(500).json({
            message: "Unable to fetch trainer availability"
        });
    }
};

module.exports = {
    getTrainers,
    getTrainerAvailability
};