import * as Factory from '../../shared/factories/elementFactory.js';
import * as BookLists from '../../shared/bookLists/userBookLists.js';
import * as HttpBookLists from '../../shared/bookLists/httpBookLists.js';

export const initBookList = id => {
    console.log(id)
    BookLists.fetchBookList(id).then((bookList)=>{
        console.log(bookList.title)
        const el = Factory.createDivWithText("id","classNames", "text");
        setUpListName(id)
        setUpBooks(id)
        setUpListTotal
        
    })
   
  
};

function setUpListName (id) {
    const listName = document.getElementById("listName-id");
    const listNameElement = BookLists.getBookList(id).value;
    console.log(listNameElement);
    listName.textContent= listNameElement;
}

function setUpBooks (id){

    const populatedBooksElement = document.getElementById("books-id");
    const books = Booklists.getBookList();

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
                    <div id="createdAt-id">${book.author}</div>
                    <div id="category">${book.category}</div>
                  </div>
            </li>`
    const el = document.createElement("div")
    el.innerHTML = html
    return el
}

function setUpListTotal (){
    const listCount = BookLists.getBookLists().length
    Factory.updateTextContent("bookCount-id", listCount + " Bøger");

}