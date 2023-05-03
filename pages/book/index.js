import * as Books from "./bookLists/userBooks.js"
import * as Factory from "./elementFactory.js";

export const initBook = (referenceId) => {
  Books.init(referenceId)
      .then(() => {
        setupFav(referenceId)
        setupReviewDetails()
        setupBookDetails()
      })
};

const setupBookDetails = () => {
  let book = Books.getBook()
  Factory.updateTextContent("book-title",book.title)
  Factory.updateTextContent("book-authors",book.authors)
  Factory.updateTextContent("descr-cont",book.description)
  Factory.updateImageElement("poster-cont",book.image)
}

const setupFav = reference => {
  setupFavIcons(reference)
  setupFavList()
}

const setupFavIcons = reference => {
  Factory.addOnclickHandler("fav-btn-add",async () => await addFavHandler(reference)) 
  updateFavoriteStatus()
  Factory.addOnclickHandler("fav-btn-added",async () => await addedFavHandler(reference))
}

const addFavHandler = async reference => {
  await Books.addToFavoriteList(reference,Factory.selectValue("list-sel"))
  updateFavoriteStatus()
}

const addedFavHandler = async reference => {
  await Books.removeFromFavoriteList(reference,Factory.selectValue("list-sel"))
  updateFavoriteStatus()
}

const setupFavList = () => {
  Factory.addOnChangeHandler("list-sel",async () => updateFavoriteStatus())
  updateFavListValues()
}

const updateFavListValues = () => {
  Books.getBookLists().forEach((b,i) => {
    const opt = document.createElement("option")
    opt.textContent = b.title
    if(i === 0)
      opt.selected = true
    opt.value = b.id
    Factory.appendChildTo("list-sel",opt)
  })
}

const setupReviewDetails = () => {
  for (let i = 0;i<5;i++){
    if(i < 3)
      Factory.appendChildTo("stars-cont",Factory.createImageElement("pages/book/resources/yellow-star.png","24px"))
    else
      Factory.appendChildTo("stars-cont",Factory.createImageElement("pages/book/resources/blank-star.png","24px"))
  }
}

const updateFavoriteStatus = () => {
  const book = Books.getBook()
  const reference = book.reference
  const bookListReference = Factory.selectValue("list-sel")
  if(Books.alreadyAdded(reference,bookListReference)){
    Factory.updateElementDisplay("fav-btn-add",false)
    Factory.updateElementDisplay("fav-btn-added",true)
  }
  else{
    Factory.updateElementDisplay("fav-btn-added",false)
    Factory.updateElementDisplay("fav-btn-add",true)
  }
}