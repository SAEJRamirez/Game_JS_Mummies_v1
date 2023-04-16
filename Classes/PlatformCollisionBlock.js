import {ctx} from "../index.js";

export class PlatformCollisionBlock {
    constructor({position}) {
        this.position = position
        this.width = 64
        this.height =  22
    }

    draw() {
        ctx.fillStyle = "rgba(179,37,37,0)"
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw()
    }
}