const {
    showPlayerMessage, jumpHeight, playerJump,
} = require('../objects/player');
const { startExample } = require('../objects/examples');
const { score, endOfGame, count, changeScore } = require('../objects/score');
const { showLevel, level, player, backButton } = require('./values');
const {
    createBalloons, ballOnField, animateBalloons,
} = require('../objects/balloons');
const { gameOver } = require('./gameover');

let audio = null;

const mainFunc = function main() {
    if (!endOfGame.end) {
        render();

        const answers = startExample();
        if (answers) {
            setTimeout(() => {
                createBalloons(answers);
            }, 3000);
        }

        if (score.curScore && Math.floor(score.curScore / 1000) === level.num) {
            levelUp();
        }
    } else {
        endOfGame.end = false;
        setTimeout(gameOver, 2000);
    }

    if (!audio && document.getElementById('audio')) {
        audio = true;
        document.forms[0].elements[0].addEventListener('change', mute);
    }

    requestAnimationFrame(main);
};

const levelUp = function () {
    level.num = Math.floor(score.curScore / 1000) + 1;
    showLevel(level.num);
    player.style.backgroundPosition = '-400px 0px';
    showPlayerMessage('HEY-HEY! <br> Wonderfu-u-ul! <br> Level UP!');
};

const render = function () {
    if (jumpHeight.height) {
        playerJump();
    }

    if (ballOnField.on) {
        animateBalloons();
    }

    if (count.left) {
        changeScore();
    }
};

const backFunc = function () {
    backButton.classList.add('animated', 'bounceOut');
    gameOver(true);
};

const mute = function (e) {
    if (e.target.checked) {
        document.getElementById('audio').play();
    } else {
        document.getElementById('audio').pause();
    }
};

backButton.addEventListener('click', backFunc);

mainFunc();

