'use strict'

var gProjs = [
    createProject('minesweeper', 'Minesweeper', 'mark the mines!', 'my take on minesweeper', 'projs/Minesweeper', ["matrixes", "keyboard events"]),
    createProject('pacman', 'Pacman', 'play pacman!', 'my take on pacman', 'projs/pacman', ["matrixes", "keyboard events"]),
    createProject('bookshop', 'BookShop', 'buy Books!', 'welcome to the bookshop', 'projs/bookshop', ["crudl", "mouse events"]),
    createProject('touchNumber', 'Touch the Number', 'touch the numbers', 'challenge your self in touching the numbers', 'projs/touchNumber', ["game", "mouse events"]),
    createProject('inPicture', 'In Picture', 'play this awesome game', 'answer the questions :)', 'projs/inPicture', ["game", "mouse events"])
];



function createProject(id, name, title, desc, url, labels) {
    return {
        id: id,
        name: name,
        title: title,
        desc: desc,
        url: url,
        publishedAt: (new Date),
        labels: labels
    };
}

function getProjs() {
    return gProjs;
}

