import * as Factory from "../../shared/factories/elementFactory.js";
import * as BookLists from "../../shared/bookLists/userBookLists.js";

export const initBookLists = async () => {
    const bookLists = await BookLists.getBookLists();
    setUpListTotal(bookLists)
    setUpBookLists(bookLists)
    initAddListButton();
    
};

function setUpListTotal(bookLists) {
  const listCount = bookLists.length;
  Factory.updateTextContent("listCount-id", listCount + " Boglister");
}

function setUpBookLists(bookLists) {
  const populatedListsElement = document.getElementById("bookLists-id");

  for (let i = 0; i < bookLists.length; i++) {
    const bookList = bookLists.at(i);
    const listElement = createListElement(bookList);
    populatedListsElement.appendChild(listElement);
  }
}

function createListElement(bookList) {
  const formattedDate = new Date(bookList.createdAt).toLocaleDateString();
  const html = `
            <li class="list-group-item d-flex justify-content-between align-items-start">
                  <div class="ms-2 me-auto">
                    <a class="fw-bold" href="/#/booklist/${bookList.id}">${bookList.title}</a>
                    <div id="createdAt-id">${formattedDate}</div>
                  </div>
                  <span class="badge bg-dark rounded-pill">${bookList.listCount + " bøger"}</span>
            </li>`
    const el = document.createElement("div")
    el.innerHTML = html
    return el
}

const initAddListButton = () => {
    const addListButton = document.getElementById("addListButton-id");
    addListButton.onclick = () => {const modal = createListModal();
    requestCreateList(modal)
};
}

  
 function createListModal (){
    const modal = new bootstrap.Modal(document.getElementById("createListModal-id"));
    const modalTitle = document.querySelector("#createListModal-id .modal-title");
    const modalBody = document.querySelector("#createListModal-id .modal-body");
    const modalFooter = document.querySelector("#createListModal-id .modal-footer");

    modalTitle.textContent = "Opret bogliste";
    modalBody.innerHTML = `<input id="createListInput-id" type="text" class="form-control" placeholder="Titel på bogliste">`;
    modalFooter.innerHTML = `<button id="createListButton-id" type="button" class="btn btn-primary">Opret</button>`;
    modal.show();
    return modal;

  }

  const requestCreateList = async (modal) => {
    const name = document.getElementById("createListInput-id").value
    if(name === ""){
        alert("Du skal angive en titel")
        return
    }
    const bookList = await UserBookLists.createBookList(name)
    if(bookList == null)
        return
    const option = Factory.createOption(bookList.title,bookList.id)
    Factory.appendChildTo("listNameInput-id",option)
    modal.hide()
}

  
    

