import {fetchClient} from "../../utils.js";
import {createStar} from "./BookElementsFactory.js";
import * as Books from "./BookLists/UserBooks.js"

const bookReference = "_ojXNuzgHRcC"

export const initBook = (referenceId) => {
  Books.init(referenceId)
      .then(() => {
        setupFavButton()
        initReviewStars(3)
        updatePageDetails(Books.getBook(),Books.bookListTitles())
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
    opt.textContent = b
    if(i === 0)
      opt.selected = true
    bookListElement.appendChild(opt)
  })
  
}

const setupFavButton = () => {
  const btn = document.getElementById("fav-btn")
  btn.onclick = async () => handleUpdateBookList(bookListId,bookId)
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

