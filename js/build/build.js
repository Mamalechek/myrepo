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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return player; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return field; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return startGameBut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return wikiBut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return exampleField; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return scoreField; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return patrick; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return backButton; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return level; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return operation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return speed; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return showLevel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return count; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return sound; });
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
const sound = { on: true };

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

    setTimeout(index => {
        getColor();
        countField.textContent = `${index}`;
        setTimeout(index1 => {
            getColor();
            countField.textContent = `${index1}`;
            setTimeout(index2 => {
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
    document.forms[0].style.marginLeft = `calc(50% + ${field.width / 2 - 60}px)`;
});



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game_values__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return playerCoords; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return addPlayer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return showPlayerMessage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return delPlayerMessage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return jumpHeight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return playerJump; });


const playerCoords = {};
const pressedKeys = {};
let playerInJump = false;
const jumpHeight = { height: 0 };
let jumpUp = true;
let leftBorder = null;
let startCounting = false;

const addPlayer = function () {
    __WEBPACK_IMPORTED_MODULE_0__game_values__["c" /* player */].style.backgroundPosition = '0px 0px';
    __WEBPACK_IMPORTED_MODULE_0__game_values__["c" /* player */].style.display = 'inline-block';
    document.addEventListener('keydown', movePlayer);
    document.addEventListener('keyup', removeKey);
    leftBorder = __WEBPACK_IMPORTED_MODULE_0__game_values__["e" /* field */].width - __WEBPACK_IMPORTED_MODULE_0__game_values__["c" /* player */].offsetWidth;

    window.addEventListener('resize', () => {
        leftBorder = __WEBPACK_IMPORTED_MODULE_0__game_values__["e" /* field */].width - __WEBPACK_IMPORTED_MODULE_0__game_values__["c" /* player */].offsetWidth;
    });
    getPlayerCoords();
};

const getPlayerCoords = function () {
    playerCoords.top = __WEBPACK_IMPORTED_MODULE_0__game_values__["c" /* player */].offsetTop;
    playerCoords.left = __WEBPACK_IMPORTED_MODULE_0__game_values__["c" /* player */].offsetLeft;
    playerCoords.height = __WEBPACK_IMPORTED_MODULE_0__game_values__["c" /* player */].offsetHeight;
    playerCoords.width = __WEBPACK_IMPORTED_MODULE_0__game_values__["c" /* player */].offsetWidth;
};

const movePlayer = function (e) {
    const key = e.keyCode;

    if (key !== 39 && key !== 68 && key !== 37 && key !== 65 && key !== 38 && key !== 87) {
        return;
    }

    if (!pressedKeys[key]) {
        pressedKeys[key] = true;
    }

    if (key === 38 || key === 87 || pressedKeys['38'] || pressedKeys['87']) {
        if (!playerInJump) {
            if (__WEBPACK_IMPORTED_MODULE_0__game_values__["f" /* sound */].on) {
                const audioJump = new Audio('./audio/player-jump.ogg');
                audioJump.play();
            }
            playerInJump = true;
            playerJump();
        }
    } else if ((key === 39 || key === 68) && !(pressedKeys['37'] || pressedKeys['65'])) {
        moveRight();
    } else if ((key === 37 || key === 65) && !(pressedKeys['39'] || pressedKeys['68'])) {
        moveLeft();
    }
};

const removeKey = function (e) {
    if (e.keyCode in pressedKeys) {
        delete pressedKeys[e.keyCode];
        __WEBPACK_IMPORTED_MODULE_0__game_values__["c" /* player */].style.backgroundPosition = '0px 0px';
    }
};

const moveRight = function () {
    const matrix = getComputedStyle(__WEBPACK_IMPORTED_MODULE_0__game_values__["c" /* player */]).transform;
    const leftMove = parseInt(matrix.split(',')[4], 10) + 5;
    const upPos = parseInt(matrix.split(',')[5], 10);
    if (playerCoords.left <= leftBorder) {
        const trans = `translate(${leftMove}px, ${upPos}px) scale(1, 1)`;
        __WEBPACK_IMPORTED_MODULE_0__game_values__["c" /* player */].style.transform = trans;
        __WEBPACK_IMPORTED_MODULE_0__game_values__["c" /* player */].style.backgroundPosition = '-100px 0px';
        playerCoords.left += 5;
    }
};

const moveLeft = function () {
    const matrix = getComputedStyle(__WEBPACK_IMPORTED_MODULE_0__game_values__["c" /* player */]).transform;
    const rightMove = parseInt(matrix.split(',')[4], 10) - 5;
    const upPos = parseInt(matrix.split(',')[5], 10);
    if (playerCoords.left >= 0) {
        const trans = `translate(${rightMove}px, ${upPos}px) scale(-1, 1)`;
        __WEBPACK_IMPORTED_MODULE_0__game_values__["c" /* player */].style.transform = trans;
        __WEBPACK_IMPORTED_MODULE_0__game_values__["c" /* player */].style.backgroundPosition = '-100px 0px';
        playerCoords.left -= 5;
    }
};

const playerJump = function jump() {
    if (pressedKeys['39'] || pressedKeys['68']) {
        moveRight();
    } else if (pressedKeys['37'] || pressedKeys['65']) {
        moveLeft();
    }

    const matrix = getComputedStyle(__WEBPACK_IMPORTED_MODULE_0__game_values__["c" /* player */]).transform;
    let scale = matrix.split(',')[0];
    if (scale.indexOf('-') === -1) {
        scale = parseInt(scale.slice(-1), 10);
    } else {
        scale = parseInt(scale.slice(-2), 10);
    }

    const leftPos = parseInt(matrix.split(',')[4], 10);

    if (jumpHeight.height < __WEBPACK_IMPORTED_MODULE_0__game_values__["e" /* field */].height * 0.25 && jumpUp) {
        jumpHeight.height += 3;
        playerCoords.top -= 3;
    } else {
        jumpHeight.height -= 3;
        playerCoords.top += 3;
        jumpUp = false;
    }

    __WEBPACK_IMPORTED_MODULE_0__game_values__["c" /* player */].style.transform = `translate(${leftPos}px,` + `-${jumpHeight.height}px) scale(${scale}, 1)`;

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

        __WEBPACK_IMPORTED_MODULE_0__game_values__["e" /* field */].node.appendChild(playerMessage);
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
        __WEBPACK_IMPORTED_MODULE_0__game_values__["d" /* backButton */].style.display = 'block';
    }
};

const delPlayerMessage = function (mark) {
    const playerMessage = __WEBPACK_IMPORTED_MODULE_0__game_values__["e" /* field */].node.querySelector('.player-message');
    if (playerMessage) {
        __WEBPACK_IMPORTED_MODULE_0__game_values__["e" /* field */].node.removeChild(playerMessage);
        document.removeEventListener('keydown', delPlayerMessage);
        document.removeEventListener('click', delPlayerMessage);

        if (mark !== false) {
            __WEBPACK_IMPORTED_MODULE_0__game_values__["c" /* player */].style.backgroundPosition = '0px 0px';
        }

        if (startCounting && mark !== false) {
            startCounting = false;
            __WEBPACK_IMPORTED_MODULE_0__game_values__["d" /* backButton */].style.display = 'none';
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__game_values__["k" /* count */])();
        }
    }
};



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game_values__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return changeScore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return score; });
/* unused harmony export changes */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return endOfGame; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return count; });


