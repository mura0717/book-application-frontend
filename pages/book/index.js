import {fetchClient} from "../../utils.js";
import {createStar} from "./bookReviewFactory.js";
import * as Books from "./BookLists/UserBooks.js"

const bookReference = "_ojXNuzgHRcC"

export const initBook = (referenceId) => {
  Books.init(referenceId)
      .then(() => {
        setupFavButton(referenceId)
        initReviewStars(3)
        updatePageDetails(Books.getBook(),Books.getBookLists())
      })
};

const updatePageDetails = (book,bookLists) => {
  let titleElement = document.getElementById("book-title")
  let authorElement = document.getElementById("book-authors")
  let descriptonElement = document.getElementById("descr-cont")
  let posterElement = document.getElementById("poster-cont")
  let bookListElement = document.getElementById("list-sel") 
  titleElement.textContent = book.title
  authorElement.textContent = book.authors
  descriptonElement.textContent = book.description
  posterElement.style.background = `url('${book.image}')`
  posterElement.style.backgroundSize = "cover"
  bookLists.forEach((b,i) => {
    const opt = document.createElement("option")
    opt.textContent = b.title
    if(i === 0)
      opt.selected = true
    opt.value = b.id
    bookListElement.appendChild(opt)
  })
  
}

const setupFavButton = reference => {
  const btn = document.getElementById("fav-btn")
  btn.onclick = async () => {
    const bookListSelector = document.getElementById("list-sel")
    const bookListReference = bookListSelector.value
    Books.updateBookList(reference,bookListReference)
  }
}

const handleUpdateBookList = async (bookListId, bookId) => {
  const body = {"bookId" : bookId,"bookListId" :  bookListId}
  await fetchClient.patch("/books/update",body)
  // Do something if success
}

const initReviewStars = value => {
  const el = document.getElementById("stars-cont")
  for (let i = 0;i<5;i++){
    if(i < value)
      el.appendChild(createStar(true))
    else
      el.appendChild(createStar(false))
  }
}

