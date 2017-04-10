let { field, fieldHeight, fieldWidth, exampleField, patrick, player, speed } = require('../game/values');
let { playerCoords, showPlayerMessage } = require('./player');
let { score, changeScore, endOfGame } = require('./score');

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