const count = { left: 0 };
const changes = {};
const endOfGame = { end: false };
const score = { curScore: parseInt(__WEBPACK_IMPORTED_MODULE_0__game_values__["l" /* scoreField */].textContent, 10) };

const changeScore = function (change) {
    if (!Object.keys(changes).length) {
        changes.curScore = score.curScore;
        changes.change = change;
    }

    if (changes.curScore + changes.change >= 0) {
        const style = getComputedStyle(__WEBPACK_IMPORTED_MODULE_0__game_values__["l" /* scoreField */]);
        if (style.display !== 'none') {
            if (count.left === changes.change || !changes.change) {
                count.left = 0;
                delete changes.curScore;
                delete changes.change;
            } else {
                score.curScore = changes.curScore + count.left + changes.change / Math.abs(changes.change);
                const scoreLength = score.curScore.toString(10).length;
                const times = Math.max(3 - scoreLength, 0);
                __WEBPACK_IMPORTED_MODULE_0__game_values__["l" /* scoreField */].textContent = '0'.repeat(times) + score.curScore;

                count.left += changes.change / Math.abs(changes.change);
            }
        }
    } else {
        endOfGame.end = true;
        delete changes.curScore;
        delete changes.change;
    }
};



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__values__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__objects_player__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return startGame; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return chooseOperation; });



const startGame = function (target) {
    target.classList.remove('animated', 'pulse', 'infinite');
    target.classList.add('animated', 'bounceOut');
    setTimeout(() => {
        __WEBPACK_IMPORTED_MODULE_0__values__["e" /* field */].node.removeChild(target);
        __WEBPACK_IMPORTED_MODULE_0__values__["e" /* field */].node.removeChild(__WEBPACK_IMPORTED_MODULE_0__values__["h" /* wikiBut */]);
        document.getElementById('math').hidden = true;
        chooseOperation();
    }, 230);
};

