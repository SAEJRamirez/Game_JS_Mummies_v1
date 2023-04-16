//Imports
import {ctx, canvas} from '../index.js'
import {bgMap, coins, enemies, gravity, scoreboard} from "../init.js";
import {floorCollisionBlocks} from "../Tools/CreateFloorCollisionBlocks.js";
import {collisionDetection, platformCollision, sideEnemyCollision} from "../Tools/CollisionDetection.js";
import {platformCollisionBlocks} from "../Tools/CreatePlatformCollisionBlocks.js";
import {Sprite} from "./Sprite.js";
import {underworldCollisionBlocks} from "../Tools/CreateUnderworldCollisionBlocks.js";
import {deadPlayer} from "../Tools/PlayerDie.js";
import {killWormy} from "../Kill/KillEnemies.js";

//Classe joueur : Représente le personnage jouable par les utilisateurs (Enfant de la classe Sprite)
export class Player extends Sprite{
    //Propriétés qui permettent de construire le joueur lors de sa création
    constructor({position, imgSrc, frameRate, scale = 0.4, animations, once}) {
        //Constructeur de la classe parent (Sprite)
        super({imgSrc, frameRate, scale, once})
        //Détermine la position du joueur dans le jeu lors de sa création (axe X et Y)
        this.position = position
        //Détermine la vélocité du joueur sur l'axe X et Y
        this.velocity = {
            x: 0,
            y: 0
        }

        //Booléen utilisé pour empêcher le multiple saut
        this.jump = false

        //S'active lors de la mort du joueur
        this.dead = false

        //Caméra qui suit le joueur
        this.camera = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            width: 0,
            height: 0
        }

