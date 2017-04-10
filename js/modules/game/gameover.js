let { field, player, scoreField, backButton} = require('./values');
let { delPlayerMessage } = require('../objects/player');
let { chooseOperation } = require('./gamestart');
let { score } = require('../objects/score');

const gameOver = function(back) {
    delPlayerMessage(false);
    setTimeout( (back) => {
        player.style.display = 'none';
        scoreField.style.display = 'none';
        if(!back) {
            let p = document.createElement('p');
            p.classList.add('level');
            p.innerHTML = 'GAME OVER';
            field.appendChild(p);
            p.style.font = '900 70px Kabel';
            p.style.top = p.offsetTop - 100 + 'px';
            p.style.cursor = 'default';

            let restart = document.createElement('div');
            restart.classList.add('restart');
            
            restart.textContent = 'Press to restart';
            field.appendChild(restart);
            restart.addEventListener('click', restartGame);
        }
        else {
            let level = document.querySelector('.level');
            if(level)
                field.removeChild(level);
            backButton.classList.remove('animated', 'bounceOut');
            backButton.style.display = 'none';
            field.style.backgroundImage = '';
            score.curScore = 0;
            scoreField.textContent = '000';
            chooseOperation();
        }
    }, 200, back);
}

const restartGame = function(e) {
    if(!e.target.classList.contains('restart'))
        return;
    
    field.removeChild(e.target);
    field.removeChild(document.querySelector('.level'));
    field.style.backgroundImage = '';
    chooseOperation();
}

module.exports = {
    gameOver,
}
