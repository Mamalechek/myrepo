import { startGame } from './gamestart';
import {
    showPlayerMessage, jumpHeight, playerJump,
} from '../objects/player';
import { startExample } from '../objects/examples';
import { score, endOfGame, count, changeScore } from '../objects/score';
import {
    startGameBut, wikiBut, field, showLevel, level, player, backButton, sound,
} from './values';
import {
    createBalloons, ballOnField, animateBalloons,
} from '../objects/balloons';
import gameOver from './gameover';
import showWiki from './wiki';


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

const loadImgAudio = function () {
    const sources = [
        './img/kids-math-game.jpg',
        './img/wiki/choose.png',
        './img/field-bg.jpg',
        './img/Spongebob.png',
        './img/Patrick.png',
        './img/explosion.png',
        './img/balloons.png',
    ];

    const div = document.createElement('div');
    div.style.position = 'absolute';
    div.style.top = 0;
    div.style.left = 0;
    div.style.visibility = 'hidden';
    document.body.appendChild(div);
    div.innerHTML = `<img src="${sources.join('" /><img src="')}" />`;
    const lastImg = div.lastChild;
    lastImg.onload = () => { document.body.removeChild(div); };

    if (!audio && document.getElementById('audio')) {
        audio = document.getElementById('audio');
        document.forms[0].style.marginLeft = `calc(50% + ` +
                                                `${(field.width / 2) - 60}px)`;
        document.forms[0].style.display = 'block';
        document.forms[0].elements[0].addEventListener('change', mute);
    }
};

const mute = function (e) {
    if (e.target.checked) {
        audio.play();
        sound.on = true;
    } else {
        audio.pause();
        sound.on = false;
    }
};

const start = function (e) {
    const target = e.target;
    if (target === startGameBut) {
        document.removeEventListener('click', start);
        startGame(target);
    } else
    if (target === wikiBut) {
        showWiki(target);
    }

    return false;
};

document.addEventListener('DOMContentLoaded', loadImgAudio);
document.addEventListener('click', start);
setTimeout(() => {
    startGameBut.classList.add('animated', 'pulse', 'infinite');
}, 3500);

backButton.addEventListener('click', backFunc);

mainFunc();

