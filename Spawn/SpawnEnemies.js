import {enemies} from "../init.js";
import {Wormy} from "../Classes/Wormy.js";
import {VampBat} from "../Classes/VampBat.js";
import {Mummy} from "../Classes/Mummy.js";
import {Skeleton} from "../Classes/Skeleton.js";

function spawnWormy() {
    enemies.push(
        new Wormy({
            position: {
                x: 1800,
                y: 180
            },
            distance: {
                limit: 150,
                traveled: 0,
                direction: "left"
            }
        }),
        new Wormy({
            position: {
                x: 2100,
                y: 180
            },
            distance: {
                limit: 150,
                traveled: 0,
                direction: "right"
            }
        }),
    )
}

function spawnVampBat() {
    enemies.push(
        new VampBat({
            position: {
                x: 2050,
                y: 430,
            },
            distance: {
                limit: 150,
                traveled: 0,
                direction: "left"
            }
        })
    )
}

function spawnMummy() {
    enemies.push(
        new Mummy({
            position: {
                x: 700,
                y: 390
            },
            distance: {
                limit: 150,
                traveled: 0,
                direction: "right"
            }
        }),
        new Mummy({
            position: {
                x: 1400,
                y: 300
            },
            distance: {
                limit: 200,
                traveled: 0,
                direction: "left"
            }
        }),
        new Mummy({
            position: {
                x: 3145,
                y: 150
            },
            distance: {
                limit: 40,
                traveled: 0,
                direction: "left"
            },
        }),
    )
}

function spawnSkeleton() {
    enemies.push(
        new Skeleton({
            position: {
                x: 3200,
                y: 300
            },
            distance: {
                limit: 200,
                traveled: 0,
                direction: "right"
            }
        })
    )
}

export function spawnEnemies() {
    spawnWormy()
    spawnVampBat()
    spawnMummy()
    spawnSkeleton()
}