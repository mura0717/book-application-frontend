import * as Books from "./js/userBooks/userBooks.js"
import * as BookLists from "./js/bookLists/userBookLists.js"
import * as Factory from "./elementFactory.js";

export const initBook = (referenceId) => {
  init(referenceId).then(() => {
        setupFav(referenceId)
        setupReviewDetails()
        setupBookDetails()
      })
};

const init = async bookReference => {
  await Books.init(bookReference)
  await BookLists.init()
}

const setupBookDetails = () => {
  let book = Books.getBook()
  Factory.updateTextContent("book-title",book.title)
  Factory.updateTextContent("book-authors",book.authors)
  Factory.updateTextContent("descr-cont",book.description)
  Factory.updateImageElement("poster-cont",book.image)
  if(book.buyLink !== null){
    Factory.showElement("buy-btn",true)
    Factory.addOnclickHandler("buy-btn",() => window.location.href = book.buyLink)
  }
}

const setupFav = reference => {
  setupFavIcons(reference)
  setupFavList()
}

const setupFavIcons = reference => {
  Factory.addOnclickHandler("fav-btn-add",async () => await addToFavoritesHandler(reference)) 
  updateFavoriteStatus()
  Factory.addOnclickHandler("fav-btn-added",async () => await removeFromFavoritesHandler(reference))
}

const addToFavoritesHandler = async reference => {
  const result = await BookLists.addToFavoriteList(reference,Factory.selectValue("list-sel"))
  if(!result)
    alert("Boogie Preben slår til igen! Tilkald politiet eller fyr mønter efter ham. Hvis i vælger at fyre mønter" +
        "efter ham, kan det varmt anbefales at varme mønterne op med en lighter inde i tyrer dem i hovedet på ham. " +
        "Det kan han så godt lide.")
  showAddedButton(result)
}

const removeFromFavoritesHandler = async reference => {
  const result = await BookLists.removeFromFavoriteList(reference,Factory.selectValue("list-sel"))
  showAddedButton(!result)
}

const setupFavList = () => {
  Factory.addOnChangeHandler("list-sel",async () => updateFavoriteStatus())
  updateFavListValues()
}

const updateFavListValues = () => {
  BookLists.getBookLists().forEach((b,i) => {
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
  showAddedButton(BookLists.alreadyAdded(reference,bookListReference))
}

const showAddedButton = show => {
  if(show){
    Factory.showElement("fav-btn-add",false)
    Factory.showElement("fav-btn-added",true)
  }
  else{
    Factory.showElement("fav-btn-added",false)
    Factory.showElement("fav-btn-add",true)
  }
}