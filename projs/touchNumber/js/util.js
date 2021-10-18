'use strict'


function createNumberedArray(size) {
    var arr = [];
    for (var i = 1; i <= size; i++) {
        arr.push(i);
    }
    return arr;
}


function getRandNumberFromArr(arr) {
    var randIdx = getRandomIntInclusive(0, arr.length - 1);
    var num = arr[randIdx];
    arr.splice(randIdx, 1);
    return num;
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

