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

//MAKE SURE THAT WE CANT GET TIED........
//MAKE SURE THAT WE CANT GET TIED........
//MAKE SURE THAT WE CANT GET TIED........
//MAKE SURE THAT WE CANT GET TIED........
//MAKE SURE THAT WE CANT GET TIED........

screens[1].addEventListener('click', (e) => {
    if(e.target.classList.contains('choose-RPS')) {
        playerOption(e)
    }
})

//Functions
function computerPlay() {
    computerChoose = options[Math.floor(Math.random() * 3)];
    if(computerChoose == playerChoose) {
        return computerPlay();
    }
}

function playerOption(e) {
    computerPlay();
    playerChoose = e.target.querySelector('p').innerText.toLowerCase();
    showResults(computerChoose, playerChoose);
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


function showResults(computerSelection, playerSelection) {
    console.log(computerSelection, playerSelection);
    const computerDiv = [...playerOptionBtns].filter(div => {
        const value = div.querySelector('p').innerText.toLowerCase();
        if(value === computerSelection) return div;
    })

    const playerDiv = [...playerOptionBtns].filter(div => {
        const value = div.querySelector('p').innerText.toLowerCase();
        if(value === playerSelection) return div
    })

    //Now we will delete all choices and show both options and conclude winner.
    choicesEl.innerHTML = '';

    if(computerSelection === playerSelection) {
        const playerDivEl = document.createElement('li');
        playerDivEl.appendChild(playerDiv[0])
        choicesEl.appendChild(playerDivEl);

        //Messange on who won.
        let result = decideWinner(computerSelection, playerSelection);
        const messageEl = document.createElement('li');
        const message = document.createElement('h2');
        message.innerText = result;
        messageEl.appendChild(message);
        choicesEl.appendChild(messageEl);

        //Original code only had else statement and I expeted to insert both Divs in, but since I only had
        //a reference to a player Choice DIV and Computer Choice DIV, if we got tied then code would break
        //because i couldn't insert same div in two places, so i made new DIV that has same stats as fist one.
        const computerDivEl = document.createElement('li');
        const tiedDiv = document.createElement('button');
        tiedDiv.setAttribute('class', 'choose-RPS');
        const pTag = document.createElement('p')
        pTag.innerText = playerDiv[0].querySelector('p').innerText;
        const img = document.createElement('img');
        img.setAttribute('src', playerDiv[0].querySelector('img').src);
        tiedDiv.appendChild(pTag);
        tiedDiv.appendChild(img);
        computerDivEl.appendChild(tiedDiv);
        choicesEl.appendChild(computerDivEl);

    } else {
        const playerDivEl = document.createElement('li');
        playerDivEl.appendChild(playerDiv[0])
        choicesEl.appendChild(playerDivEl);

        //Messange on who won.
        let result = decideWinner(computerSelection, playerSelection);
        const messageEl = document.createElement('li');
        const message = document.createElement('h2');
        message.innerText = result;
        messageEl.appendChild(message);
        choicesEl.appendChild(messageEl);

        const computerDivEl = document.createElement('li');
        computerDivEl.appendChild(computerDiv[0]);
        choicesEl.appendChild(computerDivEl);

        //Increasing the score..
        increaseScore(result);
    }

    //Playing Again after round is over.
    screens[1].classList.add('between-rounds');
    setTimeout(() => {
        choicesEl.querySelectorAll('li').forEach(li => choicesEl.removeChild(li));
        createElements();
        //remove user-select
        screens[1].classList.remove('between-rounds');
    }, 5000)

    
}

function decideWinner(computer, player) {
    let result;
    if(computer === 'rock') {
        if(player === 'paper') {
            result = 'You won!'
        } else if(player === 'scissors') {
            result = 'You Lost.'
        } else {
            result = 'You are tied.'
        }
    } else if(computer === 'paper') {
        if(player === 'rock') {
            result = 'You Lost.'
        } else if(player === 'scissors') {
            result = 'You Won!'
        } else {
            result = 'You are tied.'
        }
    } else if(computer === 'scissors') {
        if(player === 'paper') {
            result = 'You Lost.'
        } else if(player === 'rock') {
            result = 'You Won!'
        } else {
            result = 'You are Tied';
        }
    }
    return result;
}

function increaseScore(result) {
    if(result == 'You Lost.') {
        computerScore++;
    } else if(result == 'You Won!') {
        playerScore++
    } else {
        computerScore = computerScore;
        playerScore = playerScore;
    }
    playerScoreEl.innerHTML = `Player: ${playerScore}`;
    computerScoreEl.innerHTML = `Computer: ${computerScore}`;
    if(computerScore === 5)  {
        gameOverScreen('Computer');
    }else if(playerScore === 5) {
        gameOverScreen('Player');
    }
}

function gameOverScreen(winner) {
    screens[1].classList.remove('between-rounds');
    if(winner === 'Computer') {
        screens[1].innerHTML = `
        <div class="title">
            <h2 class="you-lost" >You lost.. Better luck next time.</h2>
        </div>
        <button class="game-over" onClick="location.reload(true)">Try Again</button>`
    } else {
        screens[1].innerHTML = `
        <div class="title">
            <h2 class="you-won" >Congratulations, you won the game!</h2>
        </div>
        <button class="game-over" onClick="location.reload(true)">Play Again</button>`
    }
}