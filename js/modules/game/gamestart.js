import { field, wikiBut,
        showLevel, operation, speed, backButton } from './values';
import { addPlayer, showPlayerMessage } from '../objects/player';

const startGame = function (target) {
    target.classList.remove('animated', 'pulse', 'infinite');
    target.classList.add('animated', 'bounceOut');
    setTimeout(() => {
        field.node.removeChild(target);
        field.node.removeChild(wikiBut);
        document.getElementById('math').hidden = true;
        chooseOperation();
    }, 230);
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

    e.target.classList.add('animated', 'bounceOut');
    setTimeout(() => {
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
    }, 230);
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

export {
    startGame,
    chooseOperation,
};
