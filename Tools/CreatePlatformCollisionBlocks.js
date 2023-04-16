import {platformeCollision} from "../data/CollisionsBlocks.js";
import {PlatformCollisionBlock} from "../Classes/PlatformCollisionBlock.js";

const platformCollision2D = []
export const platformCollisionBlocks = []

for (let i = 0; i < platformeCollision.length; i += 200) {
    platformCollision2D.push(platformeCollision.slice(i, i + 200))
}
platformCollision2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol !== 0) {
            platformCollisionBlocks.push(new PlatformCollisionBlock({
                position: {
                    x: x * 64,
                    y: (y * 64) + 40
                }
            }))
        }
    })
})