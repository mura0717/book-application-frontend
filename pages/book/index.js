import {fetchClient} from "../../utils.js";
import {createStar} from "./BookElementsFactory.js";

const bookReference = "_ojXNuzgHRcC"

export const initBook = (referenceId) => {
  console.log(referenceId);
  setupFavButton()
  initReviewStars(2)
};

const setupFavButton = () => {
  const btn = document.getElementById("fav-btn")
  btn.onclick = async () => handleUpdateBookList(bookListId,bookId)
}

const handleUpdateBookList = async (bookListId, bookId) => {
  const body = {"bookId" : bookId,"bookListId" :  bookListId}
  const response = await fetchClient.patch("/books/update",body)
  const responseMessage = response ? response.message : "None"
  console.log(responseMessage)
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