const chooseOperation = function () {
    const p = document.createElement('p');
    p.classList.add('other');
    p.textContent = 'Choose the operation:';
    __WEBPACK_IMPORTED_MODULE_0__values__["e" /* field */].node.insertBefore(p, __WEBPACK_IMPORTED_MODULE_0__values__["e" /* field */].node.firstChild);
    p.style.font = '900 50px Kabel';
    p.style.color = '#25196C';
    p.style.top = '3.5%';

    for (let i = 0; i < 5; i++) {
        const button = document.createElement('div');

        button.classList.add('operation');
        button.appendChild(document.createElement('span'));
        button.firstChild.style.marginRight = '20px';

        switch (i) {
            case 0:
                {
                    button.dataset.operation = '+';
                    button.firstChild.innerHTML = '+';
                    button.appendChild(document.createTextNode('addition'));
                    break;
                }
            case 1:
                {
                    button.dataset.operation = '-';
                    button.firstChild.innerHTML = '-';
                    button.firstChild.style.verticalAlign = 'top';
                    button.appendChild(document.createTextNode('subtraction'));
                    button.style.backgroundColor = '#3DC8FF';
                    break;
                }
            case 2:
                {
                    button.dataset.operation = '*';
                    button.firstChild.innerHTML = '&#215';
                    button.appendChild(document.createTextNode('product'));
                    button.style.backgroundColor = '#FF3DBA';
                    break;
                }
            case 3:
                {
                    button.dataset.operation = '/';
                    button.firstChild.innerHTML = '&#247';
                    button.firstChild.style.verticalAlign = 'top';
                    button.appendChild(document.createTextNode('division'));
                    button.style.backgroundColor = '#FFB733';
                    break;
                }
            case 4:
                {
                    button.dataset.operation = '+-*/';
                    button.firstChild.style.verticalAlign = 'top';
                    button.appendChild(document.createTextNode('mix'));
                    button.style.backgroundColor = '#3333FF';
                    break;
                }
            default:
                break;
        }
        __WEBPACK_IMPORTED_MODULE_0__values__["e" /* field */].node.appendChild(button);
        button.classList.add('animated', 'bounceInRight');
        button.style.top = `${button.offsetTop + (button.offsetHeight + 15) * i}px`;
        button.addEventListener('mouseover', e => {
            if (e.target.classList.contains('bounceInRight')) {
                e.target.classList.remove('bounceInRight');
            }
            e.target.classList.add('animated', 'pulse', 'infinite');
        });

        button.addEventListener('mouseout', e => {
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

    e.target.classList.add('animated', 'bounceOut');
    setTimeout(() => {
        __WEBPACK_IMPORTED_MODULE_0__values__["i" /* operation */].sign = e.target.dataset.operation;
        const buttons = document.querySelectorAll('.operation');
        for (let i = 0; i < buttons.length; i++) {
            __WEBPACK_IMPORTED_MODULE_0__values__["e" /* field */].node.removeChild(buttons[i]);
        }
        __WEBPACK_IMPORTED_MODULE_0__values__["e" /* field */].node.removeChild(__WEBPACK_IMPORTED_MODULE_0__values__["e" /* field */].node.firstChild);

        const slider = document.querySelector('.slider');
        let thumb = document.querySelector('.thumb');
        const coord = Math.ceil((thumb.getBoundingClientRect().left - slider.getBoundingClientRect().left) / 70);
        __WEBPACK_IMPORTED_MODULE_0__values__["j" /* speed */].speed = coord || 1;
        __WEBPACK_IMPORTED_MODULE_0__values__["e" /* field */].node.removeChild(slider);
        thumb = document.querySelector('.thumb');
        if (thumb) {
            document.body.removeChild(thumb);
        }

        for (let i = 0; i < 3; i++) {
            __WEBPACK_IMPORTED_MODULE_0__values__["e" /* field */].node.removeChild(document.querySelector('.slider-legend'));
        }
        __WEBPACK_IMPORTED_MODULE_0__values__["e" /* field */].node.style.backgroundImage = 'url(./img/field-bg.jpg)';
        document.querySelector('.score').style.display = 'inline-block';
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__objects_player__["d" /* addPlayer */])();
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__objects_player__["a" /* showPlayerMessage */])('HI! <br>' + 'Let\'s start learning! <br> Press any key to start. ;)', true);
        setTimeout(() => {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__values__["b" /* showLevel */])(1);
        }, 1000);
        document.removeEventListener('click', moveThumbByClick);
        document.removeEventListener('click', go);
        __WEBPACK_IMPORTED_MODULE_0__values__["d" /* backButton */].style.display = 'block';
    }, 230);
};

