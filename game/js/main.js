
import { Player } from "./player.js";
import { Item } from "./items.js";
import { UI } from "./ui.js";

const canvas = document.getElementById("game-canvas");

const ctx = canvas.getContext("2d");

const player = new Player(canvas);

const ui = new UI();

let items = [];

let score = 0;

let lives = 3;

let level = 1;

let gameRunning = false;

let animationId = null;

let lastSpawn = 0;

let playerName = "Player";

// Load personal record
let personalRecord = Number(
    localStorage.getItem("personalRecord") || 0
);

ui.updateRecord(personalRecord);

// Buttons
document.getElementById("start-button")
    .addEventListener("click", startGame);

document.getElementById("restart-button")
    .addEventListener("click", startGame);


// Keyboard controls
document.addEventListener("keydown", (event) => {

    if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") {

        player.left = true;
    }

    if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") {

        player.right = true;
    }
});


document.addEventListener("keyup", (event) => {

    if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") {

        player.left = false;
    }

    if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") {

        player.right = false;
    }
});


// Start game
function startGame() {

    playerName = document.getElementById("player-name").value.trim();

    if (!playerName) {
        playerName = "Player";
    }

    score = 0;

    lives = 3;

    level = 1;

    items = [];

    lastSpawn = 0;

    player.reset();

    if (animationId !== null) {
        cancelAnimationFrame(animationId);
    }

    gameRunning = true;

    ui.showGame();

    ui.updateHUD(score, lives, level);

    gameLoop(0);
}


// Create falling objects
function spawnItem() {

    items.push(new Item(canvas, level));
}


// Main game loop
function gameLoop(timestamp) {

    if (!gameRunning) {
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    player.move();

    player.draw(ctx);

    // Create new objects
    if (timestamp - lastSpawn > Math.max(300, 1000 - level * 100)) {

        spawnItem();

        lastSpawn = timestamp;
    }

    // Update every object
    for (let i = items.length - 1; i >= 0; i--) {

        const item = items[i];

        item.update();

        item.draw(ctx);

        // Check collision
        if (item.isCaught(player)) {

            if (item.type === "pepper") {

                lives--;

            } else {

                score += item.points;
            }

            items.splice(i, 1);

            // Increase level every 200 points
            level = Math.floor(score / 200) + 1;

            ui.updateHUD(score, lives, level);

            if (lives <= 0) {

                endGame();

                return;
            }

            continue;
        }

        // Remove objects outside the canvas
        if (item.isOutside()) {

            items.splice(i, 1);
        }
    }

    animationId = requestAnimationFrame(gameLoop);
}


// End game
function endGame() {

    gameRunning = false;

    if (score > personalRecord) {

        personalRecord = score;

        localStorage.setItem("personalRecord", personalRecord);

        ui.updateRecord(personalRecord);
    }

    ui.showGameOver(score);
}
