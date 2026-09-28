const express = require("express");

const cors = require("cors");

const db = require("./config/db");

const userRoutes = require("./routes/userRoutes");

const availabilityRoutes = require("./routes/availabilityRoutes");

const attendanceRoutes = require("./routes/attendanceRoutes");

const workoutRoutes = require("./routes/workoutRoutes");

const membershipRoutes = require("./routes/membershipRoutes");

const trainerRoutes = require("./routes/trainerRoutes");

const progressRoutes = require("./routes/progressRoutes");

const aiRoutes = require("./routes/aiRoutes");

const dietRoutes = require("./routes/dietRoutes");

const templateRoutes = require("./routes/templatesRoutes");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/users", userRoutes);

app.use("/api/availability", availabilityRoutes);

app.use("/api/attendance", attendanceRoutes);

app.use("/api/workouts", workoutRoutes);

app.use("/api/membership", membershipRoutes);

app.use("/api/trainers", trainerRoutes);

app.use("/api/progress", progressRoutes);

app.use("/api/ai", aiRoutes);

app.use("/api/diet", dietRoutes);

app.use("/api/templates", templateRoutes);

app.get("/", (req, res) => {
  res.send("QuietFit Backend is running!");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`QuietFit server running on http://localhost:${PORT}`);
});