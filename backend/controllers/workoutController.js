const db = require("../config/db");

const getWorkouts = async (req, res) => {
    try {
        const [workouts] = await db.promise().query(
            `SELECT 
                id,
                name,
                description,
                difficulty,
                duration_minutes,
                calories_burned
             FROM workouts
             ORDER BY id ASC`
        );

        res.status(200).json({
            workouts
        });

    } catch (error) {
        console.error("Workout fetch error:", error);

        res.status(500).json({
            message: "Unable to fetch workouts"
        });
    }
};

const getWorkoutById = async (req, res) => {
    try {
        const workoutId = req.params.id;

        const [workouts] = await db.promise().query(
            `SELECT 
                id,
                name,
                description,
                difficulty,
                duration_minutes,
                calories_burned
             FROM workouts
             WHERE id = ?`,
            [workoutId]
        );

        if (workouts.length === 0) {
            return res.status(404).json({
                message: "Workout not found"
            });
        }

        res.status(200).json({
            workout: workouts[0]
        });

    } catch (error) {
        console.error("Workout fetch error:", error);

        res.status(500).json({
            message: "Unable to fetch workout"
        });
    }
};

module.exports = {
    getWorkouts,
    getWorkoutById
};