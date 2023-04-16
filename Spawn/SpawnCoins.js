import {coins} from "../init.js";
import {SilverCoin} from "../Classes/SilverCoin.js";

export function spawnCoins() {
    coins.push(
        new SilverCoin({
            position: {
                x: 560,
                y: 250
            }
        }),
        new SilverCoin({
            position: {
                x: 1020,
                y: 250
            }
        }),
        new SilverCoin({
            position: {
                x: 1320,
                y: 150
            }
        }),
        new SilverCoin({
            position: {
                x: 1615,
                y: 350
            }
        }),
        new SilverCoin({
            position: {
                x: 1800,
                y: 180
            }
        }),
        new SilverCoin({
            position: {
                x: 2000,
                y: 180
            }
        }),
        new SilverCoin({
            position: {
                x: 2160,
                y: 480
            }
        }),
        new SilverCoin({
            position: {
                x: 2200,
                y: 180
            }
        }),
        new SilverCoin({
            position: {
                x: 2705,
                y: 280
            }
        }),
    )
}