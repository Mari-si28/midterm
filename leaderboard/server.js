
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

const PORT = 3000;

const dataDirectory = "/data";

const dataFile = path.join(dataDirectory, "scores.json");

app.use(express.json());


// Create data folder if it does not exist
if (!fs.existsSync(dataDirectory)) {

    fs.mkdirSync(dataDirectory, { recursive: true });
}


// Create scores file if it does not exist
if (!fs.existsSync(dataFile)) {

    fs.writeFileSync(dataFile, "[]");
}


// Read scores from file
function readScores() {

    try {

        return JSON.parse(fs.readFileSync(dataFile, "utf8"));

    } catch (error) {

        return [];
    }
}


// Save scores to file
function saveScores(scores) {

    fs.writeFileSync(dataFile, JSON.stringify(scores, null, 2));
}


// 1. Health endpoint
app.get("/api/health", (req, res) => {

    res.status(200).json({
        status: "ok"
    });
});


// 2. Get top 10 scores
app.get("/api/scores", (req, res) => {

    const scores = readScores();

    scores.sort((a, b) => b.score - a.score);

    res.json(scores.slice(0, 10));
});


// 3. Save new score
app.post("/api/scores", (req, res) => {

    const { name, score } = req.body;

    if (
        typeof name !== "string" ||
        name.trim() === "" ||
        typeof score !== "number" ||
        !Number.isFinite(score)
    ) {

        return res.status(400).json({
            error: "Invalid name or score"
        });
    }

    const scores = readScores();

    scores.push({
        name: name.trim(),
        score: score
    });

    saveScores(scores);

    res.status(201).json({
        message: "Score saved successfully"
    });
});


// Start server
app.listen(PORT, "0.0.0.0", () => {

    console.log("Leaderboard running on port " + PORT);

});
