import {initGame} from "../init.js";

export function deadPlayer(player, key) {
    switch (key) {
        case "fall":
            if (player.lastDirection === 'right') {
                player.switchSprite('die')
            } else {
                player.switchSprite('leftDie')
            }
            setTimeout(() => {
                initGame()
            },1000)
            break
    }
}