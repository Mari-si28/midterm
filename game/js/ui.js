
export class UI {

    constructor() {

        this.menu = document.getElementById("menu-screen");

        this.game = document.getElementById("game-screen");

        this.gameOver = document.getElementById("game-over-screen");
    }

    showMenu() {

        this.menu.classList.remove("hidden");

        this.game.classList.add("hidden");

        this.gameOver.classList.add("hidden");
    }

    showGame() {

        this.menu.classList.add("hidden");

        this.game.classList.remove("hidden");

        this.gameOver.classList.add("hidden");
    }

    showGameOver(score) {

        this.menu.classList.add("hidden");

        this.game.classList.add("hidden");

        this.gameOver.classList.remove("hidden");

        document.getElementById("final-score").textContent = score;
    }

    updateHUD(score, lives, level) {

        document.getElementById("score").textContent = score;

        document.getElementById("lives").textContent = lives;

        document.getElementById("level").textContent = level;
    }

    updateRecord(record) {

        document.getElementById("personal-record").textContent =
            "Personal Record: " + record;
    }

    showLeaderboard(elementId, scores) {

        const list = document.getElementById(elementId);

        list.innerHTML = "";

        scores.forEach((item) => {

            const li = document.createElement("li");

            li.textContent = item.name + " - " + item.score;

            list.appendChild(li);
        });
    }

    showLeaderboardUnavailable(elementId) {

        const list = document.getElementById(elementId);

        list.textContent = "Leaderboard temporarily unavailable";
    }
}
