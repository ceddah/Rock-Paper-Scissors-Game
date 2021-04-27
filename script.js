// DOM
const playBtn = document.querySelector('.game-start');
const screens = document.querySelectorAll('.screen');
const playerOptionBtns = document.querySelectorAll('.choose-RPS');
const playerScoreEl = document.querySelector('.player-score');
const computerScoreEl = document.querySelector('.computer-score');
const choicesEl = document.querySelector('.choices')

//Keeping track of both scores...
let playerChoose;
let computerChoose;
let playerScore = 0;
let computerScore = 0;
let options = ['rock', 'paper', 'scissors'];

//Event Listeners
playBtn.addEventListener('click', () => {
    screens[0].classList.add('up');
})

playerOptionBtns.forEach(btn => btn.addEventListener('click', (e) => {
    playerOption(e)
}));

//Functions
function computerPlay() {
    computerChoose = options[Math.floor(Math.random() * 3)];
}

function playerOption(e) {
    computerPlay();
    playerChoose = e.target.querySelector('p').innerText.toLowerCase();
    playRPS(computerChoose, playerChoose);
}


function createElements() {
    const images = ['./assets/60 Rock.png', './assets/60 Paper.png', './assets/60 Scissors.png'];
    images.forEach((img, idx) => {
        const li = document.createElement('li');
        const button = document.createElement('button');
        button.classList.add('choose-RPS');
        const p = document.createElement('p');
        p.innerText = options[idx].toUpperCase();
        const imgEl = document.createElement('img');
        imgEl.setAttribute('src', img);
        imgEl.setAttribute('alt', options[idx]);
        button.appendChild(p);
        button.appendChild(imgEl);
        li.appendChild(button)
        choicesEl.appendChild(li);
    })
}


function playRPS(computerSelection, playerSelection) {
    console.log(computerSelection, playerSelection)
}