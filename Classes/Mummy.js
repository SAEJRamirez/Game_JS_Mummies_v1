import {Sprite} from "./Sprite.js";
import {gravity} from "../init.js";
import {floorCollisionBlocks} from "../Tools/CreateFloorCollisionBlocks.js";
import {collisionDetection, platformCollision} from "../Tools/CollisionDetection.js";
import {platformCollisionBlocks} from "../Tools/CreatePlatformCollisionBlocks.js";

export class Mummy extends Sprite{
    //Méthode qui définit les paramètres de notre ennemi lors de son instanciation
    constructor({position, imgSrc = "../Images/enemies/mummy/leftWalk.png", frameRate = 18, scale = 0.5, distance}) {
        //Méthode appartenant à la classe parente de notre classe, qui permet de définir l'animation
        super({imgSrc, frameRate, scale});

        //Position de notre ennemi sur la carte
        this.position = position
        //Utilisé pour la vitesse de déplacement de notre ennemi
        this.velocity = {
            x: 0.7,
            y: 0
        }
        //Utilisé pour les déplacements de l'ennemi
        this.distance = {
            limit: distance.limit, //défini la limit de son déplacement
            traveled: distance.traveled, //défini le chemin parcouru
            direction: distance.direction //défini le sens du déplacement

        }
        //Défini les sprites d'animations
        this.animations = {
            walk: {
                imgSrc: "../Images/enemies/mummy/leftWalk.png",
                frameRate: 18,
                frameBuffer: 3
            },
            leftWalk: {
                imgSrc: "../Images/enemies/mummy/walk.png",
                frameRate: 18,
                frameBuffer: 3
            },
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

    //Méthode pour applique la gravité sur l'ennemi
    applyGravity() {
        this.velocity.y += gravity
        this.position.y += this.velocity.y
    }

    //Méthode pour détecter la collision entre l'ennemi et le sol de manière verticale
    checkForVerticalCollision() {
        for (let i = 0; i < floorCollisionBlocks.length; i++) {
            const collision = floorCollisionBlocks[i]
            if (collisionDetection(this, collision)) {
                if (this.velocity.y > 0) {
                    this.velocity.y = 0
                    this.position.y = collision.position.y - this.height - 0.01
                    break
                }
                if (this.velocity.y < 0) {
                    this.velocity.y = 0
                    this.position.y = collision.position.y + collision.height + 0.01
                    break
                }
            }
        }
    }

    //Méthode pour détecter les collisions entre le joueur et les plateformes
    checkForPlatformCollision() {
        for (let i = 0; i < platformCollisionBlocks.length; i++) {
            const collision = platformCollisionBlocks[i]
            if (platformCollision(this, collision)) {
                if (this.velocity.y > 0) {
                    this.velocity.y = 0
                    this.position.y = collision.position.y - this.height - 0.01
                    break
                }
            }
        }
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
                this.switchSprite("walk")
            } else {
                this.switchSprite('leftWalk')
            }
        } else if (this.distance.direction === "left") {
            if (this.velocity.x < 0) {
                this.switchSprite("leftWalk")
            } else {
                this.switchSprite("walk")
            }
        }
    }

    //Méthode pour dessiner notre ennemi
    update() {
        this.updateFrames()
        this.draw()
        this.applyGravity()
        this.checkForVerticalCollision()
        this.checkForPlatformCollision()
        this.move()
    }
}