import * as Factory from '../../shared/factories/elementFactory.js';
import * as BookLists from '../../shared/bookLists/userBookLists.js';

export const initBookList = id => {
    BookLists.fetchBookList(id).then((bookList)=>{
        Factory.updateTextContent("listName-id",bookList.title)
        setUpBooks(bookList)
        setUpListTotal(bookList)
    })
};

function setUpBooks (bookList){

    const populatedBooksElement = document.getElementById("books-id");
    const books = bookList.books;

    for (let i = 0; i < books.length; i++) {
        const book = books.at(i);
        const listElement = createBookElement(book);
        populatedBooksElement.appendChild(listElement);
    }

}

function createBookElement (book){
    const html = `<li class="list-group-item d-flex justify-content-between align-items-start">
                  <div class="ms-2 me-auto">
                    <a class="fw-bold" href="/#/book/${book.id}">${book.title}</a>
                    <div id="authors-id">${book.authors}</div>
                    <div id="categories-id">${book.categories}</div>
                  </div>
            </li>`
    const el = document.createElement("div")
    el.innerHTML = html
    return el
}

function setUpListTotal (bookList){
    const booksCount = bookList.books.length;
    Factory.updateTextContent("booksCount-id", booksCount + " Bøger");

}