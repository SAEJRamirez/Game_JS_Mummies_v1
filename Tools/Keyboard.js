import {player} from "../init.js";
//Fonction pour écouter les événements liés à l'utilisateur
//Prend en paramètre les touches et le joueur provenant d'index.js
export function keyboardListener(keys) {
    //Ecoute des touches pressées par l'utilisateur
    window.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'a':
                keys.a.pressed = true
                break
            case 'd':
                keys.d.pressed = true
                break
            case 'w':
                if (!player.jump && !player.dead) {
                    player.jump = true
                    player.velocity.y -= 16.5
                }
                break
        }
    })

//Ecoute des touches relâchées par l'utilisateur
    window.addEventListener('keyup', (e) => {
        switch (e.key) {
            case 'a':
                keys.a.pressed = false
                break
            case 'd':
                keys.d.pressed = false
                break
        }
    })
}
