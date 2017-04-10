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
