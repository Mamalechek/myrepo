import {
    field, exampleField, patrick, player, speed,
} from '../game/values';
import { playerCoords, showPlayerMessage } from './player';
import { changeScore, endOfGame } from './score';

const balloons = [];
let ballHeight = null;
let bottomBorder = null;
let down = 0;
const ballOnField = { on: false };
let selectedBall = null;
const mix = [
    0, -12, 11, 0, -11, 0, -9, 0, 12,
    0, -8, 0, 13, 9, 0, -12, 0, 8, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0];

const createBalloons = function (answers) {
    const n = 3;
    if (!field.node.querySelector('.balloon')) {
        for (let i = 0; i < n; i++) {
            balloons[i] = {};
            balloons[i].elem = document.createElement('div');
            balloons[i].elem.classList.add('balloon');
            balloons[i].elem.textContent = answers[i];
        }

        selectedBall = null;
        animateBalloons();
    }
};

const animateBalloons = function () {
    if (!ballOnField.on && !down && !selectedBall) {
        addBalloons();
    }

    if (down <= bottomBorder && balloons[0]) {
        const goPx = [];
        for (let i = 0; i < 12; i++) {
            if (i % 5) {
                goPx[i] = speed.speed;
            } else {
                goPx[i] = speed.speed - 1;
            }
        }

        const index = Math.round(Math.random() * 11);
        down += goPx[index];

        for (let i = 0; i < balloons.length; i++) {
            const angle = balloons[i].angle;
            if (angle === balloons[i].moveTo) {
                const ind = Math.round(Math.random() * 27);
                balloons[i].moveTo += mix[ind];
                if (balloons[i].moveTo > 30) {
                    balloons[i].moveTo -= Math.abs(mix[ind]);
                } else
                if (balloons[i].moveTo < -30) {
                    balloons[i].moveTo += Math.abs(mix[ind]);
                }
            } else {
                balloons[i].angle += (balloons[i].moveTo - angle) /
                                    Math.abs(balloons[i].moveTo - angle);
            }

            balloons[i].elem.style.transform = `translate(0, ${down}px)` +
                                                `rotate(${angle}deg)`;
        }

        if (down + ballHeight >= playerCoords.top - (field.height * 0.25)) {
            let select = null;
            for (let i = 0; i < balloons.length; i++) {
                select = playerChooseBall({
                        width: playerCoords.width,
                        height: playerCoords.height,
                        top: playerCoords.top,
                        left: playerCoords.left,
                    }, {
                        width: balloons[i].width,
                        height: balloons[i].height,
                        top: balloons[i].top + down,
                        left: balloons[i].left,
                    });
                if (select) {
                    selectedBall = balloons[i];
                    removeBalloons(selectedBall);
                    select = null;
                    break;
                }
            }
        }
    } else
    if (ballOnField.on) {
        ballOnField.on = false;
        removeBalloons();
    }
};

const addBalloons = function () {
    let minTop = field.height;
    const ballColors = [];
    for (let i = 0; i < balloons.length; i++) {
        field.node.appendChild(balloons[i].elem);

        let flag = false;
        let color = null;
        while (!flag) {
            color = Math.round(Math.random() * 8);
            if (!(ballColors.includes(color))) {
                flag = true;
                ballColors.push(color);
            }
        }
        balloons[i].elem.style.backgroundPosition = `${75 * color}px 0px`;

        balloons[i].width = balloons[i].elem.offsetWidth;
        balloons[i].height = balloons[i].elem.offsetHeight;
        balloons[i].top = (Math.random() * 55) + 45;
        balloons[i].left = Math.random() * (field.width - balloons[i].width);
        balloons[i].angle = 0;
        balloons[i].moveTo = balloons[i].angle;

        balloons[i].elem.style.top = `${balloons[i].top}px`;
        let j = 0;
        while (j < i) {
            let mark = false;
            while (Math.abs(balloons[j].left - balloons[i].left) < 100) {
                balloons[i].left = Math.random() *
                                    (field.width - balloons[i].width);
                mark = true;
            }
            j++;
            if (mark) {
                j = 0;
            }
        }

        balloons[i].elem.style.left = `${balloons[i].left}px`;
        if (minTop > balloons[i].top) {
            minTop = balloons[i].top;
        }
    }

    bottomBorder = field.height - minTop;
    ballHeight = balloons[0].elem.offsetHeight;
    ballOnField.on = true;
    document.addEventListener('click', selectBalloon);
};

