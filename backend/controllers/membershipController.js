const db = require("../config/db");

const getMembership = async (req, res) => {
    try {
        const userId = req.user.id;

        const [memberships] = await db.promise().query(
            `SELECT 
                id,
                membership_type,
                start_date,
                end_date,
                status,
                created_at
             FROM memberships
             WHERE user_id = ?
             ORDER BY end_date DESC
             LIMIT 1`,
            [userId]
        );

        if (memberships.length === 0) {
            return res.status(404).json({
                message: "No membership found"
            });
        }

        res.status(200).json({
            membership: memberships[0]
        });

    } catch (error) {
        console.error("Membership fetch error:", error);

        res.status(500).json({
            message: "Unable to fetch membership"
        });
    }
};

module.exports = {
    getMembership
};