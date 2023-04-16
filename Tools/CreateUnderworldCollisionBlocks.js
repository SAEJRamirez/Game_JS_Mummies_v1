import {underWorldCollision} from "../data/CollisionsBlocks.js";
import {CollisionBlock} from "../Classes/CollisionBlock.js";

const underworldCollision2D = []
export const underworldCollisionBlocks = []

for (let i = 0; i < underWorldCollision.length; i += 200) {
    underworldCollision2D.push(underWorldCollision.slice(i, i + 200))
}
underworldCollision2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol !== 0) {
            underworldCollisionBlocks.push(new CollisionBlock({
                position: {
                    x: x * 64,
                    y: (y * 64) + 62
                }
            }))
        }
    })
})