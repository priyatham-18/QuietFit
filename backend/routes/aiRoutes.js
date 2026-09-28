const express = require("express");
const { generateAIResponse } = require("../services/aiService");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        message: "Prompt is required",
      });
    }

    const response = await generateAIResponse(prompt);

    res.json({
      success: true,
      response,
    });
  } catch (error) {
    console.error("AI Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to generate AI response",
    });
  }
});

module.exports = router;