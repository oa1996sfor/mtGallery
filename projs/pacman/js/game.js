'use strict'
const WALL = '🚪'
const FOOD = '.'
const EMPTY = ' ';
const POWER_FOOD = '🍔';
const CHERRY = '🍒';


var gBoard;
var gGame = {
    score: 0,
    isOn: false
}
var gFoodNum;
var gFoodCollected;
var gCherryInterval;
function init() {
    console.log('hello')
    gBoard = buildBoard()
    createPacman(gBoard);
    createGhosts(gBoard);
    gFoodCollected = 0;
    gFoodNum = 56;
    printMat(gBoard, '.board-container')
    gCherryInterval = setInterval(placeCherry, 15000);
    gGame.isOn = true
}

function placeCherry() {

    var randLocation = {
        i: getRandomIntInt(0, gBoard.length),
        j: getRandomIntInt(0, gBoard[0].length)
    }
    if (gBoard[randLocation.i][randLocation.j] === FOOD || gBoard[randLocation.i][randLocation.j] === EMPTY) {
        gBoard[randLocation.i][randLocation.j] = CHERRY;
        if (gBoard[randLocation.i][randLocation.j] === EMPTY) gFoodNum++;
        renderCell(randLocation, CHERRY);
    }
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;

            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
            }
        }
    }

    board[1][board[0].length - 2] = POWER_FOOD;
    board[1][1] = POWER_FOOD;
    board[board.length - 2][1] = POWER_FOOD;
    board[board.length - 2][board.length - 2] = POWER_FOOD;
    return board;
}



function updateScore(diff) {
    gGame.score += diff;
    document.querySelector('h2 span').innerText = gGame.score
}

function gameOver() {
    console.log('Game Over');
    gGame.isOn = false;
    clearInterval(gIntervalGhosts);
    clearInterval(gCherryInterval);
    var elModal = document.querySelector('.modal');
    elModal.style.display = 'block';
    var elModalP = document.querySelector('.modal p');
    var strModalP = (gFoodNum === gFoodCollected) ? 'VICTORIOUS!' : 'GAME OVER!';
    if (gFoodNum !== gFoodCollected)
        new Audio('death.wav').play();
    elModalP.innerText = strModalP;
}

function resartGame() {
    var elModal = document.querySelector('.modal');
    elModal.style.display = 'none';
    gGame.score = 0;
    gGame.isOn = false;
    gFoodCollected = 0;
    gFoodNum = 60;
    document.querySelector('h2 span').innerText = gGame.score
    init();

}
