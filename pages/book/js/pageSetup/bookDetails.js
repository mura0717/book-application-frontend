import * as Books from "./../userBooks/userBooks.js";
import * as Factory from "./../elementFactory.js";

export const setupBookDetails = () => {
    let book = Books.getBook()
    Factory.updateTextContent("book-title",book.title)
    Factory.updateTextContent("book-authors",book.authors)
    Factory.updateInnerHtml("descr-cont",book.description)
    Factory.updateImageElement("poster-cont",book.image)
    if(book.buyLink !== null){
        Factory.showElement("buy-btn",true)
        Factory.addOnclickHandler("buy-btn",() => window.location.href = book.buyLink)
    }
}