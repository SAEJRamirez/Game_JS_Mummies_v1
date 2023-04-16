import {deathSprites, enemies, scoreboard} from "../init.js";
import {Sprite} from "../Classes/Sprite.js";

export function killWormy(wormy, index) {
    enemies.splice(index, 1)
    scoreboard.score += 10
    deathSprites.push(new Sprite({
        position: {
            x: wormy.position.x,
            y: wormy.position.y
        },
        imgSrc: "../Images/enemies/death.png",
        frameBuffer: 8,
        frameRate: 8,
        scale: 0.2,
        once: true
    }))
    setTimeout(() => {
        deathSprites.splice(0,1)
    }, 800)
}