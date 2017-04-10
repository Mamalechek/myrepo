let { field, fieldHeight, fieldWidth, count, player, backButton } = require('../game/values');
let { endOfGame } = require('./score');

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
