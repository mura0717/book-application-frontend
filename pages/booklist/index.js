import * as ElementFactory from '../../shared/factories/elementFactory.js';
import * as ElementUpdate from '../../shared/factories/elementUpdate.js';
import * as UserBookLists from '../../shared/bookLists/userBookLists.js';


export const initBookList = id => {
    UserBookLists.fetchBookList(id).then((bookList)=>{
        ElementUpdate.updateTextContent("listName-id",bookList.title)
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
//Added image to book
function createBookElement (book){
    const html = `<li class="list-group-item d-flex justify-content-between align-items-start">
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

function setUpListTotal (bookList){
    const booksCount = bookList.books.length;
    ElementUpdate.updateTextContent("booksCount-id", booksCount + " Bøger");

}

const handleRemoveBook = () => {
    const populatedListsElement = document.getElementById("books-id");
    populatedListsElement.addEventListener("click", async (event) => {
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
        }
        const bookList = await UserBookLists.getBookList(bookId);
        if (!bookList) {
          alert("Could not fetch the book from the server.");
          return;
        }
  
        const modal = removeBookModal();
        const confirmRemoveButton = document.getElementById("confirmRemoveButton-id");
        confirmRemoveButton.onclick = async () => {
          modal.hide();
          await requestRemoveBook(bookId);
        };
      }
    });
  };
  
  function removeBookModal() {
    const modal = new bootstrap.Modal(document.getElementById("deleteListModal-id"));
    const modalTitle = document.querySelector("#deleteListModal-id .modal-title");
    const modalBody = document.querySelector("#deleteListModal-id .modal-body");
    const modalFooter = document.querySelector("#deleteListModal-id .modal-footer");
  
    modalTitle.textContent = "Slet bogliste";
    modalBody.innerHTML = DOMPurify.sanitize(`<p>Er du sikker på at du vil fjerne bogen?</p>`);
    modalFooter.innerHTML = DOMPurify.sanitize(
      `<button id="confirmDeleteButton-id" type="button" class="btn btn-danger">Ja, fjern</button>`
    );
    modal.show();
    return modal;
  }
  
  const requestRemoveBook = async (bookId) => {
    if (bookId === "") {
      alert("Bog med det ID findes ikke.");
      return;
    }
    try {
      const book = await UserBookLists.removeFromFavoriteList(bookId);
      window.location.reload();
      if (!book) {
        alert("Kunne ikke finde bogen.");
      }
    } catch (error) {
      console.error("An error occurred during the remove operation:", error);
    }
  };
  