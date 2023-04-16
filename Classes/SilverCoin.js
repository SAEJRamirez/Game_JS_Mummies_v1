import {Sprite} from "./Sprite.js";

export class SilverCoin extends Sprite {
    constructor({position, imgSrc = "../Images/Coins/SilveCoin.png", frameRate = 12, frameBuffer = 5, scale = 0.5}) {
        super({imgSrc, frameRate, frameBuffer, scale});
        this.position = position
    }
}