const addSlider = function () {
    const slider = document.createElement('div');
    slider.classList.add('slider');
    const thumb = document.createElement('div');
    thumb.classList.add('thumb');
    __WEBPACK_IMPORTED_MODULE_0__values__["e" /* field */].node.appendChild(slider);
    slider.appendChild(thumb);

    let p = document.createElement('p');
    p.classList.add('slider-legend');
    p.textContent = 'Game speed';
    p.style.cursor = 'default';
    __WEBPACK_IMPORTED_MODULE_0__values__["e" /* field */].node.appendChild(p);
    p.style.bottom = '15px';

    p = document.createElement('p');
    p.classList.add('slider-legend', 'data-lower');
    p.textContent = 'lower';
    __WEBPACK_IMPORTED_MODULE_0__values__["e" /* field */].node.appendChild(p);
    p.style.fontSize = '15px';
    p.style.width = '62px';
    p.style.left = '31.2%';
    p.style.bottom = '49px';

    p = document.createElement('p');
    p.classList.add('slider-legend', 'data-faster');
    p.textContent = 'faster';
    __WEBPACK_IMPORTED_MODULE_0__values__["e" /* field */].node.appendChild(p);
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
        left: rect.left + pageXOffset
    };
    const shiftX = event.pageX - coords.left;
    const shiftY = event.pageY - coords.top;

    const parentRect = document.querySelector('.slider').getBoundingClientRect();

    function moveThumb(e) {
        if (e.pageX - shiftX >= parentRect.left && e.pageX - shiftX <= parentRect.right - target.offsetWidth) {
            target.style.left = `${e.pageX - shiftX}px`;
        }
    }

    function drop() {
        const left = target.style.left;
        const parentWidth = parentRect.right - parentRect.left;
        if (parseInt(left, 10) > parentRect.left && parseInt(left, 10) <= parentRect.left + parentWidth / 2 - 50) {
            target.style.left = `${parentRect.left}px`;
        } else if (parseInt(left, 10) > parentRect.left + parentWidth / 2 - 50 && parseInt(left, 10) <= parentRect.left + parentWidth / 2 + 50) {
            const l = parentRect.left + parentWidth / 2 - target.offsetWidth / 2;
            target.style.left = `${l}px`;
        } else if (parseInt(left, 10) > parentRect.left + parentWidth / 2 + 50) {
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
    if (!e.target.closest('.slider') && !e.target.classList.contains('data-lower') && !e.target.classList.contains('data-faster')) {
        return;
    }

    const thumb = document.querySelector('.thumb');
    const rect = thumb.getBoundingClientRect();
    const coords = {
        top: rect.top + pageYOffset,
        left: rect.left + pageXOffset
    };
    document.body.appendChild(thumb);
    thumb.style.top = `${coords.top}px`;
    thumb.style.left = `${coords.left}px`;
    const parentRect = document.querySelector('.slider').getBoundingClientRect();
    const parentWidth = parentRect.right - parentRect.left;
    const thumbWidth = thumb.offsetWidth;
    const l = parentRect.left + parentWidth / 2 - thumbWidth / 2;

    if (e.target.closest('.slider')) {
        if (e.pageX > parentRect.left + parentWidth / 2 - 20 && e.pageX < parentRect.left + parentWidth / 2 + 20) {
            thumb.style.left = `${l}px`;
        } else if (e.pageX > parentRect.left && e.pageX < parentRect.left + 20) {
            thumb.style.left = `${parentRect.left}px`;
        } else if (e.pageX > parentRect.right - 20 && e.pageX < parentRect.right) {
            thumb.style.left = `${parentRect.right - thumbWidth}px`;
        }
    } else if (e.target.classList.contains('data-lower')) {
        if (coords.left === l || coords.left === parentRect.left) {
            thumb.style.left = `${parentRect.left}px`;
        } else if (coords.left === parentRect.right - thumbWidth) {
            thumb.style.left = `${l}px`;
        }
    } else if (e.target.classList.contains('data-faster')) {
        if (coords.left === l || coords.left === parentRect.right - thumbWidth) {
            thumb.style.left = `${parentRect.right - thumbWidth}px`;
        } else if (coords.left === parentRect.left) {
            thumb.style.left = `${l}px`;
        }
    }

    const coordsThumb = thumb.getBoundingClientRect();
    document.querySelector('.slider').appendChild(thumb);
    thumb.style.top = `${coordsThumb.top - parentRect.top}px`;
    thumb.style.left = `${coordsThumb.left - parentRect.left}px`;
};



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__values__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__objects_player__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__gamestart__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__objects_score__ = __webpack_require__(2);





const gameOver = function (back) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__objects_player__["f" /* delPlayerMessage */])(false);
    setTimeout(backBut => {
        __WEBPACK_IMPORTED_MODULE_0__values__["c" /* player */].style.display = 'none';
        __WEBPACK_IMPORTED_MODULE_0__values__["c" /* player */].style.transform = `translate(0px, 0px) scale(1, 1)`;
        __WEBPACK_IMPORTED_MODULE_0__values__["l" /* scoreField */].style.display = 'none';
        if (!backBut) {
            const p = document.createElement('p');
            p.classList.add('level');
            p.innerHTML = 'GAME OVER';
            __WEBPACK_IMPORTED_MODULE_0__values__["e" /* field */].node.appendChild(p);
            p.style.font = '900 70px Kabel';
            p.style.top = `${p.offsetTop - 100}px`;
            p.style.cursor = 'default';

            const restart = document.createElement('div');
            restart.classList.add('restart');
            restart.textContent = 'Press to restart';
            __WEBPACK_IMPORTED_MODULE_0__values__["e" /* field */].node.appendChild(restart);
            restart.addEventListener('click', restartGame);
        } else {
            const lvl = document.querySelector('.level');
            if (lvl) {
                __WEBPACK_IMPORTED_MODULE_0__values__["e" /* field */].node.removeChild(lvl);
            }
            __WEBPACK_IMPORTED_MODULE_0__values__["d" /* backButton */].classList.remove('animated', 'bounceOut');
            __WEBPACK_IMPORTED_MODULE_0__values__["d" /* backButton */].style.display = 'none';
            __WEBPACK_IMPORTED_MODULE_0__values__["e" /* field */].node.style.backgroundImage = '';
            __WEBPACK_IMPORTED_MODULE_3__objects_score__["b" /* score */].curScore = 0;
            __WEBPACK_IMPORTED_MODULE_0__values__["a" /* level */].num = 1;
            __WEBPACK_IMPORTED_MODULE_0__values__["l" /* scoreField */].textContent = '000';
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__gamestart__["b" /* chooseOperation */])();
        }
    }, 200, back);
};

