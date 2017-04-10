let { field, startGameBut, wikiBut, showLevel, operation, speed, backButton} = require('./values');
let { addPlayer, showPlayerMessage } = require('../objects/player');
let { showWiki } = require('./wiki');

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
    if(!e.target.closest('.slider') && !e.target.classList.contains('data-lower') && !e.target.classList.contains('data-faster'))
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
