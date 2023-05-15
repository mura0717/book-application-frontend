import * as Books from "./../userBooks/userBooks.js";
import * as Factory from "./../../../../shared/factories/elementFactory.js";

export const setupBookPlaceholders = () => {
    const posterLoader = Factory.createDiv("","loading-icon")
    Factory.appendChildTo("poster-cont",posterLoader)
}

export const setupBookDetails = () => {
    setupContent()
    setupEventHandlers()
}

const setupContent = () => {
    let book = Books.getBook()
    Factory.updateTextContent("book-title",book.title)
    Factory.updateTextContent("book-authors",formatAuthors(book.authors))
    Factory.updateInnerHtml("descr-cont",book.description)
    updateBookPoster(book.image)
    if(book.buyLink !== null){
        Factory.showElement("buy-btn",true)
        Factory.addOnclickHandler("buy-btn",() => window.location.href = book.buyLink)
    }
}

const updateBookPoster = (imageUrl) => {
    Factory.updateInnerHtml("poster-cont","")
    const img = Factory.createImageElement("book-poster",imageUrl)
    img.width = "400"
    Factory.appendChildTo("poster-cont",img)
    
}

const setupEventHandlers = () => {
    Factory.addScrollHandler("descr-cont", hideInactiveScrollbar)
}

let timer = null

const hideInactiveScrollbar = el => {
    el.className = "show-scrollbar"
    if(timer != null)
        window.clearTimeout(timer)
    timer = setTimeout(() => {
        el.className = "no-scrollbar"
    },1000)
}

const formatAuthors = authors => {
    let str = ""
    for (let i = 0;i < authors.length;i++){
        str += authors[i] + ", "
    }
    return str.substring(0,str.length - 2)
}