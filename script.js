const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

require("dotenv").config();
console.log("🔹 API Key:", process.env.GEMINI_API_KEY ? "OK ✅" : "TIDAK DITEMUKAN ❌");
const GEMINI_API_KEY = process.env.GEMINI_API_KEY; // Simpan API Key di .env

app.post("/chat", async (req, res) => {
    try {
        console.log("🔹 Request diterima:", req.body.message);

        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
            {
                contents: [{ role: "user", parts: [{ text: req.body.message }] }]
            }
        );

        console.log("✅ Response dari Google Gemini:", response.data);

        res.json({ reply: response.data.candidates[0].content.parts[0].text });
    } catch (error) {
        console.error("❌ Error:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});
