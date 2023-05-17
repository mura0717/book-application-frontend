import * as ElementFactory from '../../shared/factories/elementFactory.js';
import * as ElementUpdate from '../../shared/factories/elementUpdate.js';
import * as UserBookLists from '../../shared/bookLists/userBookLists.js';


export const initBookList = id => {
    UserBookLists.fetchBookList(id).then((bookList)=>{
        ElementUpdate.updateTextContent("listName-id",bookList.title) //booklist id & title fetched.
        const bookListId = bookList.id;
        setUpBooks(bookList)
        setUpListTotal(bookList)
        handleRemoveBook(bookListId)
    })
};

// Set up total books in list
function setUpListTotal (bookList){
  const booksCount = bookList.books.length;
  ElementUpdate.updateTextContent("booksCount-id", booksCount + " Bøger");
}

// Set up books as a list
function setUpBooks (bookList){

    const populatedBooksElement = document.getElementById("books-id");
    const books = bookList.books;

    for (let i = 0; i < books.length; i++) {
        const book = books.at(i);
        const listElement = createBookElement(book);
        populatedBooksElement.appendChild(listElement);
    }

}
// Create book as single element in list
function createBookElement (book){
    const html = `<li class="list-group-item d-flex justify-content-between align-items-start" data-id="${book.id}">
                  <div class="ms-2 me-auto">
                    <img src="${book.image}" alt="Bog cover" width="100" height="100">
                    <a class="fw-bold" href="/#/book/${book.id}">${book.title}</a>
                    <div id="authors-id">${book.authors}</div>
                    <div id="categories-id">${book.categories}</div>
                  </div>
                  <div>
                    <button id="removeBookButton-id" type="button" class="btn btn-danger">Fjern</button>
                  </div>
            </li>`
    const el = document.createElement("div")
    el.innerHTML = html
    return el
}

// Remove Book from List
const handleRemoveBook = (bookListId) => {
    //Click event
    const populatedListsElement = document.getElementById("books-id");
    populatedListsElement.addEventListener("click", async (event) => {
      //Errors
      if (event.target.matches("#removeBookButton-id")) {
        const bookItem = event.target.closest(".list-group-item");
        if (!bookItem) {
          alert("Could not find the book item to remove.");
          return;
        }
        const bookId = bookItem.getAttribute("data-id");
        if (!bookId) {
          alert("No ID found for the selected book.");
          return;
        };
        const bookList = await UserBookLists.getBookList(bookListId);
        if (!bookList) {
          alert("Could not establish connection with the booklist from the server.");
          return;
        }
    //Modal init
        const modal = removeBookModal();
        const confirmRemoveButton = document.getElementById("confirmRemoveButton-id");
        confirmRemoveButton.onclick = async () => {
          modal.hide();
          await requestRemoveBook(bookId, bookListId);
        };
      }
    });
  };
  
  function removeBookModal() {
    const modal = new bootstrap.Modal(document.getElementById("removeBookModal-id"));
    const modalTitle = document.querySelector("#removeBookModal-id .modal-title");
    const modalBody = document.querySelector("#removeBookModal-id .modal-body");
    const modalFooter = document.querySelector("#removeBookModal-id .modal-footer");
  
    modalTitle.textContent = "Fjerne bog";
    modalBody.innerHTML = DOMPurify.sanitize(`<p>Er du sikker på at du vil fjerne bogen?</p>`);
    modalFooter.innerHTML = DOMPurify.sanitize(
      `<button id="confirmRemoveButton-id" type="button" class="btn btn-danger">Ja, fjern</button>`
    );
    modal.show();
    return modal;
  }
  
  const requestRemoveBook = async (bookId, bookListId) => {
    if (bookId === "") {
      alert("Book with that ID does not exist.");
      return;
    }
    try {
      const book = await UserBookLists.removeFromFavoriteList(bookId, bookListId);
      window.location.reload();
      if (!book) {
        alert("Error removing book.");
      }
    } catch (error) {
      console.error("An error occurred during the remove operation:", error);
    }
  };
  