const selectBalloon = function (e) {
    const target = e.target;
    selectedBall = true;
    for (let i = 0; i < balloons.length; i++) {
        if (balloons[i].elem === target) {
            removeBalloons(balloons[i]);
            break;
        }
    }
    e.stopPropagation();
};

const playerChooseBall = function (rect1, rect2) {
    const center1 = {
        x: rect1.left + (rect1.width / 2),
        y: rect1.top + (rect1.height / 2),
    };
    const center2 = {
        x: rect2.left + (rect2.width / 2),
        y: rect2.top + (rect2.height / 2),
    };

    const distX = Math.abs(center2.x - center1.x);
    const distY = Math.abs(center2.y - center1.y);
    if (rect1.top - rect2.top < ballHeight * 0.65) {
        if (distX < ((rect1.width + rect2.width) / 2) - 5 &&
                distY < ((rect1.height + rect2.height) / 2) - 5) {
            return true;
        }
        return false;
    }
};

const removeBalloons = function (selectBall) {
    const num = parseInt(balloons[0].elem.innerHTML, 10);
    for (let i = 0; i < balloons.length; i++) {
        if (selectBall && balloons[i] === selectBall) {
            checkSelection(selectBall, num);
        }
        field.node.removeChild(balloons[i].elem);
        balloons[i] = null;
    }

    if (!selectBall) {
        checkSelection();
    }

    bottomBorder = null;
    down = 0;
    ballOnField.on = false;
    document.removeEventListener('click', selectBalloon);
    setTimeout(() => {
        patrick.style.backgroundPosition = '0px 0px';
        exampleField.style.display = 'none';
        patrick.style.display = 'none';
    }, 1000);
};

const checkSelection = function (selectBall, num) {
    if (selectBall === balloons[0]) {
        explode(selectBall, 0);
        changeScore(100);
        player.style.backgroundPosition = '-200px 0px';
        patrick.style.backgroundPosition = '-80px 0px';
        setTimeout(() => {
            showPlayerMessage('You\'re genius! :)', true);
            player.style.backgroundPosition = '0px 0px';
        }, 1000);
    } else {
        if (selectBall) {
            explode(selectBall, 1);
        }
        changeScore(-50);
        player.style.backgroundPosition = '-300px 0px';
        patrick.style.backgroundPosition = '-160px 0px';
        if (!endOfGame.end) {
            if (selectBall) {
                setTimeout(() => {
                    showPlayerMessage(`Think better! <br> It's `, true, num);
                    player.style.backgroundPosition = '0px 0px';
                }, 1000);
            } else {
                setTimeout(() => {
                    showPlayerMessage('Hurry up, my Friend!', true, num);
                    player.style.backgroundPosition = '0px 0px';
                }, 1000);
            }
        } else {
            setTimeout(() => {
                showPlayerMessage('OH! NO!', false);
            }, 1000);
        }
    }
};

const explode = function (selectBall, offset) {
    const explosion = document.createElement('div');
    explosion.classList.add('explosion', 'animated', 'zoomIn');
    explosion.style.backgroundPosition = `${256 * offset}px 0px`;

    const top = selectBall.top + down - 100;
    const left = selectBall.left - 90;

    if (left < 0) {
        explosion.style.left = 0;
    } else
    if (left + 256 > field.width) {
        explosion.style.left = `${field.width - 256}px`;
    } else {
        explosion.style.left = `${left}px`;
    }

    if (top + 256 > field.height) {
        explosion.style.top = `${field.height - 256}px`;
    } else
    if (top < 0) {
        explosion.style.top = 0;
    } else {
        explosion.style.top = `${top}px`;
    }

    field.node.appendChild(explosion);
    setTimeout(() => {
        field.node.removeChild(explosion);
    }, 1200);
};

export {
    createBalloons,
    balloons,
    ballOnField,
    animateBalloons,
};
