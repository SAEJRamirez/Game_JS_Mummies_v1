import {Player} from "./Classes/Player.js";
import {Background} from "./Classes/Background.js";
import {spawnEnemies} from "./Spawn/SpawnEnemies.js";
import {Scoreboard} from "./Classes/Scoreboard.js";
import {spawnCoins} from "./Spawn/SpawnCoins.js";

export let gravity = null
export let player = null
export let camera = null
export let bgMap = null
export let map = null
export let enemies = []
export let coins = []
export let deathSprites = []
export let scoreboard = null

function initPlayer() {
    player = new Player({
            position: {
                x: 0,
                y: 280
            },
            imgSrc: "./Images/hero/idle/idleAnubis.png",
            frameRate: 18,
            animations: {
                idle: {
                    imgSrc: "./Images/hero/idle/idleAnubis.png",
                    frameRate: 18,
                    frameBuffer: 3
                },
                leftIdle: {
                    imgSrc: "./Images/hero/idle/LeftIdleAnubis.png",
                    frameRate: 18,
                    frameBuffer: 3
                },
                run: {
                    imgSrc: "./Images/hero/run/runAnubis.png",
                    frameRate: 12,
                    frameBuffer: 3
                },
                leftRun: {
                    imgSrc: "./Images/hero/run/leftRunAnubis.png",
                    frameRate: 12,
                    frameBuffer: 3,
                },
                jump: {
                    imgSrc: "./Images/hero/jump/JumpAnubis.png",
                    frameRate: 6,
                    frameBuffer: 2
                },
                leftJump: {
                    imgSrc: "./Images/hero/jump/leftJumpAnubis.png",
                    frameRate: 6,
                    frameBuffer: 2
                },
                fall: {
                    imgSrc: "./Images/hero/fall/FallingAnubis.png",
                    frameRate: 6,
                    frameBuffer: 3
                },
                leftFall: {
                    imgSrc: "./Images/hero/fall/LeftFallingAnubis.png",
                    frameRate: 6,
                    frameBuffer: 3
                },
                die: {
                    imgSrc: "./Images/hero/die/DyingAnubis.png",
                    frameRate: 15,
                    frameBuffer: 3,
                },
                leftDie: {
                    imgSrc: "./Images/hero/die/leftDyingAnubis.png",
                    frameRate: 15,
                    frameBuffer: 3,
                }
            }
    })
}
function initMap() {
    //Initialisation du background
    bgMap = new Background({
        position: {
            x: 0,
            y: 0,
        },
        imgSrc: "./Images/mapBg.png",
    })
    //Initialisation de la map
    map = new Background({
        position: {
            x: 0,
            y: 0,
        },
        imgSrc: "./Images/mapMummies.png"
    })
    //Initialisation du score
    scoreboard = new Scoreboard({
        score: 0,
        position: {
            x: 1180,
            y: 20
        }
    })
}
function initCamera() {
    camera = {
        position: {
            x: 0,
            y: 0
        }
    }
}
export function initGame() {
    gravity = 0.8
    enemies = []
    coins = []
    deathSprites = []
    initMap()
    initCamera()
    initPlayer()
    spawnEnemies()
    spawnCoins()
}
