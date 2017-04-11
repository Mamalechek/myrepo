/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

const player = document.getElementById('player');
const field = { node: document.querySelector('.field') };
field.width = field.node.clientWidth;
field.height = field.node.clientHeight;
const startGameBut = document.querySelector('.start');
const wikiBut = document.querySelector('.wiki');
const exampleField = document.querySelector('.example');
const scoreField = document.querySelector('.score');
const patrick = document.querySelector('.patrick');
const backButton = document.querySelector('.back-to-operation');

const level = { num: 1 };
const operation = { sign: '' };
const speed = { speed: 1 };

const showLevel = function (lvl) {
    const lev = document.createElement('p');
    lev.classList.add('level', 'animated', 'flipInX');
    lev.textContent = `LEVEL ${lvl}`;
    field.node.appendChild(lev);
    setTimeout(() => {
        if (document.querySelector('.level')) {
            field.node.removeChild(lev);
        }
    }, 1000);
};


const count = function () {
    const colors = ['red', 'yellow', 'green', 'orange', 'purple'];
    exampleField.style.display = 'inline-block';
    patrick.style.display = 'inline-block';
    player.style.backgroundPosition = '0px 0px';

    const countField = document.createElement('p');
    countField.classList.add('count', 'animated', 'zoomIn', 'infinite');
    field.node.appendChild(countField);

    function getColor() {
        const colorIndex = Math.round(Math.random() * 5);
        countField.style.color = colors[colorIndex];
    }

    setTimeout((index) => {
        getColor();
        countField.textContent = `${index}`;
        setTimeout((index1) => {
            getColor();
            countField.textContent = `${index1}`;
            setTimeout((index2) => {
                getColor();
                countField.textContent = `${index2}`;
            }, 1020, 1);
        }, 1020, 2);
    }, 0, 3);

    setTimeout(() => {
        field.node.removeChild(countField);
    }, 3000);
};


window.addEventListener('resize', () => {
    field.height = field.node.clientHeight;
    field.width = field.node.clientWidth;
});

