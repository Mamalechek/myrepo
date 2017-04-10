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

let player = document.getElementById('player');
let field = document.querySelector('.field');
let fieldHeight = field.clientHeight;
let fieldWidth = field.clientWidth;
let startGameBut = document.querySelector('.start');
let wikiBut = document.querySelector('.wiki');
let exampleField = document.querySelector('.example');
let scoreField = document.querySelector('.score');
let patrick = document.querySelector('.patrick');
let backButton = document.querySelector('.back-to-operation');

let level = {num: 1};
let operation = {sign: ''};
let speed = {speed: 1};

const showLevel = function(lvl) {
    let level = document.createElement('p');
    level.classList.add('level','animated', 'flipInX');
    level.textContent = `LEVEL ${lvl}`;
    field.appendChild(level);
    setTimeout( function() {
        if(document.querySelector('.level'))
            field.removeChild(level);
    }, 1000 );
}


const count = function() {
    let colors = ['red', 'yellow', 'green', 'orange', 'purple'];
    exampleField.style.display = 'inline-block';
    patrick.style.display = 'inline-block';
    player.style.backgroundPosition = '0px 0px';
    
    let countField = document.createElement('p');
    countField.classList.add('count', 'animated', 'zoomIn', 'infinite');
    field.appendChild(countField);
    
    function getColor() {
        let colorIndex = Math.round(Math.random() * 5);
        countField.style.color = colors[colorIndex];
    }

    setTimeout( (index) => {
        getColor();
        countField.textContent = `${index}`;
        setTimeout( (index) => {
            getColor();
            countField.textContent = `${index}`;
            setTimeout( (index) => {
                getColor();
                countField.textContent = `${index}`;
            }, 1020, 1);
        }, 1020, 2);
    
    }, 0, 3);

    setTimeout( () => {
        field.removeChild(countField);
    }, 3000);
}


