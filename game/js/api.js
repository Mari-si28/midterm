
const statusElement = document.getElementById("connection-status");


// Check leaderboard connection
export async function checkHealth() {

    try {

        const response = await fetch("/api/health");

        if (!response.ok) {
            throw new Error("Server unavailable");
        }

        statusElement.textContent = "Leaderboard: Online";

        statusElement.className = "online";

        return true;

    } catch (error) {

        statusElement.textContent = "Leaderboard: Offline";

        statusElement.className = "offline";

        return false;
    }
}


// Get top 10 scores
export async function getScores() {

    try {

        const response = await fetch("/api/scores");

        if (!response.ok) {
            throw new Error("Cannot get scores");
        }

        return await response.json();

    } catch (error) {

        return null;
    }
}


// Send player's score to server
export async function saveScore(name, score) {

    try {

        const response = await fetch("/api/scores", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name: name,
                score: score
            })

        });

        return response.ok;

    } catch (error) {

        return false;
    }
}
