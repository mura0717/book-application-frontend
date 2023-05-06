import * as Factory from '../../shared/factories/elementFactory.js';
import * as Booklists from '../../shared/bookLists/userBookLists.js';


export const initBookLists = () => {

    const el = Factory.createDivWithText("id","classNames", "text");

    Booklists.fetchBookLists().then(()=>{
        setUpListTotal()
        setUpBookLists()
    })
    
};

function setUpBookLists (){

    const populatedListsElement = document.getElementById("booklists-id");
    const booklists = Booklists.getBookLists();

    for (let i = 0; i < booklists.length; i++) {
        const booklist = booklists.at(i);
        const listElement = createListElement(booklist);
        populatedListsElement.appendChild(listElement);
    }

}

function createListElement (bookList){
    const html = `<li class="list-group-item d-flex justify-content-between align-items-start">
                  <div class="ms-2 me-auto">
                    <a class="fw-bold" href="/#/booklist/${bookList.id}">${bookList.title}</a>
                    <div>${bookList.createdAt}</div>
                  </div>
                  <span class="badge bg-dark rounded-pill">${bookList.listCount + " bøger"}</span>
            </li>`
    const el = document.createElement("div")
    el.innerHTML = html
    return el
}

function setUpListTotal (){
    const listCount = Booklists.getBookLists().length
    Factory.updateTextContent("listcount-id", listCount + " Boglister");

}

function handleBooklistRequest(){

}