module.exports = {
    player,
    field,
    fieldHeight,
    fieldWidth,
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

let { field, fieldHeight, fieldWidth, count, player, backButton } = __webpack_require__(0);
let { endOfGame } = __webpack_require__(2);

let playerCoords = {};
let pressedKeys = {};
let playerInJump = false;
let jumpHeight = {height: 0};
let jumpUp = true;
let leftBorder = null;
let startCounting = false;

function addPlayer() {
    player.style.backgroundPosition = '0px 0px';
    player.style.display = "inline-block";
    document.addEventListener('keydown', movePlayer);
    document.addEventListener('keyup', removeKey);
    leftBorder = fieldWidth-player.offsetWidth;

    getPlayerCoords();
}

const getPlayerCoords = function() {
    playerCoords.top = player.offsetTop;
    playerCoords.left = player.offsetLeft;
    playerCoords.height = player.offsetHeight;
    playerCoords.width = player.offsetWidth;
}

const movePlayer = function(e) {
    let target = e.target;
    let key = e.keyCode;

    if(key != 39 && key != 68 && key != 37 && key != 65 && key != 38 && key != 87)
        return;

    if(!pressedKeys[key])
        pressedKeys[key] = true;
    
    if(key === 38 || key === 87 || (pressedKeys['38'] || pressedKeys['87'])) {
        if(!playerInJump) {
            playerInJump = true;
            playerJump();
        }
    }
    else
    if((key === 39 || key === 68) && !(pressedKeys['37'] || pressedKeys['65'])) {
        moveRight();
    }
    else
    if((key === 37 || key === 65) && !(pressedKeys['39'] || pressedKeys['68'])) {
        moveLeft();
    }
}

const removeKey = function(e) {
    if(e.keyCode in pressedKeys) {
        delete pressedKeys[e.keyCode];
        player.style.backgroundPosition = '0px 0px';
    }
}

const moveRight = function() {
    let matrix = getComputedStyle(player).transform;
    let leftMove = parseInt(matrix.split(',')[4]) + 5;
    let upPos = parseInt(matrix.split(',')[5]);
    if(playerCoords.left <= leftBorder) {
        player.style.transform = `translate(${leftMove}px, ${upPos}px) scale(1, 1)`;
        player.style.backgroundPosition = '-100px 0px'; 
        playerCoords.left += 5;
    }
}

const moveLeft = function() {
    let matrix = getComputedStyle(player).transform;
    let rightMove = parseInt(matrix.split(',')[4]) - 5;
    let upPos = parseInt(matrix.split(',')[5]);
    if(playerCoords.left >= 0) {
        player.style.transform = `translate(${rightMove}px, ${upPos}px) scale(-1, 1)`;
        player.style.backgroundPosition = '-100px 0px'; 
        playerCoords.left -= 5;
    }
}

const playerJump = function jump() {
    if(pressedKeys['39'] || pressedKeys['68'])
        moveRight();
    else
    if(pressedKeys['37'] || pressedKeys['65'])
        moveLeft();

    let matrix = getComputedStyle(player).transform;
    let scale = matrix.split(',')[0];
    if(scale.indexOf('-') === -1)
        scale = parseInt(scale.slice(-1));
    else
        scale = parseInt(scale.slice(-2));

    
    let leftPos = parseInt(matrix.split(',')[4]);
    let upPos = parseInt(matrix.split(',')[5]);
    
    if(jumpHeight.height < (fieldHeight * 0.25) && jumpUp) {
        jumpHeight.height += 3;
        playerCoords.top -= 3;
    }
    else {
        jumpHeight.height -= 3;
        playerCoords.top += 3;
        jumpUp = false;
    }
    
    player.style.transform = `translate(${leftPos}px, -${jumpHeight.height}px) scale(${scale}, 1)`;

    if(jumpHeight.height <= 0) {
        jumpUp = true;
        playerInJump = false;
        let count = null;
        for(let i in pressedKeys)
            count = i;
        if(count) {
            let event = new Event('keydown');
            event.keyCode = parseInt(count);
            document.dispatchEvent(event);
        }
    }
}

const showPlayerMessage = function(message, counting, span)  {
    let curMessage = document.querySelector('.player-message');
    if(!curMessage) {
        let playerMessage = document.createElement('div');
        playerMessage.classList.add('player-message');
        playerMessage.innerHTML = message;
        if(span !== undefined) {
            playerMessage.appendChild(document.createElement('span'));
            playerMessage.lastChild.style.color = 'blue';
            playerMessage.lastChild.innerHTML = span;
            playerMessage.innerHTML += '!'
        }

        if(playerCoords.left + 220 < leftBorder)  {
            playerMessage.classList.add('left-message');
            playerMessage.style.left = playerCoords.left + 20 + 'px';
        }
        else {
            playerMessage.classList.add('right-message');
            playerMessage.style.left = playerCoords.left - 180 + 'px';
        }
        
        field.appendChild(playerMessage);
        playerMessage.style.top = playerCoords.top - playerMessage.offsetHeight - 70 + 'px';
        document.addEventListener('keydown', delPlayerMessage);
        document.addEventListener('click', delPlayerMessage);
        startCounting = counting;
    }
    else {
        curMessage.innerHTML +=`<br>${message}`;
        curMessage.style.top = playerCoords.top - curMessage.offsetHeight - 70 + 'px';
        startCounting = true;
    }
    
    if(startCounting)
        backButton.style.display = 'block';
}

const delPlayerMessage = function(mark) {
    let playerMessage = field.querySelector('.player-message');
    if(playerMessage) {
        field.removeChild(playerMessage);
        document.removeEventListener('keydown', delPlayerMessage);
        document.removeEventListener('click', delPlayerMessage);

        if(mark != false)
            player.style.backgroundPosition = '0px 0px';
        
        if(startCounting && mark != false) {
            startCounting = false;
            backButton.style.display = 'none';
            count();
        }
    }
}


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

let { field, scoreField } = __webpack_require__(0);

let count = {left: 0};
let changes = {};
let endOfGame = {end: false};
let score = {curScore: parseInt(scoreField.textContent)};

const changeScore = function(change) {
    if(!Object.keys(changes).length) {
        changes.curScore = score.curScore;
        changes.change = change;
    }

    if(changes.curScore + changes.change >= 0) {
            
        let style = getComputedStyle(scoreField);
        if(style.display != 'none') {
            if( count.left == changes.change || !changes.change) {
                count.left = 0;
                delete changes.curScore;
                delete changes.change;
            }
            else {
                score.curScore = changes.curScore + count.left + ( changes.change / Math.abs(changes.change) );
                let times = (100).toString(10).length-score.curScore.toString(10).length > 0 ? (100).toString(10).length-score.curScore.toString(10).length : 0;
                scoreField.textContent = '0'.repeat(times) + score.curScore;

                count.left += ( changes.change / Math.abs(changes.change) );
            }
        }
    }
    else {
        endOfGame.end = true;
        delete changes.curScore;
        delete changes.change;
    }
}

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

let { field, startGameBut, wikiBut, showLevel, operation, speed, backButton} = __webpack_require__(0);
let { addPlayer, showPlayerMessage } = __webpack_require__(1);
let { showWiki } = __webpack_require__(8);

const startGame = function(e) {
    let target = e.target;
    if(target === startGameBut)    {
        target.classList.remove('animated', 'pulse', 'infinite');
        target.classList.add('animated', 'bounceOut');
        setTimeout( () => {
            field.removeChild(target);
            field.removeChild(wikiBut);
            document.getElementById('math').hidden = true;
            chooseOperation();
        }, 230 );
    }
    else
    if(target === wikiBut) {
        target.classList.add('animated', 'bounceOut');
        setTimeout( () => {
            target.classList.remove('animated', 'bounceOut');
            wikiBut.hidden = true;
            startGameBut.hidden = true;
            document.getElementById('math').hidden = true;
            showWiki();
        }, 230 );
    }

    return false;
}

const chooseOperation = function() {
    let p = document.createElement('p');
    p.classList.add('level');
    p.textContent = 'Choose the operation:';
    field.insertBefore(p, field.firstChild);
    p.style.font = '900 50px Kabel';
    p.style.color = '#25196C';
    p.style.top = '3.5%';

      for(let i = 0; i < 5; i++) {
        let button = document.createElement('div');
        button.classList.add('operation');
        button.appendChild(document.createElement('span'));
        button.firstChild.style.marginRight = 20+'px';
        switch(i) {
            case 0:
                button.dataset.operation = button.firstChild.innerHTML = '+';
                button.appendChild(document.createTextNode('addition'));
                break;
            case 1:
                button.dataset.operation = button.firstChild.innerHTML = '-';
                button.firstChild.style.verticalAlign = 'top';
                button.appendChild(document.createTextNode('subtraction'));
                button.style.backgroundColor = '#3DC8FF';
                break;
            case 2:
                button.dataset.operation = '*';
                button.firstChild.innerHTML = '&#215';
                button.appendChild(document.createTextNode('product'));
                button.style.backgroundColor = '#FF3DBA';
                break;
            case 3:
                button.dataset.operation = '/';
                button.firstChild.innerHTML = '&#247';
                button.firstChild.style.verticalAlign = 'top';
                button.appendChild(document.createTextNode('division'));
                button.style.backgroundColor = '#FFB733';
                break;
            case 4:
                button.dataset.operation = '+-*/';
                button.firstChild.style.verticalAlign = 'top';
                button.appendChild(document.createTextNode('mix'));
                button.style.backgroundColor = '#3333FF';
                break;
        }
        field.appendChild(button);
        button.classList.add('animated', 'bounceInRight');
        button.style.top = button.offsetTop + (button.offsetHeight+15)*i +`px`;
        button.addEventListener('mouseover', (e) => {
            if(e.target.classList.contains('bounceInRight'))
                e.target.classList.remove('bounceInRight');
            e.target.classList.add('animated', 'pulse', 'infinite');
        });

        button.addEventListener('mouseout', (e) => {
            e.target.classList.remove('animated', 'pulse', 'infinite');
        });
    }

    addSlider();
    document.addEventListener('click', go);
}

const go = function(e) {
    if(!e.target.classList.contains('operation'))
        return;

    operation.sign = e.target.dataset.operation;
    let buttons = document.querySelectorAll('.operation');
    for(let i = 0; i < buttons.length; i++)
        field.removeChild(buttons[i]);
    field.removeChild(field.firstChild);
    let slider = document.querySelector('.slider');
    let thumb = document.querySelector('.thumb');
    let coord = Math.ceil((thumb.getBoundingClientRect().left - slider.getBoundingClientRect().left) / 70);
    speed.speed = coord ? coord : 1;
    field.removeChild(slider);
    thumb = document.querySelector('.thumb');
    if(thumb)
        document.body.removeChild(thumb);

    for(let i = 0; i < 3; i++)
        field.removeChild(document.querySelector('.slider-legend'));
    
    field.style.backgroundImage = 'url(./img/field-bg.jpg)';
    document.querySelector('.score').style.display = "inline-block";
    addPlayer();
    showPlayerMessage('HI! <br> Let\'s start learning! <br> Press any key to start. ;)', true);
    setTimeout(() => { 
            showLevel(1);
        }, 1000);
    document.removeEventListener('click', moveThumbByClick);
    document.removeEventListener('click', go);
    backButton.style.display = 'block';
}

const addSlider = function(e) {
    let slider = document.createElement('div');
    slider.classList.add('slider');
    let thumb = document.createElement('div');
    thumb.classList.add('thumb');
    field.appendChild(slider);
    slider.appendChild(thumb);

    let p = document.createElement('p');
    p.classList.add('slider-legend');
    p.textContent = 'Game speed';
    p.style.cursor = 'default';
    field.appendChild(p);
    p.style.bottom = 15 + 'px';

    p = document.createElement('p');
    p.classList.add('slider-legend', 'data-lower');
    p.textContent = 'lower';
    field.appendChild(p);
    p.style.fontSize = '15px'
    p.style.width = '90px'
    p.style.left = '29.5%';
    p.style.bottom = 49 + 'px';

    p = document.createElement('p');
    p.classList.add('slider-legend', 'data-faster');
    p.textContent = 'faster';
    field.appendChild(p);
    p.style.fontSize = '15px';
    p.style.width = '90px';
    p.style.left = '61.5%';
    p.style.bottom = 49 + 'px';

    div = document.createElement('div');
    slider.appendChild(div);
    div.style.height = '20px';
    div.style.border = '1px solid #25196C';
    div.style.position = 'absolute';
    div.style.top = '-2px';
    div.style.left = 'calc(50% - 1px)';

    thumb.addEventListener('dragstart', () => { return false});
    document.addEventListener('mousedown', changeSpeed);
    document.addEventListener('click', moveThumbByClick);
}

const changeSpeed = function(e) {
    let target = e.target;
    if(!target.classList.contains('thumb'))
        return;
    
    function moveThumb(e) {
        if(e.pageX - shiftX >= parentRect.left && e.pageX - shiftX <= parentRect.right-target.offsetWidth)
            target.style.left = e.pageX - shiftX + 'px';
    }

    function drop(e) {
        let left = target.style.left;
        let parentWidth = parentRect.right-parentRect.left;
        if(parseInt(left) > parentRect.left && parseInt(left) <= parentRect.left+parentWidth/2-50)
            target.style.left = parentRect.left + 'px';
        else
        if(parseInt(left) > parentRect.left+parentWidth/2-50 && parseInt(left) <= parentRect.left+parentWidth/2+50)
            target.style.left = parentRect.left+parentWidth/2-target.offsetWidth/2 + 'px';
        else
        if(parseInt(left) > parentRect.left+parentWidth/2+50)
            target.style.left = parentRect.right-target.offsetWidth + 'px';


        document.removeEventListener('mousemove', moveThumb);
        document.removeEventListener('mouseup', drop);
    }

    let rect = target.getBoundingClientRect();
    let coords = {
        top: rect.top + pageYOffset,
        left: rect.left + pageXOffset
    };
    let shiftX = e.pageX - coords.left;
    let shiftY = e.pageY - coords.top;

    let parentRect = document.querySelector('.slider').getBoundingClientRect();
    document.body.appendChild(target);
    target.style.top = e.pageY - shiftY + 'px';
    moveThumb(e);

    document.addEventListener('mousemove', moveThumb);
    document.addEventListener('mouseup', drop);
}

const moveThumbByClick = function(e) {
    if(!e.target.closest('.slider') || !e.target.classList.contains('data-lower') || !e.target.classList.contains('data-faster'))
        return;

    let thumb = document.querySelector('.thumb');
    let rect = thumb.getBoundingClientRect();
    let coords = {
        top: rect.top + pageYOffset,
        left: rect.left + pageXOffset
    };
    document.body.appendChild(thumb);
    thumb.style.top = coords.top + 'px';
    thumb.style.left = coords.left + 'px';
    let parentRect = document.querySelector('.slider').getBoundingClientRect();
    let parentWidth = parentRect.right-parentRect.left;
    let thumbWidth = thumb.offsetWidth;

    if(e.target.closest('.slider')) {
        if(e.pageX > parentRect.left+parentWidth/2-20 && e.pageX < parentRect.left+parentWidth/2+20) {
            thumb.style.left = parentRect.left+parentWidth/2-thumbWidth/2 + 'px';
        }
        else
        if(e.pageX > parentRect.left && e.pageX < parentRect.left+20) {
            thumb.style.left = parentRect.left + 'px';
        }
        else
        if(e.pageX > parentRect.right-20 && e.pageX < parentRect.right) {
            thumb.style.left = parentRect.right-thumbWidth + 'px';
        }
    }
    else 
    if(e.target.classList.contains('data-lower')) {
        if(coords.left === parentRect.left+parentWidth/2-thumbWidth/2 || coords.left === parentRect.left)
            thumb.style.left = parentRect.left + 'px';
        else
        if(coords.left === parentRect.right-thumbWidth)
            thumb.style.left = parentRect.left+parentWidth/2-thumbWidth/2 + 'px';
    }
    else 
    if(e.target.classList.contains('data-faster')) {
        if(coords.left === parentRect.left+parentWidth/2-thumbWidth/2 || coords.left === parentRect.right-thumbWidth)
            thumb.style.left = parentRect.right-thumbWidth + 'px';
        else
        if(coords.left === parentRect.left)
            thumb.style.left = parentRect.left+parentWidth/2-thumbWidth/2 + 'px';
    }
}

setTimeout(function() {
    startGameBut.classList.add('animated', 'pulse', 'infinite');
}, 3500);
document.addEventListener('click', startGame);

module.exports = {
    chooseOperation,
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

let { field, fieldHeight, fieldWidth, exampleField, patrick, player, speed } = __webpack_require__(0);
let { playerCoords, showPlayerMessage } = __webpack_require__(1);
let { score, changeScore, endOfGame } = __webpack_require__(2);

let balloons = [];
let ballHeight = null;
let bottomBorder = null;
let down = 0;
let ballOnField = {on: false};
let selectedBall = null;
let mix = [0, -12, 11, 0, -11, 0, -9, 0, 12, 0, -8, 0, 13, 9, 0, -12, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

const createBalloons = function(answers) {
    let n = 3;
    if(!field.querySelector('.balloon')) {
        for(let i = 0; i < n; i++) {
            balloons[i] = {};
            balloons[i].elem = document.createElement('div');
            balloons[i].elem.classList.add('balloon');
            balloons[i].elem.textContent = answers[i];
        }
        
        selectedBall = null;
        animateBalloons();
    }
}

const animateBalloons = function() {
    if(!ballOnField.on && !down && !selectedBall) {
        addBalloons();
    }
    
    if(down <= bottomBorder && balloons[0]) {
        let goPx = [];
        for(let i = 0; i < 12; i++)
            if(i % 5)
                goPx[i] = speed.speed;
            else 
                goPx[i] = speed.speed-1;

        let index = Math.round(Math.random() * 11);
        down += goPx[index];
        
        for(let i = 0; i < balloons.length; i++) {
            if(balloons[i].angle === balloons[i].moveTo) {
                let index = Math.round(Math.random() * 27);
                balloons[i].moveTo += mix[index];
                if(balloons[i].moveTo > 30)
                        balloons[i].moveTo -= Math.abs(mix[index]);
                if(balloons[i].moveTo < -30)
                        balloons[i].moveTo += Math.abs(mix[index]);
            }
            else
                balloons[i].angle += (balloons[i].moveTo-balloons[i].angle) / Math.abs(balloons[i].moveTo-balloons[i].angle);

            balloons[i].elem.style.transform = `translate(0, ${down}px) rotate(${balloons[i].angle}deg)`;
        }

        if(down + ballHeight >= playerCoords.top - fieldHeight * 0.25) {
            let select = null;
            for(let i = 0; i < balloons.length; i++) {
                select = playerChooseBall( {
                        width: playerCoords.width,
                        height: playerCoords.height,
                        top: playerCoords.top,
                        left: playerCoords.left
                    }, {
                        width: balloons[i].width,
                        height: balloons[i].height,
                        top: balloons[i].top + down,
                        left: balloons[i].left
                    });
                if(select) {
                    selectedBall = balloons[i];
                    removeBalloons(selectedBall);
                    select = null;
                    break;
                }
            }
        }
    }
    else 
    if(ballOnField.on) {
        ballOnField.on = false;
        removeBalloons();
    }
}

const addBalloons = function() {
    let minTop = fieldHeight;
    let ballColors = [];
    for(let i = 0; i < balloons.length; i++) {
        field.appendChild(balloons[i].elem);
                
        let flag = false;
        let color = null;
        while(!flag) {
            color = Math.round(Math.random() * 8);
            if(!(ballColors.includes(color))) {
                flag = true;
                ballColors.push(color);
            }
        }
        balloons[i].elem.style.backgroundPosition = `${75*color}px 0px`;
        
        balloons[i].width = balloons[i].elem.offsetWidth;
        balloons[i].height = balloons[i].elem.offsetHeight;
        balloons[i].top = Math.random() * 55 + 45;
        balloons[i].left = Math.random() * (fieldWidth-balloons[i].width);
        balloons[i].angle = 0;
        balloons[i].moveTo = balloons[i].angle;

        balloons[i].elem.style.top = balloons[i].top + 'px';
        
        let j = 0;
        while(j < i) {
            let mark = false;
            while(Math.abs(balloons[j].left - balloons[i].left) < 100) {
                balloons[i].left = Math.random() * (fieldWidth-balloons[i].width);
                mark = true;
            }
            j++;
            if(mark)
                j = 0;
        }

        balloons[i].elem.style.left = balloons[i].left + 'px';
        if(minTop > balloons[i].top)
            minTop = balloons[i].top;
    }
    
    bottomBorder = fieldHeight - minTop;
    ballHeight = balloons[0].elem.offsetHeight;
    ballOnField.on  = true;
    document.addEventListener('click', selectBalloon);
}

const selectBalloon = function(e) {
    let target = e.target;
    selectedBall = true;
    for(let i = 0; i < balloons.length; i++)
        if(balloons[i].elem === target) {
            removeBalloons(balloons[i]);
            break;
        }
    e.stopPropagation();
}

const playerChooseBall = function(rect1, rect2) {
    let center1 = { x: rect1.left+rect1.width/2, y: rect1.top+rect1.height/2 }
    let center2 = { x: rect2.left+rect2.width/2, y: rect2.top+rect2.height/2 }
    
    if(rect1.top - rect2.top < ballHeight*0.65)
        if(( Math.abs(center2.x-center1.x) < (rect1.width+rect2.width)/2-5 ) &&
            ( Math.abs(center2.y-center1.y) < (rect1.height+rect2.height)/2-5 ))
                return true;
        else
            return false;
}

const removeBalloons = function(selectedBall) {
    let num = parseInt(balloons[0].elem.innerHTML);
    for(let i = 0; i < balloons.length; i++) {
        if(selectedBall && balloons[i] === selectedBall) {
            checkSelection(selectedBall, num);
        }
        field.removeChild(balloons[i].elem);
        balloons[i] = null;
    }
    
    if(!selectedBall) {
        checkSelection();
    }

    bottomBorder = null;
    down = 0;
    angle = 0;
    ballOnField.on = false;
    document.removeEventListener('click', selectBalloon);
    
    setTimeout( () => {
        patrick.style.backgroundPosition = '0px 0px';
        exampleField.style.display = 'none';
        patrick.style.display = 'none';
    }, 1000);
}

const checkSelection = function(selectedBall, num) {
    if(selectedBall === balloons[0]) {
        explode(selectedBall, 0);
        changeScore(100);
        player.style.backgroundPosition = '-200px 0px'; 
        patrick.style.backgroundPosition = '-80px 0px';
        setTimeout(() => { 
            showPlayerMessage('You\'re genius! :)', true);
            player.style.backgroundPosition = '0px 0px';
        }, 1000);
    }
    else {
        if(selectedBall)
              explode(selectedBall, 1);
        changeScore(-50);
        player.style.backgroundPosition = '-300px 0px'; 
        patrick.style.backgroundPosition = '-160px 0px';
           
        if(!endOfGame.end) {
            if(selectedBall) {
                setTimeout(() => { 
                    showPlayerMessage(`Think better! <br> It\'s `, true, num); 
                    player.style.backgroundPosition = '0px 0px';
                }, 1000);
            }
            else {
                setTimeout(() => { 
                    showPlayerMessage('Hurry up, my Friend!', true, num); 
                    player.style.backgroundPosition = '0px 0px';
                }, 1000);
            }
        }
        else {
            setTimeout(() => { 
                showPlayerMessage('OH! NO!', false); 
           }, 1000);
        }
    }
}

const explode = function(selectedBall, offset) {
    let explosion = document.createElement('div');
    explosion.classList.add('explosion', 'animated', 'zoomIn');
    explosion.style.backgroundPosition = `${256*offset}px 0px`;

    let top = selectedBall.top + down - 100;
    let left = selectedBall.left - 90;

    if(left < 0)
        explosion.style.left = 0;
    else
    if(left + 256 > fieldWidth)
        explosion.style.left = fieldWidth - 256 + 'px';
    else
        explosion.style.left = left + 'px';

    if(top + 256 > fieldHeight)
        explosion.style.top = fieldHeight - 256 + 'px';
    else
    if(top < 0)
        explosion.style.top = 0;
    else
        explosion.style.top = top + 'px';

    field.appendChild(explosion);
    setTimeout( () => {
        field.removeChild(explosion);
    }, 1200);
}

module.exports = {
    createBalloons,
    balloons,
    ballOnField,
    animateBalloons,
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

let { field, player, scoreField, backButton} = __webpack_require__(0);
let { delPlayerMessage } = __webpack_require__(1);
let { chooseOperation } = __webpack_require__(3);
let { score } = __webpack_require__(2);

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


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

let { exampleField, operation, level } = __webpack_require__(0);
let { createBalloons } = __webpack_require__(4);


let exampleInField = false;
let answers = [];

const startExample = function() {
let style = getComputedStyle(exampleField);
    if(style.display != 'none') {
        if (!exampleInField)  {
            showExample();
            return answers;
        }
    }
    else {
        exampleInField = false;
    }
}

const showExample = function() {
    let operands = [];
    let n = 2;
    let example = '';
    let max = 10*level.num;
    if(level.num > 5)
        max = 10*5;
        


    function sorting(a, b) {
        if(a > b)
            return 1;
        else
            return -1;
    }

    function generateNum(max, answer) {
        let rand = Math.random();
        return Math.abs(rand*(2*max)-max) < rand*answer ? Math.round(rand*(2*max)-max) : Math.round(rand*answer);
    }

    function generator(sign) {
        switch(sign) {
            case '+':
                for(let i = 0; i < n; i++)
                    operands[i] = Math.round( Math.random() * max );
                example = `${operands[0]} + ${operands[1]} = ...`;
                answers = [
                    operands[0]+operands[1],
                    operands[0]+operands[1]+generateNum(10, operands[0]+operands[1]),
                    operands[0]+operands[1]+generateNum(10, operands[0]+operands[1])
                ];
                break;
            case '-':
                for(let i = 0; i < n; i++)
                    operands[i] = Math.round( Math.random() * max );
                operands.sort(sorting);
                example = `${operands[1]} - ${operands[0]} = ...`;
                answers = [
                    operands[1]-operands[0],
                    operands[1]-operands[0]+generateNum(10, operands[1]-operands[0]),
                    operands[1]-operands[0]+generateNum(10, operands[1]-operands[0])
                ];
                break;
            case '*':
                for(let i = 0; i < n; i++) {
                    operands[i] = Math.round( Math.random() * max );
                    max = Math.floor(100 / operands[i])-1;
                }
                example =  `${operands[0]} &#215 ${operands[1]} = ...`;
                answers = [
                    operands[0]*operands[1],
                    operands[0]*operands[1]+generateNum(10, operands[0]*operands[1]),
                    operands[0]*operands[1]+generateNum(10, operands[0]*operands[1])
                ];
                break;
            case '/':
                max *= 2;
                for(let i = 0; i < n; i++) {
                    operands[i] = Math.round( Math.random() * max + i*1);
                    max = operands[i] / 2;
                }
                if(operands[0] % operands[1])
                    operands[0] = operands[1] * Math.round(operands[0] / operands[1]);
                example =  `${operands[0]} &#247 ${operands[1]} = ...`;
                answers = [
                    operands[0]/operands[1],
                    operands[0]/operands[1]+generateNum(10, operands[0]/operands[1]),
                    operands[0]/operands[1]+generateNum(10, operands[0]/operands[1])
                ];
            }
        }

    if(operation.sign.length === 1) {
        generator(operation.sign);
    }
    else {
        generator( operation.sign[ Math.round( Math.random()*3 )] );
    }

    for(let i = 0; i < answers.length; i++) {
        for(let j = i+1; j < answers.length; j++)
            if(answers[i] === answers[j])
                answers[j]++;
    }

    exampleField.innerHTML = example;
    exampleInField = true;
}



module.exports = {
    exampleField,
    startExample,
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

let { showPlayerMessage, jumpHeight, playerJump } = __webpack_require__(1);
let { } = __webpack_require__(3);
let { startExample } = __webpack_require__(6);
let { score, endOfGame, count, changeScore } = __webpack_require__(2);
let { showLevel, level, player, backButton } = __webpack_require__(0);
let { createBalloons, ballOnField, animateBalloons } = __webpack_require__(4);
let { gameOver } = __webpack_require__(5);

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

const loadImg = function() {
    let sources = [
        './img/kids-math-game.jpg',
        './img/wiki/choose.png',
        './img/field-bg.jpg',
        './img/Spongebob.png',
        './img/Patrick.png',
        './img/explosion.png',
        './img/balloons.png'
    ];

    let div = document.createElement("div");
    div.style.position = "absolute";
    div.style.top = 0;
    div.style.left = 0;
    div.style.visibility = "hidden";
    document.body.appendChild(div);
    div.innerHTML = "<img src=\"" + sources.join("\" /><img src=\"") + "\" />";
    let lastImg = div.lastChild;
    lastImg.onload = function() { document.body.removeChild(div); };

}

document.addEventListener('DOMContentLoaded', loadImg);
mainFunc();



/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

let { field, startGameBut, wikiBut, backButton } = __webpack_require__(0);
let count = 0;
let image = null;
let rightArr = null;
let leftArr = null;
let page = null;

const showWiki = function(e) {
    image = document.createElement('div');
    image.classList.add('wiki-image');
    field.appendChild(image);
    image.style.width = field.clientWidth*0.84 + 'px';
    image.style.height = field.clientHeight*0.85 + 'px';
    image.style.backgroundImage = `url(./img/wiki/choose.png)`;
    image.style.backgroundSize = '701% 100%';

    leftArr = document.createElement('div');
    leftArr.classList.add('arrow-left');
    field.appendChild(leftArr);

    rightArr = document.createElement('div');
    rightArr.classList.add('arrow-right');
    field.appendChild(rightArr);

    page = document.createElement('p');
    page.style.font = '400 22px Kabel';
    page.style.color = '#25196C';
    page.style.marginTop = '29px';
    page.innerHTML = `${count+1}/7`;
    field.appendChild(page);

    let button = backButton.cloneNode(true);

    field.appendChild(button);
    button.style.top = '90%'; 
    button.style.display = 'block';

    document.addEventListener('click', changePage);
    document.addEventListener('click', backToStart);
}

const changePage = function(e) {
    let target = e.target;
    if(!(target === rightArr) && !(target === leftArr))
        return;

    target.classList.add('animated', 'bounceOut');
    setTimeout( () => {
        target.classList.remove('animated', 'bounceOut')
    }, 200);

    if(target === rightArr) {
        if(count < 6)
            count++;
    }
    else
        if(count)
            count--;
    image.style.backgroundPosition = `${-800*count}px 0px`;
    page.innerHTML = `${count+1}/7`;
}

const backToStart = function(e) {
    let target = e.target.closest('.back-to-operation');
    if(!target)
        return;

    target.classList.add('animated', 'bounceOut');
    setTimeout( () => {
        field.removeChild(image);
        field.removeChild(leftArr);
        field.removeChild(rightArr);
        field.removeChild(page);
        field.removeChild(target);
        image = leftArr = rightArr = null;
        wikiBut.hidden = false;
        startGameBut.hidden = false;
        document.getElementById('math').hidden = false;
    }, 200);

    document.removeEventListener('click', changePage);
    document.removeEventListener('click', backToStart);
}
module.exports = {
    showWiki,
}


/***/ })
/******/ ]);
//# sourceMappingURL=build.js.map