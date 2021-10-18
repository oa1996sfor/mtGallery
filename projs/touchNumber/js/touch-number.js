'use strict'


var gNums = [];
var gDifficuties = [16, 25, 36];
var bSize = 16;
var currNum = 1;
var gInterval;
var startTime;

function initGame() {
    gNums = createNumberedArray(bSize);
    currNum = 1;
    var elNextNum = document.querySelector('.nextNum');
    var strHtml = `Next Number: ${currNum}`;
    elNextNum.innerHTML = strHtml;
    renderBoard();
    startTime = new Date();
    gInterval = setInterval(countSeconds, 1000);
}

function countSeconds() {
    var elTime = document.querySelector('.time');
    var time = new Date();
    time = time - startTime;
    var seconds = Math.floor(time / 1000);
    var milliSecs = (time % 1000);
    elTime.innerHTML = `Time: ${seconds} : ${milliSecs}`;


}

function renderBoard() {
    var strHtml = '';
    for (var i = 0; i < Math.sqrt(bSize); i++) {
        strHtml += '<tr>'
        for (var j = 0; j < Math.sqrt(bSize); j++) {
            //   var className = (cell) ? 'occupied' : '';
            var randNm = getRandNumberFromArr(gNums);
            strHtml += `<td data-num="${randNm}"
            onclick="cellClicked(this)"> ${randNm} </td>`;
        }
        strHtml += '</tr>'
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHtml;


}

function newGameClicked(elBtn) {
    clearInterval(gInterval);
    initGame();
}

function cellClicked(elCell) {
    var cellNum = elCell.getAttribute('data-num');
    cellNum = +cellNum;
    if (cellNum === bSize) {
        clearInterval(gInterval);
        elCell.style.backgroundColor = 'red';
        alert('You Finished in ' + (seconds - 1) + ' seconds!');
    } else if (currNum === cellNum) {
        currNum++;
        elCell.style.backgroundColor = 'red';
        var elNextNum = document.querySelector('.nextNum');
        var strHtml = `Next Number: ${currNum}`;
        elNextNum.innerHTML = strHtml;
    }



}

//easy hard extreme game
function easyGame(elBtn) {
    clearDifficultiesHoover();
    bSize = gDifficuties[0];
    elBtn.style.backgroundColor = "yellow";
    clearInterval(gInterval);
    initGame();
}
function hardGame(elBtn) {
    clearDifficultiesHoover();
    bSize = gDifficuties[1];
    elBtn.style.backgroundColor = "yellow";
    clearInterval(gInterval);
    initGame();
}
function extremeGame(elBtn) {
    clearDifficultiesHoover();
    bSize = gDifficuties[2];
    elBtn.style.backgroundColor = "yellow";
    clearInterval(gInterval);
    initGame();
}

function clearDifficultiesHoover() {
    var elDifficulties = document.querySelectorAll('.difficulty');
    for (var i = 0; i < elDifficulties.length; i++) {
        elDifficulties[i].style.backgroundColor = "white";

    }
}