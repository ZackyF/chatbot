// server.js
const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.get("/api/respond", (req, res) => {
    const userQuery = req.query.q;

    if (!userQuery) {
        return res.status(400).json({ answer: "Question cannot be empty." });
    }

    fs.readFile(path.join(__dirname, "responses", "answers.json"), "utf-8", (err, data) => {
        if (err) {
            console.error("Failed to read file JSON:", err);
            return res.status(500).json({ answer: "Error found while finding answer." });
        }

        let responses;
        try {
            responses = JSON.parse(data);
        } catch (parseErr) {
            console.error("Failed to parsing JSON:", parseErr);
            return res.status(500).json({ answer: "Answer is not valid." });
        }

        const normalizedQuery = userQuery.trim().toLowerCase();
        const answer = responses[normalizedQuery] || "Sorry, we didn't have the answer yet.";
        res.json({ answer });
    });
});
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
