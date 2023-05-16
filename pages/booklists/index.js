import * as Factory from "../../shared/factories/elementFactory.js";
import * as UserBookLists from "../../shared/bookLists/userBookLists.js";
import { getBookList } from "../../shared/bookLists/httpBookLists.js";

export const initBookLists = async () => {
  const bookLists = await UserBookLists.getBookLists();
  setUpListTotal(bookLists);
  setUpBookLists(bookLists);
  handleCreateList();
  handleDeleteList();
  handleEditList();
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
              <li class="list-group-item d-flex justify-content-between align-items-start" data-id="${bookList.id}">
                <div class="ms-2 me-auto">
                    <a class="fw-bold" href="/#/booklist/${bookList.id}">${bookList.title}</a>
                    <div id="createdAt-id">${formattedDate}</div>
                  </div> 
                  <div>
                  <div>
                    <button id="editListButton" type="button" class="btn btn-secondary">Edit</button>
                    <button id="deleteListButton-id" type="button" class="btn btn-danger">Slet</button>
                  </div>
                  <div>
                    <span class="badge bg-dark rounded-pill">${bookList.listCount + " bøger"}</span>
                  </div>
                  </div>
              </li>`;
  const listElement = document.createElement("div");
  listElement.innerHTML = html;
  return listElement;
}

const handleCreateList = () => {
  const addListButton = document.getElementById("addListButton-id");
  addListButton.onclick = async () => {
    const modal = createListModal();
    await requestCreateList(modal);
  };
};

function createListModal() {
  const modal = new bootstrap.Modal(document.getElementById("createListModal-id"));
  const modalTitle = document.querySelector("#createListModal-id .modal-title");
  const modalBody = document.querySelector("#createListModal-id .modal-body");
  const modalFooter = document.querySelector("#createListModal-id .modal-footer");

  modalTitle.textContent = "Opret bogliste";
  modalBody.innerHTML = DOMPurify.sanitize(
    `<input id="createListInput-id" type="text" class="form-control" placeholder="Titel på bogliste">`
  );
  modalFooter.innerHTML = DOMPurify.sanitize(
    `<button id="createListButton-id" type="button" class="btn btn-primary">Opret</button>`
  );
  modal.show();
  return modal;
}

const requestCreateList = async (modal) => {
  const nameInput = document.getElementById("createListInput-id");
  const createListButton = document.getElementById("createListButton-id");

  createListButton.onclick = async () => {
    const listName = nameInput.value;
    if (listName === "") {
      alert("Du skal angive en titel");
    }
    const response = await UserBookLists.createBookList(listName);
    response.createdAt = new Date();
    response.listCount = 0;
    const div = createListElement(response);
    Factory.appendChildTo("bookLists-id", div);
    modal.hide();
  };
};

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
      };
    }
  });
};

function deleteListModal() {
  const modal = new bootstrap.Modal(document.getElementById("deleteListModal-id"));
  const modalTitle = document.querySelector("#deleteListModal-id .modal-title");
  const modalBody = document.querySelector("#deleteListModal-id .modal-body");
  const modalFooter = document.querySelector("#deleteListModal-id .modal-footer");

  modalTitle.textContent = "Slet bogliste";
  modalBody.innerHTML = DOMPurify.sanitize(`<p>Er du sikker på at du vil slette boglisten?</p>`);
  modalFooter.innerHTML = DOMPurify.sanitize(
    `<button id="confirmDeleteButton-id" type="button" class="btn btn-danger">Ja, Slet</button>`
  );
  modal.show();
  return modal;
}

const requestDeleteList = async (listId) => {
  if (listId === "") {
    alert("Boglisten med det ID findes ikke.");
    return;
  }
  try {
    const bookList = await UserBookLists.deleteBookList(listId);
    window.location.reload();
    if (!bookList) {
      alert("Kunne ikke finde boglisten.");
    }
  } catch (error) {
    console.error("An error occurred during the delete operation:", error);
  }
};

const handleEditList = () => {
  const populatedListsElement = document.getElementById("bookLists-id");
  populatedListsElement.addEventListener("click", async (event) => {
    if (event.target.matches("#editListButton")) {
      const bookListItem = event.target.closest(".list-group-item");
      if (!bookListItem) {
        alert("Could not find the booklist item to edit.");
        return;
      }
      const listId = bookListItem.getAttribute("data-id");
      if (!listId) {
        alert("No list ID found for the selected booklist.");
        return;
      }
      const bookList = await getBookList(listId);
      if (!bookList) {
        alert("Could not fetch the book list from the server.");
        return;
      }
      const modal = editListModal(listId);
      requestEditList(modal, listId);
    }
  });
};

function editListModal() {
  const modal = new bootstrap.Modal(document.getElementById("editListModal-id"));
  const modalTitle = document.querySelector("#editListModal-id .modal-title");
  const modalBody = document.querySelector("#editListModal-id .modal-body");
  const modalFooter = document.querySelector("#editListModal-id .modal-footer");

  modalTitle.textContent = "Ændere bogliste";
  modalBody.innerHTML = DOMPurify.sanitize(
    `<input id="editListInput-input" type="text" class="form-control" placeholder="Ny Titel på bogliste">`
  );
  modalFooter.innerHTML = DOMPurify.sanitze(
    `<button id="editListButton-confirm" type="button" class="btn btn-primary">Gem</button>`
  );
  modal.show();
  return modal;
}

const requestEditList = async (modal, listId) => {
  const nameInput = document.getElementById("editListInput-input");
  const saveListButton = document.getElementById("editListButton-confirm");

  saveListButton.onclick = async () => {
    const newName = nameInput.value;
    if (newName === "") {
      alert("Du skal angive en titel");
    }
    const response = await UserBookLists.editBookList(listId, newName);
    if (!response) {
      alert("Kunne ikke finde boglisten.");
    }
    modal.hide();
    window.location.reload();
  };
};
