let { field, startGameBut, wikiBut, backButton } = require('./values');
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
    image.style.backgroundSize = '701.5% 100%';

    leftArr = document.createElement('div');
    leftArr.classList.add('arrow-left');
    field.appendChild(leftArr);

    rightArr = document.createElement('div');
    rightArr.classList.add('arrow-right');
    field.appendChild(rightArr);

    page = document.createElement('p');
    page.style.font = '400 22px Kabel';
    page.style.color = '#25196C';
    page.innerHTML = `${count+1}/7`;
    field.appendChild(page);
    page.style.position = 'absolute';
    page.style.left = 'calc(50% - 20px)';
    page.style.bottom = '37px';
    

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
    image.style.backgroundPosition = `${-parseInt(image.style.width)*count}px 0px`;
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
