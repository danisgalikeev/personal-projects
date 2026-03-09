let score = JSON.parse(localStorage.getItem('score')) ||  {
    wins: 0,
    losses: 0,
    ties: 0
}

updateScore();

document.querySelector('.rock-button').addEventListener('click', () => {playGame('✊')})
document.querySelector('.paper-button').addEventListener('click', () => {playGame('✋')})
document.querySelector('.scissors-button').addEventListener('click', () => {playGame('✌️')})

document.body.addEventListener('keydown', (e) => {
    if (e.key === 'r') {playGame('✊');}
    else if(e.key==='p') {playGame('✋');}
    else if(e.key==='c') {playGame('✌️');}
})

function playGame(playerMove) {
    const computerMove = randomNumber();
    let result = '';

    if (playerMove === '✊') {
        if (computerMove === '✊') result = 'Tie!';
        else if (computerMove === '✋') result = 'You lose!';
        else result = 'You win!';
    }
    else if (playerMove === '✌️') {
        if(computerMove === '✊') {
            result = 'You lose!';
        } else if (computerMove === '✋') {
            result = 'You win!';
        } else if (computerMove === '✌️') {
            result = 'Tie!';
        }
    } else if (playerMove === '✋') {
        if(computerMove === '✊') {
            result = 'You win!';
        } else if (computerMove === '✋') {
            result = 'Tie!';
        } else if (computerMove === '✌️') {
            result = 'You lose!';
        }
    }
    if (result === 'You win!') {
        score.wins += 1;
    } else if (result === 'You lose!') {
        score.losses += 1;
    } else if (result === 'Tie!') {
        score.ties += 1;
    }

    localStorage.setItem('score', JSON.stringify(score));



    updateScore();

    document.querySelector('.you').innerHTML = result;
    document.querySelector('.step').innerHTML = `You ${playerMove} - ${computerMove} Computer`;

}

function updateScore() {
    document.querySelector('.results').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;

}
let isAutoPlaying = false;
let intervalID=0;

function randomNumber() {
    const randomNumber = Math.random();
    let computerMove = '';
    if (randomNumber < 1/3) {
        computerMove = '✊';
    } else if (randomNumber < 2/3) {
        computerMove = '✋';
    } else {
        computerMove = '✌️';
    }
    return computerMove;
}
function autoPlay() {

    if(!isAutoPlaying) {
        intervalID=setInterval( () => {
            const playerMove = randomNumber();
            playGame(playerMove);
        }, 1000);
        isAutoPlaying = true;
    } else {
        clearInterval(intervalID);
        isAutoPlaying = false;
    }



}