const restartGame = function (e) {
    if (!e.target.classList.contains('restart')) {
        return;
    }

    __WEBPACK_IMPORTED_MODULE_0__values__["e" /* field */].node.removeChild(e.target);
    __WEBPACK_IMPORTED_MODULE_0__values__["e" /* field */].node.removeChild(document.querySelector('.level'));
    __WEBPACK_IMPORTED_MODULE_0__values__["e" /* field */].node.style.backgroundImage = '';
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__gamestart__["b" /* chooseOperation */])();
};

/* harmony default export */ __webpack_exports__["a"] = (gameOver);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__values__ = __webpack_require__(0);


let count = 0;
let image = null;
let rightArr = null;
let leftArr = null;
let page = null;

const showWiki = function (target) {
    target.classList.add('animated', 'bounceOut');
    setTimeout(() => {
        target.classList.remove('animated', 'bounceOut');
        __WEBPACK_IMPORTED_MODULE_0__values__["h" /* wikiBut */].hidden = true;
        __WEBPACK_IMPORTED_MODULE_0__values__["g" /* startGameBut */].hidden = true;
        document.getElementById('math').hidden = true;
        renderWiki();
    }, 230);
};

const renderWiki = function () {
    image = document.createElement('div');
    image.classList.add('wiki-image');
    __WEBPACK_IMPORTED_MODULE_0__values__["e" /* field */].node.appendChild(image);
    image.style.width = `${__WEBPACK_IMPORTED_MODULE_0__values__["e" /* field */].node.clientWidth * 0.84}px`;
    image.style.height = `${__WEBPACK_IMPORTED_MODULE_0__values__["e" /* field */].node.clientHeight * 0.85}px`;
    image.style.backgroundImage = `url(./img/wiki/choose.png)`;
    image.style.backgroundSize = '701.5% 100%';

    leftArr = document.createElement('div');
    leftArr.classList.add('arrow-left');
    __WEBPACK_IMPORTED_MODULE_0__values__["e" /* field */].node.appendChild(leftArr);

    rightArr = document.createElement('div');
    rightArr.classList.add('arrow-right');
    __WEBPACK_IMPORTED_MODULE_0__values__["e" /* field */].node.appendChild(rightArr);

    page = document.createElement('p');
    page.style.font = '400 22px Kabel';
    page.style.color = '#25196C';
    page.innerHTML = `${count + 1}/7`;
    __WEBPACK_IMPORTED_MODULE_0__values__["e" /* field */].node.appendChild(page);
    page.style.position = 'absolute';
    page.style.left = 'calc(50% - 20px)';
    page.style.bottom = '37px';

    const button = __WEBPACK_IMPORTED_MODULE_0__values__["d" /* backButton */].cloneNode(true);
    __WEBPACK_IMPORTED_MODULE_0__values__["e" /* field */].node.appendChild(button);
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
    } else if (count) {
        count--;
    }

    image.style.backgroundPosition = `${-parseInt(image.style.width, 10) * count}px 0px`;
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
        __WEBPACK_IMPORTED_MODULE_0__values__["e" /* field */].node.removeChild(image);
        __WEBPACK_IMPORTED_MODULE_0__values__["e" /* field */].node.removeChild(leftArr);
        __WEBPACK_IMPORTED_MODULE_0__values__["e" /* field */].node.removeChild(rightArr);
        __WEBPACK_IMPORTED_MODULE_0__values__["e" /* field */].node.removeChild(page);
        __WEBPACK_IMPORTED_MODULE_0__values__["e" /* field */].node.removeChild(target);
        image = null;
        leftArr = null;
        rightArr = null;
        __WEBPACK_IMPORTED_MODULE_0__values__["h" /* wikiBut */].hidden = false;
        __WEBPACK_IMPORTED_MODULE_0__values__["g" /* startGameBut */].hidden = false;
        document.getElementById('math').hidden = false;
    }, 200);

    document.removeEventListener('click', changePage);
    document.removeEventListener('click', backToStart);
    window.removeEventListener('resize', resizeImage);
};

const resizeImage = function () {
    const imageToResize = document.querySelector('.wiki-image');
    imageToResize.style.width = `${__WEBPACK_IMPORTED_MODULE_0__values__["e" /* field */].node.clientWidth * 0.84}px`;
    imageToResize.style.height = `${__WEBPACK_IMPORTED_MODULE_0__values__["e" /* field */].node.clientHeight * 0.85}px`;
};

/* harmony default export */ __webpack_exports__["a"] = (showWiki);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game_values__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__player__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__score__ = __webpack_require__(2);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return createBalloons; });
/* unused harmony export balloons */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ballOnField; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return animateBalloons; });




