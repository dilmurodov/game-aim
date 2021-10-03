const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('.time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
const colors = [ 
    '#FECEAB', '#FF847C', '#E84A5F', 
    '#2A363B', '#E5FCC2', '#9DE0AD', '#212930',
    '#868F98', '#57527E', '#003066', '#892034'
]
let time = 0;
let score = 0;

startBtn.addEventListener('click', (event) => {
    event.preventDefault();
    screens[0].classList.add('up');
});

timeList.addEventListener('click', (event) => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'));
        screens[1].classList.add('up');
        startGame(time);
    }
})


function startGame() {
    setInterval(() => {
        decreaseTime();
    }, 1000)
    setTime(time);
    createCircle();
}
function decreaseTime() {
    if (time === 0) {
        finishGame();
    }
    else {
        let current = time--;
        current = formatter(time);
        setTime(current);
    }
}

function setTime(current) {
    let minut = parseInt(current / 60);
    minut = formatter(minut);
    let secund = current % 60;
    secund = formatter(secund);
    timeEl.innerHTML = `${minut} : ${secund}`;
}

function finishGame() {
    board.innerHTML = `<h1>Счёт: <span class='primary'>${score}</span></h1>`;
    timeEl.parentNode.classList.add('hide');
}

function createCircle()
{
    const cicrle = document.createElement('div');
    const size = getRandomNumber(10, 60);
    const {width, height} = board.getBoundingClientRect();
    const x = getRandomNumber(0, width-size);
    const y = getRandomNumber(0, height-size);
    const color = colors[Math.floor(Math.random() * colors.length)];
    cicrle.style.background = `${color}`;
    cicrle.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`
    cicrle.classList.add('circle');
    cicrle.style.width = `${size}px`;
    cicrle.style.height = `${size}px`;
    cicrle.style.top = `${y}px`;
    cicrle.style.left = `${x}px`;
    
    board.append(cicrle);
}

function getRandomNumber(min, max) {
    const randomNumber = Math.round(Math.random() * (max - min) + min);
    return randomNumber;
}

board.addEventListener('click', (event)=>{
    if (event.target.classList.contains('circle'))
    {
        score++;
        event.target.remove();
        createCircle();
    }
})

function formatter(number)
{
    if (number < 10){
        number = `0${number}`;
    }
    return number;
}