module.exports = {
    player,
    field,
    startGameBut,
    wikiBut,
    exampleField,
    scoreField,
    patrick,
    backButton,
    level,
    operation,
    speed,
    showLevel,
    count,
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const { field, count, player, backButton } = __webpack_require__(0);

const playerCoords = {};
const pressedKeys = {};
let playerInJump = false;
const jumpHeight = { height: 0 };
let jumpUp = true;
let leftBorder = null;
let startCounting = false;

const addPlayer = function () {
    player.style.backgroundPosition = '0px 0px';
    player.style.display = 'inline-block';
    document.addEventListener('keydown', movePlayer);
    document.addEventListener('keyup', removeKey);
    leftBorder = field.width - player.offsetWidth;

    window.addEventListener('resize', () => {
        leftBorder = field.width - player.offsetWidth;
    });
    getPlayerCoords();
};

const getPlayerCoords = function () {
    playerCoords.top = player.offsetTop;
    playerCoords.left = player.offsetLeft;
    playerCoords.height = player.offsetHeight;
    playerCoords.width = player.offsetWidth;
};

const movePlayer = function (e) {
    const key = e.keyCode;

    if (key !== 39 && key !== 68 && key !== 37 &&
            key !== 65 && key !== 38 && key !== 87) {
        return;
    }

    if (!pressedKeys[key]) {
        pressedKeys[key] = true;
    }

    if (key === 38 || key === 87 || (pressedKeys['38'] || pressedKeys['87'])) {
        if (!playerInJump) {
            playerInJump = true;
            playerJump();
        }
    } else
    if ((key === 39 || key === 68) &&
            !(pressedKeys['37'] || pressedKeys['65'])) {
        moveRight();
    } else
    if ((key === 37 || key === 65) &&
            !(pressedKeys['39'] || pressedKeys['68'])) {
        moveLeft();
    }
};

const removeKey = function (e) {
    if (e.keyCode in pressedKeys) {
        delete pressedKeys[e.keyCode];
        player.style.backgroundPosition = '0px 0px';
    }
};

const moveRight = function () {
    const matrix = getComputedStyle(player).transform;
    const leftMove = parseInt(matrix.split(',')[4], 10) + 5;
    const upPos = parseInt(matrix.split(',')[5], 10);
    if (playerCoords.left <= leftBorder) {
        const trans = `translate(${leftMove}px, ${upPos}px) scale(1, 1)`;
        player.style.transform = trans;
        player.style.backgroundPosition = '-100px 0px';
        playerCoords.left += 5;
    }
};

const moveLeft = function () {
    const matrix = getComputedStyle(player).transform;
    const rightMove = parseInt(matrix.split(',')[4], 10) - 5;
    const upPos = parseInt(matrix.split(',')[5], 10);
    if (playerCoords.left >= 0) {
        const trans = `translate(${rightMove}px, ${upPos}px) scale(-1, 1)`;
        player.style.transform = trans;
        player.style.backgroundPosition = '-100px 0px';
        playerCoords.left -= 5;
    }
};

const playerJump = function jump() {
    if (pressedKeys['39'] || pressedKeys['68']) {
        moveRight();
    } else
    if (pressedKeys['37'] || pressedKeys['65']) {
        moveLeft();
    }

    const matrix = getComputedStyle(player).transform;
    let scale = matrix.split(',')[0];
    if (scale.indexOf('-') === -1) {
        scale = parseInt(scale.slice(-1), 10);
    } else {
        scale = parseInt(scale.slice(-2), 10);
    }

    const leftPos = parseInt(matrix.split(',')[4], 10);

    if (jumpHeight.height < (field.height * 0.25) && jumpUp) {
        jumpHeight.height += 3;
        playerCoords.top -= 3;
    } else {
        jumpHeight.height -= 3;
        playerCoords.top += 3;
        jumpUp = false;
    }

    player.style.transform = `translate(${leftPos}px,` +
                                `-${jumpHeight.height}px) scale(${scale}, 1)`;

    if (jumpHeight.height <= 0) {
        jumpUp = true;
        playerInJump = false;
        let countEvent = null;
        const keys = Object.keys(pressedKeys);
        for (let i = 0; i < keys.length; i++) {
            countEvent = keys[i];
        }
        if (countEvent) {
            const event = new Event('keydown');
            event.keyCode = parseInt(countEvent, 10);
            document.dispatchEvent(event);
        }
    }
};

const showPlayerMessage = function (message, counting, span) {
    const curMessage = document.querySelector('.player-message');
    if (!curMessage) {
        const playerMessage = document.createElement('div');
        playerMessage.classList.add('player-message');
        playerMessage.innerHTML = message;
        if (span !== undefined) {
            playerMessage.appendChild(document.createElement('span'));
            playerMessage.lastChild.style.color = 'blue';
            playerMessage.lastChild.innerHTML = span;
            playerMessage.innerHTML += '!';
        }

        if (playerCoords.left + 220 < leftBorder) {
            playerMessage.classList.add('left-message');
            playerMessage.style.left = `${playerCoords.left + 20}px`;
        } else {
            playerMessage.classList.add('right-message');
            playerMessage.style.left = `${playerCoords.left - 180}px`;
        }

        field.node.appendChild(playerMessage);
        const top = playerCoords.top - playerMessage.offsetHeight - 70;
        playerMessage.style.top = `${top}px`;
        document.addEventListener('keydown', delPlayerMessage);
        document.addEventListener('click', delPlayerMessage);
        startCounting = counting;
    } else {
        curMessage.innerHTML += `<br>${message}`;
        const top = playerCoords.top - curMessage.offsetHeight - 70;
        curMessage.style.top = `${top}px`;
        startCounting = true;
    }

    if (startCounting) {
        backButton.style.display = 'block';
    }
};

const delPlayerMessage = function (mark) {
    const playerMessage = field.node.querySelector('.player-message');
    if (playerMessage) {
        field.node.removeChild(playerMessage);
        document.removeEventListener('keydown', delPlayerMessage);
        document.removeEventListener('click', delPlayerMessage);

        if (mark !== false) {
            player.style.backgroundPosition = '0px 0px';
        }

        if (startCounting && mark !== false) {
            startCounting = false;
            backButton.style.display = 'none';
            count();
        }
    }
};


module.exports = {
    playerCoords,
    addPlayer,
    showPlayerMessage,
    delPlayerMessage,
    jumpHeight,
    playerJump,
};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const { scoreField } = __webpack_require__(0);

const count = { left: 0 };
const changes = {};
const endOfGame = { end: false };
const score = { curScore: parseInt(scoreField.textContent, 10) };

const changeScore = function (change) {
    if (!Object.keys(changes).length) {
        changes.curScore = score.curScore;
        changes.change = change;
    }

    if (changes.curScore + changes.change >= 0) {
        const style = getComputedStyle(scoreField);
        if (style.display !== 'none') {
            if (count.left === changes.change || !changes.change) {
                count.left = 0;
                delete changes.curScore;
                delete changes.change;
            } else {
                score.curScore = changes.curScore +
                                count.left +
                                (changes.change / Math.abs(changes.change));
                const scoreLength = score.curScore.toString(10).length;
                const times = Math.max(3 - scoreLength, 0);
                scoreField.textContent = '0'.repeat(times) + score.curScore;

                count.left += (changes.change / Math.abs(changes.change));
            }
        }
    } else {
        endOfGame.end = true;
        delete changes.curScore;
        delete changes.change;
    }
};

module.exports = {
    changeScore,
    score,
    changes,
    endOfGame,
    count,
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const { field, player, scoreField, backButton } = __webpack_require__(0);
const { delPlayerMessage } = __webpack_require__(1);
const { chooseOperation } = __webpack_require__(6);
const { score } = __webpack_require__(2);

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
            const level = document.querySelector('.level');
            if (level) {
                field.node.removeChild(level);
            }
            backButton.classList.remove('animated', 'bounceOut');
            backButton.style.display = 'none';
            field.node.style.backgroundImage = '';
            score.curScore = 0;
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

module.exports = {
    gameOver,
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const {
    field, exampleField, patrick, player, speed,
} = __webpack_require__(0);
const { playerCoords, showPlayerMessage } = __webpack_require__(1);
const { changeScore, endOfGame } = __webpack_require__(2);

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

module.exports = {
    createBalloons,
    balloons,
    ballOnField,
    animateBalloons,
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const { exampleField, operation, level } = __webpack_require__(0);

let exampleInField = false;
let answers = [];

const startExample = function () {
    const style = getComputedStyle(exampleField);
    if (style.display !== 'none') {
        if (!exampleInField) {
            showExample();
            return answers;
        }
    } else {
        exampleInField = false;
    }
};

const showExample = function () {
    const n = 2;
    let example = '';
    let max = 10 * level.num;
    if (level.num > 5) {
        max = 10 * 5;
    }

    function sorting(a, b) {
        if (a > b) {
            return 1;
        }
        return -1;
    }

    function generateNum(m, answer) {
        const rand = Math.random();
        return Math.abs(Math.min(
                Math.round((rand * (2 * m)) - m), Math.round(rand * answer)));
    }

    function generator(sign) {
        const operands = [];
        let answer = 0;
        switch (sign) {
            case '+': {
                for (let i = 0; i < n; i++) {
                    operands[i] = Math.round(Math.random() * max);
                }
                example = `${operands[0]} + ${operands[1]} = ...`;
                answer = operands[0] + operands[1];
                break;
            }
            case '-': {
                for (let i = 0; i < n; i++) {
                    operands[i] = Math.round(Math.random() * max);
                }
                operands.sort(sorting);
                example = `${operands[1]} - ${operands[0]} = ...`;
                answer = operands[1] - operands[0];
                break;
            }
            case '*': {
                for (let i = 0; i < n; i++) {
                    operands[i] = Math.round((Math.random() * max) + 1);
                    max = Math.floor(100 / operands[i]) - 1;
                }
                example = `${operands[0]} &#215 ${operands[1]} = ...`;
                answer = operands[0] * operands[1];
                break;
            }
            case '/': {
                max *= 2;
                for (let i = 0; i < n; i++) {
                    operands[i] = Math.round((Math.random() * max) + i);
                    max = operands[i] / 2;
                }
                if (operands[0] % operands[1]) {
                    operands[0] = operands[1] *
                                    Math.round(operands[0] / operands[1]);
                }
                example = `${operands[0]} &#247 ${operands[1]} = ...`;
                answer = operands[0] / operands[1];
                break;
            }
            default:
                break;
        }

        return [
            answer,
            answer + generateNum(10, answer),
            answer + generateNum(10, answer),
        ];
    }

    if (operation.sign.length === 1) {
        answers = generator(operation.sign);
    } else {
        answers = generator(operation.sign[Math.round(Math.random() * 3)]);
    }

    for (let i = 0; i < answers.length; i++) {
        for (let j = i + 1; j < answers.length; j++) {
            if (answers[i] === answers[j]) {
                answers[j]++;
            }
        }
    }

    exampleField.innerHTML = example;
    exampleInField = true;
};

module.exports = {
    exampleField,
    startExample,
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const { field, startGameBut, wikiBut,
        showLevel, operation, speed, backButton } = __webpack_require__(0);
const { addPlayer, showPlayerMessage } = __webpack_require__(1);
const { showWiki } = __webpack_require__(8);

const startGame = function (e) {
    const target = e.target;
    if (target === startGameBut) {
        target.classList.remove('animated', 'pulse', 'infinite');
        target.classList.add('animated', 'bounceOut');
        setTimeout(() => {
            field.node.removeChild(target);
            field.node.removeChild(wikiBut);
            document.getElementById('math').hidden = true;
            chooseOperation();
        }, 230);
    } else
    if (target === wikiBut) {
        target.classList.add('animated', 'bounceOut');
        setTimeout(() => {
            target.classList.remove('animated', 'bounceOut');
            wikiBut.hidden = true;
            startGameBut.hidden = true;
            document.getElementById('math').hidden = true;
            showWiki();
        }, 230);
    }

    return false;
};

const chooseOperation = function () {
    const p = document.createElement('p');
    p.classList.add('level');
    p.textContent = 'Choose the operation:';
    field.node.insertBefore(p, field.node.firstChild);
    p.style.font = '900 50px Kabel';
    p.style.color = '#25196C';
    p.style.top = '3.5%';

    for (let i = 0; i < 5; i++) {
        const button = document.createElement('div');

        button.classList.add('operation');
        button.appendChild(document.createElement('span'));
        button.firstChild.style.marginRight = '20px';

        switch (i) {
            case 0: {
                button.dataset.operation = '+';
                button.firstChild.innerHTML = '+';
                button.appendChild(document.createTextNode('addition'));
                break;
            }
            case 1: {
                button.dataset.operation = '-';
                button.firstChild.innerHTML = '-';
                button.firstChild.style.verticalAlign = 'top';
                button.appendChild(document.createTextNode('subtraction'));
                button.style.backgroundColor = '#3DC8FF';
                break;
            }
            case 2: {
                button.dataset.operation = '*';
                button.firstChild.innerHTML = '&#215';
                button.appendChild(document.createTextNode('product'));
                button.style.backgroundColor = '#FF3DBA';
                break;
            }
            case 3: {
                button.dataset.operation = '/';
                button.firstChild.innerHTML = '&#247';
                button.firstChild.style.verticalAlign = 'top';
                button.appendChild(document.createTextNode('division'));
                button.style.backgroundColor = '#FFB733';
                break;
            }
            case 4: {
                button.dataset.operation = '+-*/';
                button.firstChild.style.verticalAlign = 'top';
                button.appendChild(document.createTextNode('mix'));
                button.style.backgroundColor = '#3333FF';
                break;
            }
            default:
                break;
        }
        field.node.appendChild(button);
        button.classList.add('animated', 'bounceInRight');
        button.style
            .top = `${button.offsetTop + (button.offsetHeight + 15) * i}px`;
        button.addEventListener('mouseover', (e) => {
            if (e.target.classList.contains('bounceInRight')) {
                e.target.classList.remove('bounceInRight');
            }
            e.target.classList.add('animated', 'pulse', 'infinite');
        });

        button.addEventListener('mouseout', (e) => {
            e.target.classList.remove('animated', 'pulse', 'infinite');
        });
    }

    addSlider();
    document.addEventListener('click', go);
};

const go = function (e) {
    if (!e.target.classList.contains('operation')) {
        return;
    }

    operation.sign = e.target.dataset.operation;
    const buttons = document.querySelectorAll('.operation');
    for (let i = 0; i < buttons.length; i++) {
        field.node.removeChild(buttons[i]);
    }
    field.node.removeChild(field.node.firstChild);

    const slider = document.querySelector('.slider');
    let thumb = document.querySelector('.thumb');
    const coord = Math.ceil((thumb.getBoundingClientRect().left -
                                slider.getBoundingClientRect().left) / 70);
    speed.speed = coord || 1;
    field.node.removeChild(slider);
    thumb = document.querySelector('.thumb');
    if (thumb) {
        document.body.removeChild(thumb);
    }

    for (let i = 0; i < 3; i++) {
        field.node.removeChild(document.querySelector('.slider-legend'));
    }
    field.node.style.backgroundImage = 'url(./img/field-bg.jpg)';
    document.querySelector('.score').style.display = 'inline-block';
    addPlayer();
    showPlayerMessage('HI! <br>' +
        'Let\'s start learning! <br> Press any key to start. ;)', true);
    setTimeout(() => {
        showLevel(1);
    }, 1000);
    document.removeEventListener('click', moveThumbByClick);
    document.removeEventListener('click', go);
    backButton.style.display = 'block';
};

const addSlider = function () {
    const slider = document.createElement('div');
    slider.classList.add('slider');
    const thumb = document.createElement('div');
    thumb.classList.add('thumb');
    field.node.appendChild(slider);
    slider.appendChild(thumb);

    let p = document.createElement('p');
    p.classList.add('slider-legend');
    p.textContent = 'Game speed';
    p.style.cursor = 'default';
    field.node.appendChild(p);
    p.style.bottom = '15px';

    p = document.createElement('p');
    p.classList.add('slider-legend', 'data-lower');
    p.textContent = 'lower';
    field.node.appendChild(p);
    p.style.fontSize = '15px';
    p.style.width = '62px';
    p.style.left = '31.2%';
    p.style.bottom = '49px';

    p = document.createElement('p');
    p.classList.add('slider-legend', 'data-faster');
    p.textContent = 'faster';
    field.node.appendChild(p);
    p.style.fontSize = '15px';
    p.style.width = '68px';
    p.style.left = '62.5%';
    p.style.bottom = '49px';

    const div = document.createElement('div');
    slider.appendChild(div);
    div.style.height = '20px';
    div.style.border = '1px solid #25196C';
    div.style.position = 'absolute';
    div.style.top = '-2px';
    div.style.left = 'calc(50% - 1px)';

    thumb.addEventListener('dragstart', () => false);
    document.addEventListener('mousedown', changeSpeed);
    document.addEventListener('click', moveThumbByClick);
};

const changeSpeed = function (event) {
    const target = event.target;
    if (!target.classList.contains('thumb')) {
        return;
    }

    const rect = target.getBoundingClientRect();
    const coords = {
        top: rect.top + pageYOffset,
        left: rect.left + pageXOffset,
    };
    const shiftX = event.pageX - coords.left;
    const shiftY = event.pageY - coords.top;

    const parentRect = document
                            .querySelector('.slider')
                            .getBoundingClientRect();

    function moveThumb(e) {
        if (e.pageX - shiftX >= parentRect.left &&
        e.pageX - shiftX <= parentRect.right - target.offsetWidth) {
            target.style.left = `${e.pageX - shiftX}px`;
        }
    }

    function drop() {
        const left = target.style.left;
        const parentWidth = parentRect.right - parentRect.left;
        if (parseInt(left, 10) > parentRect.left &&
            parseInt(left, 10) <= parentRect.left + (parentWidth / 2) - 50) {
            target.style.left = `${parentRect.left}px`;
        } else
        if (parseInt(left, 10) > (parentRect.left + (parentWidth / 2) - 50) &&
            parseInt(left, 10) <= (parentRect.left + (parentWidth / 2) + 50)) {
            const l = parentRect.left + (parentWidth / 2) -
                        (target.offsetWidth / 2);
            target.style.left = `${l}px`;
        } else
        if (parseInt(left, 10) > parentRect.left + (parentWidth / 2) + 50) {
            target.style.left = `${parentRect.right - target.offsetWidth}px`;
        }

        const coordsThumb = target.getBoundingClientRect();
        document.querySelector('.slider').appendChild(target);
        target.style.top = `${coordsThumb.top - parentRect.top}px`;
        target.style.left = `${coordsThumb.left - parentRect.left}px`;

        document.removeEventListener('mousemove', moveThumb);
        document.removeEventListener('mouseup', drop);
    }

    document.body.appendChild(target);
    target.style.top = `${event.pageY - shiftY}px`;
    moveThumb(event);

    document.addEventListener('mousemove', moveThumb);
    document.addEventListener('mouseup', drop);
};

const moveThumbByClick = function (e) {
    if (!e.target.closest('.slider') &&
            !e.target.classList.contains('data-lower') &&
                !e.target.classList.contains('data-faster')) {
        return;
    }

    const thumb = document.querySelector('.thumb');
    const rect = thumb.getBoundingClientRect();
    const coords = {
        top: rect.top + pageYOffset,
        left: rect.left + pageXOffset,
    };
    document.body.appendChild(thumb);
    thumb.style.top = `${coords.top}px`;
    thumb.style.left = `${coords.left}px`;
    const parentRect = document
                        .querySelector('.slider')
                        .getBoundingClientRect();
    const parentWidth = parentRect.right - parentRect.left;
    const thumbWidth = thumb.offsetWidth;
    const l = parentRect.left + (parentWidth / 2) - (thumbWidth / 2);

    if (e.target.closest('.slider')) {
        if (e.pageX > parentRect.left + (parentWidth / 2) - 20 &&
                e.pageX < parentRect.left + (parentWidth / 2) + 20) {
            thumb.style.left = `${l}px`;
        } else
        if (e.pageX > parentRect.left && e.pageX < parentRect.left + 20) {
            thumb.style.left = `${parentRect.left}px`;
        } else
        if (e.pageX > parentRect.right - 20 && e.pageX < parentRect.right) {
            thumb.style.left = `${parentRect.right - thumbWidth}px`;
        }
    } else
    if (e.target.classList.contains('data-lower')) {
        if (coords.left === l || coords.left === parentRect.left) {
            thumb.style.left = `${parentRect.left}px`;
        } else
        if (coords.left === parentRect.right - thumbWidth) {
            thumb.style.left = `${l}px`;
        }
    } else
    if (e.target.classList.contains('data-faster')) {
        if (coords.left === l ||
            coords.left === parentRect.right - thumbWidth) {
            thumb.style.left = `${parentRect.right - thumbWidth}px`;
        } else
        if (coords.left === parentRect.left) {
            thumb.style.left = `${l}px`;
        }
    }

    const coordsThumb = thumb.getBoundingClientRect();
    document.querySelector('.slider').appendChild(thumb);
    thumb.style.top = `${coordsThumb.top - parentRect.top}px`;
    thumb.style.left = `${coordsThumb.left - parentRect.left}px`;
};

const loadImg = function () {
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
    lastImg.onload = function () { document.body.removeChild(div); };
};

document.addEventListener('DOMContentLoaded', loadImg);
document.addEventListener('click', startGame);
setTimeout(() => {
    startGameBut.classList.add('animated', 'pulse', 'infinite');
}, 3500);

module.exports = {
    chooseOperation,
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

const {
    showPlayerMessage, jumpHeight, playerJump,
} = __webpack_require__(1);
const { startExample } = __webpack_require__(5);
const { score, endOfGame, count, changeScore } = __webpack_require__(2);
const { showLevel, level, player, backButton } = __webpack_require__(0);
const {
    createBalloons, ballOnField, animateBalloons,
} = __webpack_require__(4);
const { gameOver } = __webpack_require__(3);

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



/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

const { field, startGameBut, wikiBut, backButton } = __webpack_require__(0);

let count = 0;
let image = null;
let rightArr = null;
let leftArr = null;
let page = null;

const showWiki = function () {
    image = document.createElement('div');
    image.classList.add('wiki-image');
    field.node.appendChild(image);
    image.style.width = `${field.node.clientWidth * 0.84}px`;
    image.style.height = `${field.node.clientHeight * 0.85}px`;
    image.style.backgroundImage = `url(./img/wiki/choose.png)`;
    image.style.backgroundSize = '701.5% 100%';

    leftArr = document.createElement('div');
    leftArr.classList.add('arrow-left');
    field.node.appendChild(leftArr);

    rightArr = document.createElement('div');
    rightArr.classList.add('arrow-right');
    field.node.appendChild(rightArr);

    page = document.createElement('p');
    page.style.font = '400 22px Kabel';
    page.style.color = '#25196C';
    page.innerHTML = `${count + 1}/7`;
    field.node.appendChild(page);
    page.style.position = 'absolute';
    page.style.left = 'calc(50% - 20px)';
    page.style.bottom = '37px';

    const button = backButton.cloneNode(true);
    field.node.appendChild(button);
    button.style.top = '90%';
    button.style.display = 'block';

    document.addEventListener('click', changePage);
    document.addEventListener('click', backToStart);

    window.addEventListener('resize', resizeImage);
};

const changePage = function (e) {
    const target = e.target;
    if (!(target === rightArr) && !(target === leftArr)) {
        return;
    }

    target.classList.add('animated', 'bounceOut');
    setTimeout(() => {
        target.classList.remove('animated', 'bounceOut');
    }, 200);

    if (target === rightArr) {
        if (count < 6) {
            count++;
        }
    } else
    if (count) {
        count--;
    }

    image.style
      .backgroundPosition = `${-parseInt(image.style.width, 10) * count}px 0px`;
    page.innerHTML = `${count + 1}/7`;
};

const backToStart = function (e) {
    const target = e.target.closest('.back-to-operation');
    if (!target) {
        return;
    }

    target.classList.add('animated', 'bounceOut');
    setTimeout(() => {
        window.removeEventListener('resize', resizeImage);
        field.node.removeChild(image);
        field.node.removeChild(leftArr);
        field.node.removeChild(rightArr);
        field.node.removeChild(page);
        field.node.removeChild(target);
        image = null;
        leftArr = null;
        rightArr = null;
        wikiBut.hidden = false;
        startGameBut.hidden = false;
        document.getElementById('math').hidden = false;
    }, 200);

    document.removeEventListener('click', changePage);
    document.removeEventListener('click', backToStart);
};

const resizeImage = function () {
    const imageToResize = document.querySelector('.wiki-image');
    imageToResize.style.width = `${field.node.clientWidth * 0.84}px`;
    imageToResize.style.height = `${field.node.clientHeight * 0.85}px`;
};

module.exports = {
    showWiki,
};


/***/ })
/******/ ]);
//# sourceMappingURL=build.js.map