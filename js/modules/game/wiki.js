import { field, startGameBut, wikiBut, backButton } from './values';

let count = 0;
let image = null;
let rightArr = null;
let leftArr = null;
let page = null;

const showWiki = function (target) {
    target.classList.add('animated', 'bounceOut');
    setTimeout(() => {
        target.classList.remove('animated', 'bounceOut');
        wikiBut.hidden = true;
        startGameBut.hidden = true;
        document.getElementById('math').hidden = true;
        renderWiki();
    }, 230);
};

const renderWiki = function () {
    image = document.createElement('div');
    image.classList.add('wiki-image');
    field.node.appendChild(image);
    image.style.width = `${field.node.clientWidth * 0.84}px`;
    image.style.height = `${field.node.clientHeight * 0.85}px`;
    image.style.backgroundImage = `url(./img/wiki/choose.png)`;
    image.style.backgroundSize = '701.5% 100%';

    leftArr = document.createElement('div');
    leftArr.classList.add('arrow-left');
    field.node.appendChild(leftArr);

    rightArr = document.createElement('div');
    rightArr.classList.add('arrow-right');
    field.node.appendChild(rightArr);

    page = document.createElement('p');
    page.style.font = '400 22px Kabel';
    page.style.color = '#25196C';
    page.innerHTML = `${count + 1}/7`;
    field.node.appendChild(page);
    page.style.position = 'absolute';
    page.style.left = 'calc(50% - 20px)';
    page.style.bottom = '37px';

    const button = backButton.cloneNode(true);
    field.node.appendChild(button);
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
    } else
    if (count) {
        count--;
    }

    image.style
      .backgroundPosition = `${-parseInt(image.style.width, 10) * count}px 0px`;
    page.innerHTML = `${count + 1}/7`;
};

const backToStart = function (e) {
    const target = e.target.closest('.back-to-operation');
    if (!target) {
        return;
    }

    target.classList.add('animated', 'bounceOut');
    setTimeout(() => {
        field.node.removeChild(image);
        field.node.removeChild(leftArr);
        field.node.removeChild(rightArr);
        field.node.removeChild(page);
        field.node.removeChild(target);
        image = null;
        leftArr = null;
        rightArr = null;
        wikiBut.hidden = false;
        startGameBut.hidden = false;
        document.getElementById('math').hidden = false;
    }, 200);

    document.removeEventListener('click', changePage);
    document.removeEventListener('click', backToStart);
    window.removeEventListener('resize', resizeImage);
};

const resizeImage = function () {
    const imageToResize = document.querySelector('.wiki-image');
    imageToResize.style.width = `${field.node.clientWidth * 0.84}px`;
    imageToResize.style.height = `${field.node.clientHeight * 0.85}px`;
};

export default showWiki;