const balloons = [];
let ballHeight = null;
let bottomBorder = null;
let down = 0;
const ballOnField = { on: false };
let selectedBall = null;
const mix = [0, -12, 11, 0, -11, 0, -9, 0, 12, 0, -8, 0, 13, 9, 0, -12, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

const createBalloons = function (answers) {
    const n = 3;
    if (!__WEBPACK_IMPORTED_MODULE_0__game_values__["e" /* field */].node.querySelector('.balloon')) {
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
                goPx[i] = __WEBPACK_IMPORTED_MODULE_0__game_values__["j" /* speed */].speed;
            } else {
                goPx[i] = __WEBPACK_IMPORTED_MODULE_0__game_values__["j" /* speed */].speed - 1;
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
                } else if (balloons[i].moveTo < -30) {
                    balloons[i].moveTo += Math.abs(mix[ind]);
                }
            } else {
                balloons[i].angle += (balloons[i].moveTo - angle) / Math.abs(balloons[i].moveTo - angle);
            }

            balloons[i].elem.style.transform = `translate(0, ${down}px)` + `rotate(${angle}deg)`;
        }

        if (down + ballHeight >= __WEBPACK_IMPORTED_MODULE_1__player__["e" /* playerCoords */].top - __WEBPACK_IMPORTED_MODULE_0__game_values__["e" /* field */].height * 0.25) {
            let select = null;
            for (let i = 0; i < balloons.length; i++) {
                select = playerChooseBall({
                    width: __WEBPACK_IMPORTED_MODULE_1__player__["e" /* playerCoords */].width,
                    height: __WEBPACK_IMPORTED_MODULE_1__player__["e" /* playerCoords */].height,
                    top: __WEBPACK_IMPORTED_MODULE_1__player__["e" /* playerCoords */].top,
                    left: __WEBPACK_IMPORTED_MODULE_1__player__["e" /* playerCoords */].left
                }, {
                    width: balloons[i].width,
                    height: balloons[i].height,
                    top: balloons[i].top + down,
                    left: balloons[i].left
                });
                if (select) {
                    selectedBall = balloons[i];
                    removeBalloons(selectedBall);
                    select = null;
                    break;
                }
            }
        }
    } else if (ballOnField.on) {
        ballOnField.on = false;
        removeBalloons();
    }
};

const addBalloons = function () {
    let minTop = __WEBPACK_IMPORTED_MODULE_0__game_values__["e" /* field */].height;
    const ballColors = [];
    for (let i = 0; i < balloons.length; i++) {
        __WEBPACK_IMPORTED_MODULE_0__game_values__["e" /* field */].node.appendChild(balloons[i].elem);

        let flag = false;
        let color = null;
        while (!flag) {
            color = Math.round(Math.random() * 8);
            if (!ballColors.includes(color)) {
                flag = true;
                ballColors.push(color);
            }
        }
        balloons[i].elem.style.backgroundPosition = `${75 * color}px 0px`;

        balloons[i].width = balloons[i].elem.offsetWidth;
        balloons[i].height = balloons[i].elem.offsetHeight;
        balloons[i].top = Math.random() * 55 + 45;
        balloons[i].left = Math.random() * (__WEBPACK_IMPORTED_MODULE_0__game_values__["e" /* field */].width - balloons[i].width);
        balloons[i].angle = 0;
        balloons[i].moveTo = balloons[i].angle;

        balloons[i].elem.style.top = `${balloons[i].top}px`;
        let j = 0;
        while (j < i) {
            let mark = false;
            while (Math.abs(balloons[j].left - balloons[i].left) < 100) {
                balloons[i].left = Math.random() * (__WEBPACK_IMPORTED_MODULE_0__game_values__["e" /* field */].width - balloons[i].width);
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

    bottomBorder = __WEBPACK_IMPORTED_MODULE_0__game_values__["e" /* field */].height - minTop;
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
        x: rect1.left + rect1.width / 2,
        y: rect1.top + rect1.height / 2
    };
    const center2 = {
        x: rect2.left + rect2.width / 2,
        y: rect2.top + rect2.height / 2
    };

    const distX = Math.abs(center2.x - center1.x);
    const distY = Math.abs(center2.y - center1.y);
    if (rect1.top - rect2.top < ballHeight * 0.65) {
        if (distX < (rect1.width + rect2.width) / 2 - 5 && distY < (rect1.height + rect2.height) / 2 - 5) {
            return true;
        }
        return false;
    }
};

const removeBalloons = function (selectBall) {
    const num = parseInt(balloons[0].elem.innerHTML, 10);
    for (let i = 0; i < balloons.length; i++) {
        if (selectBall && balloons[i] === selectBall) {
            if (__WEBPACK_IMPORTED_MODULE_0__game_values__["f" /* sound */].on) {
                const audioPop = new Audio('./audio/balloon-pop.ogg');
                audioPop.play();
            }
            checkSelection(selectBall, num);
        }
        __WEBPACK_IMPORTED_MODULE_0__game_values__["e" /* field */].node.removeChild(balloons[i].elem);
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
        __WEBPACK_IMPORTED_MODULE_0__game_values__["m" /* patrick */].style.backgroundPosition = '0px 0px';
        __WEBPACK_IMPORTED_MODULE_0__game_values__["n" /* exampleField */].style.display = 'none';
        __WEBPACK_IMPORTED_MODULE_0__game_values__["m" /* patrick */].style.display = 'none';
    }, 1000);
};

const checkSelection = function (selectBall, num) {
    if (selectBall === balloons[0]) {
        explode(selectBall, 0);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__score__["d" /* changeScore */])(100);
        __WEBPACK_IMPORTED_MODULE_0__game_values__["c" /* player */].style.backgroundPosition = '-200px 0px';
        __WEBPACK_IMPORTED_MODULE_0__game_values__["m" /* patrick */].style.backgroundPosition = '-80px 0px';
        setTimeout(() => {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__player__["a" /* showPlayerMessage */])('You\'re genius! :)', true);
            __WEBPACK_IMPORTED_MODULE_0__game_values__["c" /* player */].style.backgroundPosition = '0px 0px';
        }, 1000);
    } else {
        if (selectBall) {
            explode(selectBall, 1);
        }
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__score__["d" /* changeScore */])(-50);
        __WEBPACK_IMPORTED_MODULE_0__game_values__["c" /* player */].style.backgroundPosition = '-300px 0px';
        __WEBPACK_IMPORTED_MODULE_0__game_values__["m" /* patrick */].style.backgroundPosition = '-160px 0px';
        if (!__WEBPACK_IMPORTED_MODULE_2__score__["a" /* endOfGame */].end) {
            if (selectBall) {
                setTimeout(() => {
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__player__["a" /* showPlayerMessage */])(`Think better! <br> It's `, true, num);
                    __WEBPACK_IMPORTED_MODULE_0__game_values__["c" /* player */].style.backgroundPosition = '0px 0px';
                }, 1000);
            } else {
                setTimeout(() => {
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__player__["a" /* showPlayerMessage */])('Hurry up, my Friend!', true, num);
                    __WEBPACK_IMPORTED_MODULE_0__game_values__["c" /* player */].style.backgroundPosition = '0px 0px';
                }, 1000);
            }
        } else {
            setTimeout(() => {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__player__["a" /* showPlayerMessage */])('OH! NO!', false);
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
    } else if (left + 256 > __WEBPACK_IMPORTED_MODULE_0__game_values__["e" /* field */].width) {
        explosion.style.left = `${__WEBPACK_IMPORTED_MODULE_0__game_values__["e" /* field */].width - 256}px`;
    } else {
        explosion.style.left = `${left}px`;
    }

    if (top + 256 > __WEBPACK_IMPORTED_MODULE_0__game_values__["e" /* field */].height) {
        explosion.style.top = `${__WEBPACK_IMPORTED_MODULE_0__game_values__["e" /* field */].height - 256}px`;
    } else if (top < 0) {
        explosion.style.top = 0;
    } else {
        explosion.style.top = `${top}px`;
    }

    __WEBPACK_IMPORTED_MODULE_0__game_values__["e" /* field */].node.appendChild(explosion);
    setTimeout(() => {
        __WEBPACK_IMPORTED_MODULE_0__game_values__["e" /* field */].node.removeChild(explosion);
    }, 1200);
};



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game_values__ = __webpack_require__(0);
/* unused harmony reexport exampleField */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return startExample; });


