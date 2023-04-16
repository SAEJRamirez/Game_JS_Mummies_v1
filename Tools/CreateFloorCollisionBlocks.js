import {floorCollision} from "../data/CollisionsBlocks.js";
import {CollisionBlock} from "../Classes/CollisionBlock.js";

const floorCollision2D = []
export const floorCollisionBlocks = []

for (let i = 0; i < floorCollision.length; i += 200) {
    floorCollision2D.push(floorCollision.slice(i, i + 200))
}
floorCollision2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol !== 0) {
            floorCollisionBlocks.push(new CollisionBlock({
                position: {
                    x: x * 64,
                    y: y * 64
                }
            }))
        }
    })
})