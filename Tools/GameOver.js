import {initGame, player, scoreboard} from "../init.js";

let menuModal = document.querySelector('.menu-end-game')
let menuModalTitle = document.getElementById('end-game-title')
let menuModalText = document.getElementById('end-game-text')
let btn = document.getElementById('end-game-restart')

export function gameOver() {
    //Contrôle si le joueur a atteint la fin du niveau avec le bon score
    if (player.position.x >= 12550 && scoreboard.score >= 10) {
        menuModal.style.display = 'flex'
        menuModalTitle.textContent = 'Vous êtes puissant !'
        menuModalText.textContent = "Félicitations ! Vous avez vaincu les viles momies et autres créatures volantes et rampantes. Vous avez même ramené le fric ! On aime les aventuriers comme vous ici."
        btn.textContent = "Recommencer"
        btn.onclick = () => {
            menuModal.style.display = 'none'
            initGame()
        }
    }

    //Contrôle si le joueur n'a pas atteint le bon score à la fin du niveau
    if (player.position.x >= 12550 && scoreboard.score <= 100) {
        menuModal.style.display = 'flex'
        menuModalTitle.textContent = 'Vous êtes si nul !'
        menuModalText.textContent = "Les pièces dispersées dans le niveau ne sont pas là pour faire joli... Les ennemis non plus d'ailleurs ! Le score semble être un bon indice de ce qu'il faut faire non ?"
        btn.textContent = "Recommencer"
        btn.onclick = () => {
            menuModal.style.display = 'none'
            initGame()
        }
    }
}