let exampleInField = false;
let answers = [];

const startExample = function () {
    const style = getComputedStyle(__WEBPACK_IMPORTED_MODULE_0__game_values__["n" /* exampleField */]);
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
    let max = 10 * __WEBPACK_IMPORTED_MODULE_0__game_values__["a" /* level */].num;
    if (__WEBPACK_IMPORTED_MODULE_0__game_values__["a" /* level */].num > 5) {
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
        return Math.abs(Math.min(Math.round(rand * (2 * m) - m), Math.round(rand * answer)));
    }

    function generator(sign) {
        const operands = [];
        let answer = 0;
        switch (sign) {
            case '+':
                {
                    for (let i = 0; i < n; i++) {
                        operands[i] = Math.round(Math.random() * max);
                    }
                    example = `${operands[0]} + ${operands[1]} = ...`;
                    answer = operands[0] + operands[1];
                    break;
                }
            case '-':
                {
                    for (let i = 0; i < n; i++) {
                        operands[i] = Math.round(Math.random() * max);
                    }
                    operands.sort(sorting);
                    example = `${operands[1]} - ${operands[0]} = ...`;
                    answer = operands[1] - operands[0];
                    break;
                }
            case '*':
                {
                    for (let i = 0; i < n; i++) {
                        operands[i] = Math.round(Math.random() * max + 1);
                        max = Math.floor(100 / operands[i]) - 1;
                    }
                    example = `${operands[0]} &#215 ${operands[1]} = ...`;
                    answer = operands[0] * operands[1];
                    break;
                }
            case '/':
                {
                    max *= 2;
                    for (let i = 0; i < n; i++) {
                        operands[i] = Math.round(Math.random() * max + i);
                        max = operands[i] / 2;
                    }
                    if (operands[0] % operands[1]) {
                        operands[0] = operands[1] * Math.round(operands[0] / operands[1]);
                    }
                    example = `${operands[0]} &#247 ${operands[1]} = ...`;
                    answer = operands[0] / operands[1];
                    break;
                }
            default:
                break;
        }

        return [answer, answer + generateNum(10, answer), answer + generateNum(10, answer)];
    }

    if (__WEBPACK_IMPORTED_MODULE_0__game_values__["i" /* operation */].sign.length === 1) {
        answers = generator(__WEBPACK_IMPORTED_MODULE_0__game_values__["i" /* operation */].sign);
    } else {
        answers = generator(__WEBPACK_IMPORTED_MODULE_0__game_values__["i" /* operation */].sign[Math.round(Math.random() * 3)]);
    }

    for (let i = 0; i < answers.length; i++) {
        for (let j = i + 1; j < answers.length; j++) {
            if (answers[i] === answers[j]) {
                answers[j]++;
            }
        }
    }

    __WEBPACK_IMPORTED_MODULE_0__game_values__["n" /* exampleField */].innerHTML = example;
    exampleInField = true;
};



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__gamestart__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__objects_player__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__objects_examples__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__objects_score__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__values__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__objects_balloons__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__gameover__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__wiki__ = __webpack_require__(5);









