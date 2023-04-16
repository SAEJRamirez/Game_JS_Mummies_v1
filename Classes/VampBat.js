import {Sprite} from "./Sprite.js";

export class VampBat extends Sprite {
    constructor({position, imgSrc = "../Images/enemies/vampBat/walk.png", frameRate = 18, scale = 0.4, distance}) {
        super({imgSrc, frameRate, scale});

        this.position = position
        this.velocity = {
            x: 0.7,
            y: 0
        }
        this.distance = {
            limit: distance.limit,
            traveled: distance.traveled,
            direction: distance.direction
        }
        this.animations = {
            walk: {
                imgSrc: "../Images/enemies/vampBat/walk.png",
                frameRate: 18,
                frameBuffer: 3
            },
            leftWalk: {
                imgSrc: "../Images/enemies/vampBat/leftWalk.png",
                frameRate: 18,
                frameBuffer: 3
            }
        }

        //Création de l'image et du frameBuffer pour l'animation
        for (let key in this.animations) {
            const image = new Image()
            image.src = this.animations[key].imgSrc
            this.animations[key].image = image
            this.frameBuffer = this.animations[key].frameBuffer
        }
    }
    //Méthode pour changer le sprite de l'ennemi
    switchSprite(key) {
        if (this.image === this.animations[key].image || !this.loaded ) return
        this.currentFrame = 0;
        this.image = this.animations[key].image
        this.frameBuffer = this.animations[key].frameBuffer
        this.frameRate = this.animations[key].frameRate
    }

    //Méthode pour gérer les déplacements de l'ennemi selon une distance prédéfinie
    move() {
        this.distance.direction === 'left' ? this.position.x -= this.velocity.x : this.position.x += this.velocity.x
        this.distance.traveled += Math.abs(this.velocity.x)
        if (this.distance.traveled > this.distance.limit) {
            this.distance.traveled = 0
            this.velocity.x = -this.velocity.x
        }

        if (this.distance.direction === "right") {
            if (this.velocity.x < 0) {
                this.switchSprite("leftWalk")
            } else {
                this.switchSprite('walk')
            }
        } else if (this.distance.direction === "left") {
            if (this.velocity.x < 0) {
                this.switchSprite("walk")
            } else {
                this.switchSprite("leftWalk")
            }
        }
    }

    //Méthode pour dessiner notre ennemi
    update() {
        this.updateFrames()
        this.draw()
        this.move()
    }
}