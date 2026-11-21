
export class Player {

    constructor(canvas) {

        this.canvas = canvas;

        this.width = 100;
        this.height = 30;

        this.x = canvas.width / 2 - this.width / 2;
        this.y = canvas.height - 55;

        this.speed = 7;

        this.left = false;
        this.right = false;
    }

    move() {

        if (this.left && this.x > 0) {
            this.x -= this.speed;
        }

        if (this.right && this.x + this.width < this.canvas.width) {
            this.x += this.speed;
        }
    }

    draw(ctx) {

        // Draw the plate
        ctx.fillStyle = "#ffffff";

        ctx.beginPath();

        ctx.ellipse(
            this.x + this.width / 2,
            this.y + 15,
            this.width / 2,
            15,
            0,
            0,
            Math.PI * 2
        );

        ctx.fill();

        // Draw the plate border
        ctx.strokeStyle = "#d28b35";
        ctx.lineWidth = 3;
        ctx.stroke();
    }

    reset() {

        this.x = this.canvas.width / 2 - this.width / 2;

        this.left = false;
        this.right = false;
    }
}
