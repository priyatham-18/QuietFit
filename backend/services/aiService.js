const OpenAI = require("openai");

const openrouter = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

const generateAIResponse = async (prompt) => {
  if (!process.env.OPENROUTER_API_KEY) {
    throw new Error("OPENROUTER_API_KEY is not configured");
  }

  const response = await openrouter.chat.completions.create({
    model: "openai/gpt-chat-latest",
    messages: [
      {
        role: "system",
        content:
          "You are QuietFit AI, a helpful fitness assistant. Give practical, clear and safe fitness guidance. Do not diagnose medical conditions.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return response.choices[0].message.content;
};

module.exports = {
  generateAIResponse,
};