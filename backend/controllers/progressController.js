const db = require("../config/db");

const getProgress = async (req, res) => {
    try {
        const memberId = req.user.id;

        const [progress] = await db.promise().query(
            `SELECT
                id,
                weight,
                body_fat,
                bmi,
                waist_cm,
                chest_cm,
                workout_score,
                recorded_at
             FROM progress
             WHERE member_id = ?
             ORDER BY recorded_at DESC`,
            [memberId]
        );

        res.status(200).json({
            progress
        });

    } catch (error) {
        console.error("Progress fetch error:", error);

        res.status(500).json({
            message: "Unable to fetch progress"
        });
    }
};

module.exports = {
    getProgress
};