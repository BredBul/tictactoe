const gameBody = document.querySelector('.game__body');
const gameCell = document.querySelectorAll('.game__cell');
const again = document.querySelector('.again');
const matchResult = document.querySelector('.match__result');
const scoreCross = document.querySelector('.score__cross');
const scoreCircle = document.querySelector('.score__circle');
const score0El = document.querySelector('.score-0');
const score1El = document.querySelector('.score-1');

let activePlayer, arrCross, arrCirle, playing;
score0El.textContent = 0;
score1El.textContent = 0;
let needle = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],    
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8]
];

const init = function () {
    activePlayer = 0;
    arrCross = [];
    arrCirle = [];
    playing = true;
    scoreCross.classList.add('active');
    scoreCircle.classList.remove('active');
    matchResult.textContent = '';
    for (const cell of gameCell) {
        cell.innerHTML = '';
        cell.classList.remove('clicked');
    }
}
init();
const switchPlayer = function () {
    activePlayer = activePlayer === 0 ? 1 : 0;
    scoreCross.classList.toggle('active');
    scoreCircle.classList.toggle('active');
}
for (const cell of gameCell) {
    function addImgCross() {
        const img = document.createElement('img');
        img.src = 'img/cross.svg';
        cell.appendChild(img);
    }

    function addImgCircle() {
        const img = document.createElement('img');
        img.src = 'img/heart.svg';
        cell.appendChild(img);
    }
    cell.addEventListener('click', function (e) {
        if (playing) {
            let indexCell = [...gameCell].indexOf(cell);

            function addClicked() {
                if (cell.classList.contains('clicked')) {} else {
                    cell.classList.add('clicked')
                    if (activePlayer === 0) {
                        addImgCross();
                        switchPlayer();
                        arrCross.push(indexCell);
                        for (const need of needle) {
                            if (need.every(i => arrCross.includes(i))) {
                                matchResult.textContent = 'Cross Wins!';
                                playing = false;
                                score0El.textContent ++;
                            } else {switchPlayer()}
                        }
                    } else {
                        addImgCircle();
                        switchPlayer();
                        arrCirle.push(indexCell);
                        for (const need of needle) {
                            if (need.every(i => arrCirle.includes(i))) {
                                matchResult.textContent = 'Circle Wins!';
                                playing = false;
                                score1El.textContent ++;
                            } else {switchPlayer()}
                        }
                    }
                }
            }
            addClicked();
            let check = [...gameCell].every((cell) => cell.classList.contains('clicked'));
            if (check && playing) {
                matchResult.textContent = 'Draw';
                playing = false;
            }
        }
    });
}
again.addEventListener('click', init);
