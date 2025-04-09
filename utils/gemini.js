import axios from "axios";

export async function getGeminiResponse(query) {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  const requestData = {
    contents: [
      {
        parts: [{ text: query }],
      },
    ],
  };
  requestData.contents[0].parts[0].text = `You are an AI assistant for an app focused on river pollution, solutions, and government initiatives in India. Please keep answers concise and relevant.\n\nUser Query: ${requestData.contents[0].parts[0].text}`;

  try {
    const response = await axios.post(url, requestData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data.candidates[0];
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}
