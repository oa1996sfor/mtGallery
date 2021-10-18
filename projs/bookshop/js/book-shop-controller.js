'use strict'


function onInit() {
    renderBooks();
}

function renderBooks() {

    var books = getBooks();
    var tableTitle = `  <tr><td>id</td><td>title</td><td>Price</td><td colspan="3">Actions</td></tr>`;
    var strHtmls = books.map(function (book) {
        return `
        <tr> 
        <td>${book.id} </td>
        <td>${book.title} </td>
        <td>${book.price}</td>
        <td>
        <button class="readBtn" onclick="onReadBook('${book.id}')">Read</button>
        </td>
        <td>
        <button class="updateBtn" onclick="onUpdateBook('${book.id}')">Update</button>
        </td>
        <td>
        <button class="deleteBtn" onclick="onRemoveBook('${book.id}')">Delete</button>
        </td>
        </tr>
        `
    });

    document.querySelector('.board').innerHTML = tableTitle + strHtmls.join('');

}


function onRemoveBook(bookId) {
    removeBook(bookId);
    renderBooks();
}

function onAddBook() {
    const title = document.getElementById('book-title').value;
    const price = document.getElementById('book-price').value + '$';
    const url = document.getElementById('book-url').value;
    if (!title || !price || !url) return;
    addBook(title, price, url);
    renderBooks();
    document.getElementById('book-title').value = '';
    document.getElementById('book-price').value = '';
    document.getElementById('book-url').value = '';
}

function onUpdateBook(bookId) {
    var newPrice = prompt('please enter the new price:') + '$';
    updateBookPrice(bookId, newPrice);
    renderBooks();
}


function onReadBook(bookId) {
    var book = getBookById(bookId);
    var elModal = document.querySelector('.modal')
    elModal.querySelector('h5').innerText = book.title;
    elModal.querySelector('h6').innerText = 'Price: ' + book.price;
    elModal.querySelector('.bookImg').innerHTML = `<img src="${book.imgUrl}" width="200" height="200"></img>`;
    document.querySelector('.rating-sect').innerHTML = `<button onclick="onIncRating('${bookId}')">+</button>
    <div class="rating">book rating:${book.rating}</div>
    <button onclick="onDecRating('${bookId}')">-</button>`;
    elModal.hidden = false;
}

function onCloseModal() {
    document.querySelector('.modal').hidden = true
}

function onDecRating(bookId) {
    var rating = decRating(bookId);
    document.querySelector('.rating').innerText = `book rating:${rating}`;
}

function onIncRating(bookId) {
    var rating = incRating(bookId);
    document.querySelector('.rating').innerText = `book rating:${rating}`;
}

function onSetSort(val){
    setSort(val);
    renderBooks();

}