        //Hitbox du personnage
        this.hitbox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            width: 10,
            height: 10
        }

        //Animations
        this.animations = animations

        //Garder en mémoire la dernière direction (droite pour la première initialisation)
        this.lastDirection = 'right'

        //Créer une image pour les sprites
        for (let key in this.animations) {
            const image = new Image()
            image.src = this.animations[key].imgSrc
            this.animations[key].image = image
        }
    }

    //Méthode pour appliquer la gravité
    applyGravity() {
        //Applique la gravité au joueur s'il ne touche pas le bas du canvas
        //sinon le joueur est à la position la plus basse du canvas
        this.velocity.y += gravity;
        this.position.y += this.velocity.y
    }

    //Méthode pour détecter la collision entre le joueur et le sol de manière verticale
    checkForVerticalCollision() {
        for (let i = 0; i < floorCollisionBlocks.length; i++) {
            const collision = floorCollisionBlocks[i]
            if (collisionDetection(this.hitbox, collision)) {
                if (this.velocity.y > 0) {
                    this.velocity.y = 0
                    this.jump = false
                    const offset = this.hitbox.position.y - this.position.y + this.hitbox.height
                    this.position.y = collision.position.y - offset - 0.01
                    break
                }
                if (this.velocity.y < 0) {
                    this.velocity.y = 0
                    const offset = this.hitbox.position.y - this.position.y
                    this.position.y = collision.position.y + collision.height - offset + 0.01
                    break
                }
            }
        }
    }

    //Méthode pour détecter la collision entre le joueur et le sol de manière horizontale
    checkForHorizontalCollision() {
        for (let i = 0; i < floorCollisionBlocks.length; i++) {
            const collision = floorCollisionBlocks[i]
            if (collisionDetection(this.hitbox, collision)) {
                if (this.velocity.x > 0) {
                    this.velocity.x = 0
                    const offset = this.hitbox.position.x - this.position.x + this.hitbox.width
                    this.position.x = collision.position.x - offset - 0.01
                    break
                }
                if (this.velocity.x < 0) {
                    this.velocity.x = 0
                    const offset = this.hitbox.position.x - this.position.x
                    this.position.x = collision.position.x + collision.width - offset + 0.01
                    break
                }
            }
        }
    }

    //Méthode pour détecter les collisions entre le joueur et les plateformes
    checkForPlatformCollision() {
        for (let i = 0; i < platformCollisionBlocks.length; i++) {
            const collision = platformCollisionBlocks[i]
            if (platformCollision(this.hitbox, collision)) {
                if (this.velocity.y > 0) {
                    this.velocity.y = 0
                    this.jump = false
                    this.position.y = collision.position.y - this.height - 0.01
                    break
                }
            }
        }
    }

    //Méthode pour détecter les collisions sur l'eau et les spikes qui ne sont pas sur les plateformes
    checkForUnderworldCollision() {
        for (let i = 0; i < underworldCollisionBlocks.length; i++) {
            const collision = underworldCollisionBlocks[i]
            if (collisionDetection(this.hitbox, collision)) {
                if (this.velocity.y > 0) {
                    this.velocity.y = 0
                    this.jump = false
                    this.position.y = collision.position.y - this.height - 0.01
                    if (!this.dead) deadPlayer(this, "fall")
                    this.dead = true
                    this.once = true
                    break
                }
            }
        }
    }

    checkForEnemiesCollision() {
        for (let i = 0; i < enemies.length; i++) {
            const enemy = enemies[i]

            if (platformCollision(this.hitbox, enemy)) {
                if (this.velocity.y > 0) {
                    this.velocity.y = -13.5
                    killWormy(enemy, i)
                    break
                }
            } else if (sideEnemyCollision(this.hitbox, enemy)) {
                if (!this.dead) deadPlayer(this, "fall")
                this.dead = true
                this.once = true
                break
            }
        }
    }

    checkForCoinsCollision() {
        for (let i = 0; i < coins.length; i++) {
            const coin = coins[i]
            if (sideEnemyCollision(this.hitbox, coin)) {
                coins.splice(i, 1)
                scoreboard.score +=10
            }
        }
    }

    updateCameraBox() {
        this.camera = {
            position: {
                x: this.position.x - 475, //moitié de la taille de la caméra - moité du joueur
                y: this.position.y,
            },
            width: 1000,
            height: 180
        }
    }

    //Méthode pour faire défiler la map et le bg vers la gauche selon les mouvements du joueur
    cameraMoveToLeft({camera}) {
        const cameraBoxRightSide = this.camera.position.x + this.camera.width

        if (cameraBoxRightSide >= 12800) return

        if (cameraBoxRightSide >= canvas.width + Math.abs(camera.position.x)) {
            camera.position.x -= this.velocity.x
            bgMap.position.x += 0.8
            scoreboard.position.x += this.velocity.x
        }
    }

    //Méthode pour faire défiler la map et le bg vers la droite selon les mouvements du joueur
    cameraMoveToRight({camera}) {
        if (this.camera.position.x <= 0) return

        if (this.camera.position.x <= Math.abs(camera.position.x)) {
            camera.position.x -= this.velocity.x
            bgMap.position.x -= 0.8
            scoreboard.position.x += this.velocity.x
        }

    }

    //Empêche le joueur de tomber lorsqu'il est au bord du canvas
    checkForWorldBorder() {
        if (this.position.x + this.width + this.velocity.x >= 12800 || this.position.x + this.velocity.x <= 0) {
            this.velocity.x = 0
        }
    }

    //Mettre à jour la hitbox du joueur
    updateHitbox() {
        //Hitbox du personnage
        this.hitbox = {
            position: {
                x: this.position.x + 48,
                y: this.position.y + 60,
            },
            width: 30,
            height: 60
        }
    }

    //Méthode pour changer de sprite selon le mouvement du joueur
    switchSprite(key) {
        if (this.image === this.animations[key].image || !this.loaded) return
        this.currentFrame = 0
        this.image = this.animations[key].image
        this.frameBuffer = this.animations[key].frameBuffer
        this.frameRate = this.animations[key].frameRate
    }

    //Permet de mettre à jour le joueur (position, vélocité, etc...) dans une boucle
    update() {

        //Appel de la méthode depuis Sprite.js pour update les frames

        this.updateFrames()

        //Mettre à jour la hitbox du joueur
        this.updateHitbox()

        //Voir la taille de l'image
        ctx.fillStyle = 'rgba(0, 255, 0, 0)'
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)


        //Dessine le joueur une fois les changements de position effectués
        this.draw()

        //Voir la taille de la hitbox
        ctx.fillStyle = 'rgba(255, 0, 0, 0)'
        ctx.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height)

        //Met à jour la caméra
        this.updateCameraBox()

        //Modifie la position du joueur sur l'axe Y
        this.position.x += this.velocity.x

        //Mettre à jour la hitbox du joueur
        this.updateHitbox()

        //Contrôle s'il y a une collision horizontale
        this.checkForHorizontalCollision()

        //Applique la gravité au joueur
        this.applyGravity()

        //Mettre à jour la hitbox du joueur
        this.updateHitbox()

        //Contrôle s'il y a une collision verticale
        this.checkForVerticalCollision()

        //Méthode pour la collision entre un joueur et un ennemi
        this.checkForEnemiesCollision()

        //Contrôle s'il y a une collision dans l'eau ou les spikes au sol
        this.checkForUnderworldCollision()

        //Contrôle s'il y a une collision plateforme
        this.checkForPlatformCollision()

        //Contrôle s'il y a une collision entre le player et les pièces
        this.checkForCoinsCollision()

        //Dessine le score
        scoreboard.update()
    }

}