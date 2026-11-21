
export class Item {

    constructor(canvas, level) {

        this.canvas = canvas;

        const random = Math.random();

        if (random < 0.10) {

            this.type = "golden";
            this.emoji = "🌟";
            this.points = 50;
            this.speed = 4 + level;

        } else if (random < 0.35) {

            this.type = "pepper";
            this.emoji = "🌶️";
            this.points = 0;
            this.speed = 3 + level;

        } else {

            this.type = "khinkali";
            this.emoji = "🥟";
            this.points = 10;
            this.speed = 3 + level;

        }

        this.x = Math.random() * (canvas.width - 40);

        this.y = -40;

        this.size = 35;
    }

    update() {

        this.y += this.speed;
    }

    draw(ctx) {

        ctx.font = "30px Arial";

        ctx.fillText(this.emoji, this.x, this.y + 30);
    }

    isCaught(player) {

        return (
            this.x + this.size > player.x &&
            this.x < player.x + player.width &&
            this.y + this.size > player.y &&
            this.y < player.y + player.height
        );
    }

    isOutside() {

        return this.y > this.canvas.height;
    }
}