let audio = null;

const mainFunc = function main() {
    if (!__WEBPACK_IMPORTED_MODULE_3__objects_score__["a" /* endOfGame */].end) {
        render();

        const answers = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__objects_examples__["a" /* startExample */])();
        if (answers) {
            setTimeout(() => {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__objects_balloons__["a" /* createBalloons */])(answers);
            }, 3000);
        }

        if (__WEBPACK_IMPORTED_MODULE_3__objects_score__["b" /* score */].curScore && Math.floor(__WEBPACK_IMPORTED_MODULE_3__objects_score__["b" /* score */].curScore / 1000) === __WEBPACK_IMPORTED_MODULE_4__values__["a" /* level */].num) {
            levelUp();
        }
    } else {
        __WEBPACK_IMPORTED_MODULE_3__objects_score__["a" /* endOfGame */].end = false;
        setTimeout(__WEBPACK_IMPORTED_MODULE_6__gameover__["a" /* default */], 2000);
    }

    requestAnimationFrame(main);
};

const levelUp = function () {
    __WEBPACK_IMPORTED_MODULE_4__values__["a" /* level */].num = Math.floor(__WEBPACK_IMPORTED_MODULE_3__objects_score__["b" /* score */].curScore / 1000) + 1;
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__values__["b" /* showLevel */])(__WEBPACK_IMPORTED_MODULE_4__values__["a" /* level */].num);
    __WEBPACK_IMPORTED_MODULE_4__values__["c" /* player */].style.backgroundPosition = '-400px 0px';
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__objects_player__["a" /* showPlayerMessage */])('HEY-HEY! <br> Wonderfu-u-ul! <br> Level UP!');
};

const render = function () {
    if (__WEBPACK_IMPORTED_MODULE_1__objects_player__["b" /* jumpHeight */].height) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__objects_player__["c" /* playerJump */])();
    }

    if (__WEBPACK_IMPORTED_MODULE_5__objects_balloons__["b" /* ballOnField */].on) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__objects_balloons__["c" /* animateBalloons */])();
    }

    if (__WEBPACK_IMPORTED_MODULE_3__objects_score__["c" /* count */].left) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__objects_score__["d" /* changeScore */])();
    }
};

const backFunc = function () {
    __WEBPACK_IMPORTED_MODULE_4__values__["d" /* backButton */].classList.add('animated', 'bounceOut');
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__gameover__["a" /* default */])(true);
};

const loadImgAudio = function () {
    const sources = ['./img/kids-math-game.jpg', './img/wiki/choose.png', './img/field-bg.jpg', './img/Spongebob.png', './img/Patrick.png', './img/explosion.png', './img/balloons.png'];

    const div = document.createElement('div');
    div.style.position = 'absolute';
    div.style.top = 0;
    div.style.left = 0;
    div.style.visibility = 'hidden';
    document.body.appendChild(div);
    div.innerHTML = `<img src="${sources.join('" /><img src="')}" />`;
    const lastImg = div.lastChild;
    lastImg.onload = () => {
        document.body.removeChild(div);
    };

    if (!audio && document.getElementById('audio')) {
        audio = document.getElementById('audio');
        document.forms[0].style.marginLeft = `calc(50% + ` + `${__WEBPACK_IMPORTED_MODULE_4__values__["e" /* field */].width / 2 - 60}px)`;
        document.forms[0].style.display = 'block';
        document.forms[0].elements[0].addEventListener('change', mute);
    }
    const audioLoad = new Audio();
    audioLoad.src = './audio/player-jump.ogg';
    audioLoad.src = './audio/balloon-pop.ogg';
};

const mute = function (e) {
    if (e.target.checked) {
        audio.play();
        __WEBPACK_IMPORTED_MODULE_4__values__["f" /* sound */].on = true;
    } else {
        audio.pause();
        __WEBPACK_IMPORTED_MODULE_4__values__["f" /* sound */].on = false;
    }
};

const start = function (e) {
    const target = e.target;
    if (target === __WEBPACK_IMPORTED_MODULE_4__values__["g" /* startGameBut */]) {
        document.removeEventListener('click', start);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__gamestart__["a" /* startGame */])(target);
    } else if (target === __WEBPACK_IMPORTED_MODULE_4__values__["h" /* wikiBut */]) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__wiki__["a" /* default */])(target);
    }

    return false;
};

document.addEventListener('DOMContentLoaded', loadImgAudio);
document.addEventListener('click', start);
setTimeout(() => {
    __WEBPACK_IMPORTED_MODULE_4__values__["g" /* startGameBut */].classList.add('animated', 'pulse', 'infinite');
}, 3500);

__WEBPACK_IMPORTED_MODULE_4__values__["d" /* backButton */].addEventListener('click', backFunc);

mainFunc();

/***/ })
/******/ ]);
//# sourceMappingURL=build.js.map