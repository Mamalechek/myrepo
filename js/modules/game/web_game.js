let { showPlayerMessage, jumpHeight, playerJump } = require('../objects/player');
let { } = require('./gamestart');
let { startExample } = require('../objects/examples');
let { score, endOfGame, count, changeScore } = require('../objects/score');
let { showLevel, level, player, backButton } = require('./values');
let { createBalloons, ballOnField, animateBalloons } = require('../objects/balloons');
let { gameOver } = require('./gameover');

const mainFunc = function main() {
    
    if(!endOfGame.end) {
        render();

        let answers = startExample();
        if(answers) {
            setTimeout( () => {
                createBalloons(answers); 
            }, 3000);
        }
        
        if(score.curScore && Math.floor(score.curScore / 1000) === level.num) {
            levelUp();
        }
    }
    else {
        endOfGame.end = false;
        setTimeout(gameOver, 2000);
    }

    requestAnimationFrame(main);
}

const levelUp = function() {
    level.num = Math.floor(score.curScore / 1000) + 1;
    showLevel(level.num);
    player.style.backgroundPosition = '-400px 0px';
    showPlayerMessage('HEY-HEY! <br> Wonderfu-u-ul! <br> Level UP!');
}

const render = function() {
    if(jumpHeight.height)
        playerJump();

    if(ballOnField.on)
        animateBalloons();    

    if(count.left)
        changeScore();
}

const backFunc = function() {
    backButton.classList.add('animated', 'bounceOut');
    gameOver(true);
}

backButton.addEventListener('click', backFunc);
mainFunc();

