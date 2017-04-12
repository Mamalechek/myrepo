import { field, player, level, scoreField, backButton } from './values';
import { delPlayerMessage } from '../objects/player';
import { chooseOperation } from './gamestart';
import { score } from '../objects/score';

const gameOver = function (back) {
    delPlayerMessage(false);
    setTimeout((backBut) => {
        player.style.display = 'none';
        player.style.transform = `translate(0px, 0px) scale(1, 1)`;
        scoreField.style.display = 'none';
        if (!backBut) {
            const p = document.createElement('p');
            p.classList.add('level');
            p.innerHTML = 'GAME OVER';
            field.node.appendChild(p);
            p.style.font = '900 70px Kabel';
            p.style.top = `${p.offsetTop - 100}px`;
            p.style.cursor = 'default';

            const restart = document.createElement('div');
            restart.classList.add('restart');
            restart.textContent = 'Press to restart';
            field.node.appendChild(restart);
            restart.addEventListener('click', restartGame);
        } else {
            const lvl = document.querySelector('.level');
            if (lvl) {
                field.node.removeChild(lvl);
            }
            backButton.classList.remove('animated', 'bounceOut');
            backButton.style.display = 'none';
            field.node.style.backgroundImage = '';
            score.curScore = 0;
            level.num = 1;
            scoreField.textContent = '000';
            chooseOperation();
        }
    }, 200, back);
};

const restartGame = function (e) {
    if (!e.target.classList.contains('restart')) {
        return;
    }

    field.node.removeChild(e.target);
    field.node.removeChild(document.querySelector('.level'));
    field.node.style.backgroundImage = '';
    chooseOperation();
};

export default gameOver;
