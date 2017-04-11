const { field, count, player, backButton } = require('../game/values');

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
