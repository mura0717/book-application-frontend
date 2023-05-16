import * as Factory from "../../shared/factories/elementFactory.js";
import * as UserBookLists from "../../shared/bookLists/userBookLists.js";
import { getBookList } from "../../shared/bookLists/httpBookLists.js";

export const initBookLists = async () => {
    const bookLists = await UserBookLists.getBookLists();
    setUpListTotal(bookLists)
    setUpBookLists(bookLists)
    handleCreateList();
    handleDeleteList();
    handleEditList();
    
};

function setUpListTotal(bookLists) {
  const listCount = bookLists.length;
  Factory.updateTextContent("listCount-id", listCount + " Boglister");
}

//GET BOOKLISTS
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
              <li class="list-group-item d-flex justify-content-between align-items-start" data-id="${bookList.id}">
                <div class="ms-2 me-auto">
                    <a class="fw-bold" href="/#/booklist/${bookList.id}">${bookList.title}</a>
                    <div id="createdAt-id">${formattedDate}</div>
                  </div> 
                  <div>
                  <div>
                    <button id="editListButton-id" type="button" class="btn btn-secondary">Edit</button>
                    <button id="deleteListButton-id" type="button" class="btn btn-danger">Slet</button>
                  </div>
                  <div>
                    <span class="badge bg-dark rounded-pill">${bookList.listCount + " bøger"}</span>
                  </div>
                  </div>
              </li>`
    const listElement = document.createElement("div")
    listElement.innerHTML = html
    //console.log(bookList.id)
    return listElement
}

//ADD LIST
const handleCreateList = () => {
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
    console.log(modal.body);
    return modal.body;
  }

  const requestCreateList = async (modal) => {
    return new Promise((resolve, reject) => {
    const nameInput = document.getElementById("createListInput-id");
    const createListButton = document.getElementById("createListButton-id");

    createListButton.onclick = async() => {
        const listName = nameInput.value;
    if(listName === ""){
        alert("Du skal angive en titel")
        return reject();
    }
    const response = await UserBookLists.createBookList(listName)
    if(response == null){
        return reject();
    }
    const option = Factory.createOption(response.title,response.id)
    Factory.appendChildTo("listNameInput-id",option)
    modal.hide();
    window.location.reload();
    return resolve();
    }
    })
  }


//DELETE LIST
const handleDeleteList = () => {
  const populatedListsElement = document.getElementById("bookLists-id");
  populatedListsElement.addEventListener("click", async (event) => {
    if (event.target.matches("#deleteListButton-id")) {
      const bookListItem = event.target.closest(".list-group-item");
      if (!bookListItem) {
        alert("Could not find the book list item to delete.");
        return;
      }
      const listId = bookListItem.getAttribute("data-id");
      if (!listId) {
        alert("No list ID found for the selected book list.");
        return;
      }
      const bookList = await getBookList(listId);
      if (!bookList) {
        alert("Could not fetch the book list from the server.");
        return;
      }

      const modal = deleteListModal();
      const confirmDeleteButton = document.getElementById("confirmDeleteButton-id");
      confirmDeleteButton.onclick = async () => {
        modal.hide();
        await requestDeleteList(listId);
    }
  }
});
}

function deleteListModal (){
    const modal = new bootstrap.Modal(document.getElementById("deleteListModal-id"));
    const modalTitle = document.querySelector("#deleteListModal-id .modal-title");
    const modalBody = document.querySelector("#deleteListModal-id .modal-body");
    const modalFooter = document.querySelector("#deleteListModal-id .modal-footer");

    modalTitle.textContent = "Slet bogliste";
    modalBody.innerHTML = `<p>Er du sikker på at du vil slette boglisten?</p>`;
    modalFooter.innerHTML = `<button id="confirmDeleteButton-id" type="button" class="btn btn-danger">Ja, Slet</button>`;
    modal.show()
    return modal;
  };

  const requestDeleteList = async (listId) => {
    if (listId === "") {
      alert("Boglisten med det ID findes ikke.");
      return;
    }
    try {
      const bookList = await UserBookLists.deleteBookList(listId);
      if (bookList == null) {
        alert("Kunne ikke finde boglisten.");
      } else {
        alert("Boglisten er nu slettet.");
        window.location.reload();
      }
    } catch (error) {
      console.error("An error occurred during the delete operation:", error);
    }
  };


//EDIT LIST
const handleEditList = (event) => {  
  const editListButton = document.getElementById("updateListButton-id");
  const listId = getListId(event);
  editListButton.onclick = () => {const modal = editListModal(listId);
  requestEditList(modal)
}
}

function getListId(event){
  const bookListItem = event.target.closest(".list-group-item");
  if (!bookListItem) {
    alert("Could not find the book list item to edit.");
    return;
  }
  const listId = bookListItem.getAttribute("data-id");
  if (!listId) {
    alert("No list ID found for the selected book list.");
    return;
  }
  return listId;
}


function editListModal (){
  const modal = new bootstrap.Modal(document.getElementById("editListModal-id"));
  const modalTitle = document.querySelector("#editListModal-id .modal-title");
  const modalBody = document.querySelector("#editListModal-id .modal-body");
  const modalFooter = document.querySelector("#editListModal-id .modal-footer");

  modalTitle.textContent = "Ændere bogliste";
  modalBody.innerHTML = `<input id="editListInput-id" type="text" class="form-control" placeholder="Ny Titel på bogliste">`;
  modalFooter.innerHTML = `<button id="editListButton-id" type="button" class="btn btn-primary">Gem</button>`;
  modal.show();
  console.log(modal.body);
  return modal.body;
}

const requestEditList = async (modal, ) => {
  return new Promise((resolve, reject) => {
    const nameInput = document.getElementById("editListInput-id");
    const listId = bookListItem.getAttribute("data-id");
    const saveListButton = document.getElementById("editListButton-id");

    saveListButton.onclick = async() => {
        const listName = nameInput.value;
    if(listName === ""){
        alert("Du skal angive en titel")
        return reject();
    }
    const response = await UserBookLists.editBookList(listId, listName)
    if(response == null){
        return reject();
    }
    const option = Factory.createOption(response.title,response.id)
    Factory.appendChildTo("editedListNameInput-id",option)
    modal.hide();
    window.location.reload();
    return resolve();
    }
  }
)}


  
