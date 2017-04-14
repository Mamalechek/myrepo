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
    document.forms[0].style.marginLeft = `calc(50% + ${field.width / 2 - 60}px)`;
});

export {
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
    sound,
};
