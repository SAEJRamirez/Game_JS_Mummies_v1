//Imports
import {initGame, player, bgMap, map, camera, enemies, deathSprites, coins} from "./init.js";
import {keyboardListener} from "./Tools/Keyboard.js";
import {floorCollisionBlocks} from "./Tools/CreateFloorCollisionBlocks.js";
import {platformCollisionBlocks} from "./Tools/CreatePlatformCollisionBlocks.js";
import {underworldCollisionBlocks} from "./Tools/CreateUnderworldCollisionBlocks.js";
import {gameOver} from "./Tools/GameOver.js";

//Récupérer l'élément DOM Canvas
export const canvas = document.getElementById('game-canvas')
//Appliquer le contexte 2d au canvas
export const ctx = canvas.getContext('2d')

//Object utilisé pour réagir au événement "keydown" et "keyup"
const keys = {
    d: {
        pressed: false
    },
    a: {
        pressed: false
    }
}

//Appel des événements d'écoute en leur passant les keys
keyboardListener(keys)

//Première initialisation du jeu
initGame()
//Fonction de création de la boucle du jeu
function animate() {
    //Boucle du jeu (tourne indéfiniment afin de créer les mouvements et les animations)
    requestAnimationFrame(animate)

    //Efface le canvas à chaque frame
    ctx.clearRect(0,0, canvas.width, canvas.height)

    ctx.save()
    ctx.translate(camera.position.x, 0)
    //Méthode pour dessiner le bg (créée dans la classe Background)
    bgMap.update()
    //Méthode pour dessiner la carte (créée dans la classe Background)
    map.update()

    //Création des blocs de collisions pour le sol et les murs
    floorCollisionBlocks.forEach(block => {
        block.update()
    })
    //Création des blocs de collision pour les plateformes
    platformCollisionBlocks.forEach(platform => {
        platform.update()
    })
    //Création des blocs de collision lorsque le joueur tombe dans l'eau ou les piques
    underworldCollisionBlocks.forEach(block => {
        block.update()
    })

    //Méthode pour dessiner les pièces
    coins.forEach(coin => {
        coin.update()
    })

    //Méthode pour dessiner les ennemis en jeu
    enemies.forEach(enemy => {
        enemy.update()
    })

    //Empêche le joueur de tomber lorsqu'il touche le bord du canvas
    player.checkForWorldBorder()

    //Méthode pour dessiner le player (créée dans la classe Player)
    player.update()

    //Méthode pour dessiner les animations de mort d'ennemis
    deathSprites.forEach(death => {
        death.update()
    })


    //Mouvements du player (utilise l'objet "keys" et les écoutes d'événements)
    if (keys.d.pressed && !player.dead) {
        player.switchSprite('run')
        player.velocity.x = 8
        player.lastDirection = 'right'
        player.cameraMoveToLeft({camera})
    } else if (keys.a.pressed  && !player.dead) {
        player.switchSprite('leftRun')
        player.velocity.x = -8
        player.lastDirection = 'left'
        player.cameraMoveToRight({camera})
    } else {
        player.velocity.x = 0
        if (player.lastDirection === 'right' && !player.dead) {
            player.switchSprite('idle')
        } else if(!player.dead) {
            player.switchSprite('leftIdle')
        }
    }
    if(player.velocity.y < 0) {
        if (player.lastDirection === 'right') {
            player.switchSprite('jump')
        } else {
            player.switchSprite('leftJump')
        }
    } else if (player.velocity.y > 0) {
        if (player.lastDirection === "right") {
            player.switchSprite('fall')
        } else {
            player.switchSprite('leftFall')
        }
    }
    ctx.restore()

    //Méthode pour contrôler la victoire ou la défaite du joueur
    gameOver()
}
animate()