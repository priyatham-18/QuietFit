const express = require("express");
const protect = require("../middleware/authMiddleware");
const db = require("../config/db");

const {
    registerUser,
    loginUser
} = require("../controllers/userController");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile", protect, async (req, res) => {
    try {
        const [users] = await db.promise().query(
            "SELECT id, name, email, role, created_at FROM users WHERE id = ?",
            [req.user.id]
        );

        if (users.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            user: users[0]
        });

    } catch (error) {
        console.error("Profile error:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
});

module.exports = router;