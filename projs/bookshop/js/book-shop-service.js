'use strict'

const KEY = 'books';
var gBooks;
var gSortBy = 'NAME';
var gTitles = ['twilight', 'harry potter', 'gone with the wind'];
var gUrls = ['https://upload.wikimedia.org/wikipedia/he/d/db/Book_jacket_of_Twilight.jpg',
    'https://images-na.ssl-images-amazon.com/images/I/91ocU8970hL.jpg',
    'https://almabooks.com/wp-content/uploads/2020/09/9781847498601.jpg'];

_createBooks();


function getBooks() {
    return gBooks.sort(function (b1, b2) {
        if (gSortBy === 'NAME') return sortByTxt(b1, b2);
        if (gSortBy === 'PRICE') return sortByPrice(b1, b2);
    });


    //return gBooks;
    //later support pages!
}

function sortByTxt(b1, b2) {
    var txtA = b1.title.toUpperCase(); // ignore upper and lowercase
    var txtB = b2.title.toUpperCase(); // ignore upper and lowercase
    if (txtA < txtB) {
        return -1;
    }
    if (txtA > txtB) {
        return 1;
    }
    // names must be equal
    return 0;
}

function sortByPrice(b1, b2) {
    var p1 = +b1.price.substring(0, b1.price.length - 1);
    var p2 = +b2.price.substring(0, b2.price.length - 1);
    return p1 - p2;
}

function _createBook(title, price, url) {
    return {
        id: makeId(),
        title: title,
        price: price,
        imgUrl: url,
        rating: 0
    }
}

function _createBooks() {
    var books = loadFromStorage(KEY)
    if (!books || !books.length) {
        books = []
        for (let i = 0; i < 3; i++) {
            var title = gTitles[i];
            var url = gUrls[i];
            books.push(_createBook(title, (getRandomIntInclusive(1, 22) + '$'), url));
        }
    }
    gBooks = books;
    _saveBooksToStorage();

}

function _saveBooksToStorage() {
    saveToStorage(KEY, gBooks);
}

function removeBook(bookId) {
    var bookIdx = gBooks.findIndex(function (book) {
        return bookId === book.id
    })
    gBooks.splice(bookIdx, 1);
    _saveBooksToStorage();

}

function addBook(title, price, url) {
    var book = _createBook(title, price, url);
    gBooks.unshift(book);
    _saveBooksToStorage();
}

function updateBookPrice(bookId, newPrice) {

    var book = gBooks.find(function (book) {
        return book.id === bookId;
    })
    book.price = newPrice;
    _saveBooksToStorage();
}


function getBookById(bookId) {
    return gBooks.find(function (book) {
        return bookId === book.id
    })
}

function incRating(bookId) {
    var book = gBooks.find(function (book) {
        return book.id === bookId;
    })
    if (book.rating < 10) book.rating++;
    _saveBooksToStorage();
    return book.rating;
}

function decRating(bookId) {
    var book = gBooks.find(function (book) {
        return book.id === bookId;
    })
    if (book.rating > 0) book.rating--;
    _saveBooksToStorage();
    return book.rating;
}

function setSort(sortBy) {
    gSortBy = sortBy;
}
