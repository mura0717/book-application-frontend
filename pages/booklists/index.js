import * as Factory from '../../shared/factories/elementFactory.js';
import * as BookLists from '../../shared/bookLists/userBookLists.js';

export const initBookLists = async () => {
    const bookLists = await BookLists.getBookLists();
    setUpListTotal(bookLists)
    setUpBookLists(bookLists)
    
};

function setUpListTotal (bookLists){
    const listCount = bookLists.length
    Factory.updateTextContent("listCount-id", listCount + " Boglister");
}

function setUpBookLists (bookLists){
    const populatedListsElement = document.getElementById("bookLists-id");

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
