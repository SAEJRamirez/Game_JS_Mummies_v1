import {ctx} from "../index.js";

export class Scoreboard {
    constructor({score = 0, position}) {
        this.score = score
        this.position = position
    }

    draw() {
        ctx.font = "bold 18px Arial"
        ctx.fillStyle = "black"
        ctx.fillText(`Score: ${this.score}`, this.position.x, this.position.y)
    }

    update() {
        this.draw()
    }
}