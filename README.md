
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
- JavaScript
- Docker
- Nginx

## How to Run

Open the project terminal and run:

docker build -t khinkali-game ./game

docker run -d --name khinkali-game -p 8080:80 khinkali-game

Open http://localhost:8080 in your browser.
