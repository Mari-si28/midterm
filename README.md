
# Khinkali Storm 🥟

Khinkali Storm is a browser-based game created using HTML, CSS and Vanilla JavaScript.

## Game Description

The player controls a plate and catches falling khinkali while avoiding spicy peppers.

## Game Rules

- Normal Khinkali: +10 points
- Golden Khinkali: +50 points
- Spicy Pepper: -1 life
- Starting lives: 3
- Every 200 points increases the level.

## Technologies

- HTML
- CSS
- Vanilla JavaScript
- Node.js
- Express
- Docker
- Docker Compose
- Nginx

## Project Structure

- game/ - Browser game
- leaderboard/ - Leaderboard microservice
- docker-compose.yml - Container configuration

## Run the Project

Run:

docker compose up -d --build

Open:

http://localhost:8080

## API Endpoints

GET /api/health

GET /api/scores

POST /api/scores

## Docker Containers

- khinkali-game
- khinkali-leaderboard

Both containers communicate through khinkali-net.

Leaderboard results are stored in the leaderboard-data volume.
