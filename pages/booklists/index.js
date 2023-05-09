import * as Factory from '../../shared/factories/elementFactory.js';
import * as BookLists from '../../shared/bookLists/userBookLists.js';


export const initBookLists = () => {
    BookLists.fetchBookLists().then(()=>{
        setUpListTotal()
        setUpBookLists()
    })
    
};

function setUpBookLists (){

    const populatedListsElement = document.getElementById("bookLists-id");
    const bookLists = BookLists.getBookLists();

    for (let i = 0; i < bookLists.length; i++) {
        const bookList = bookLists.at(i);
        const listElement = createListElement(bookList);
        populatedListsElement.appendChild(listElement);
    }
}

function createListElement (bookList){
    const html = `<li class="list-group-item d-flex justify-content-between align-items-start">
                  <div class="ms-2 me-auto">
                    <a class="fw-bold" href="/#/booklist/${bookList.id}">${bookList.title}</a>
                    <div id="createdAt-id">${bookList.createdAt}</div>
                  </div>
                  <span class="badge bg-dark rounded-pill">${bookList.listCount + " bøger"}</span>
            </li>`
    const el = document.createElement("div")
    el.innerHTML = html
    return el
}

function setUpListTotal (){
    const listCount = BookLists.getBookLists().length
    Factory.updateTextContent("listCount-id", listCount + " Boglister");

}

function handleBookListRequest(){

}
