const db = require("../config/db");

const getDietPlan = async (req, res) => {
    try {
        const memberId = req.user.id;

        const [plans] = await db.promise().query(
            `SELECT
                id,
                plan_name,
                daily_calories,
                protein_grams,
                carbs_grams,
                fats_grams,
                dietary_preference,
                description,
                created_at
             FROM diet_plans
             WHERE member_id = ?
             ORDER BY created_at DESC
             LIMIT 1`,
            [memberId]
        );

        if (plans.length === 0) {
            return res.status(404).json({
                message: "No diet plan found"
            });
        }

        res.status(200).json({
            dietPlan: plans[0]
        });

    } catch (error) {
        console.error("Diet plan error:", error);

        res.status(500).json({
            message: "Unable to fetch diet plan"
        });
    }
};

module.exports = {
    getDietPlan
};