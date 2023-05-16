import * as Books from "./../userBooks/userBooks.js";
import * as ElementFactory from "./../../../../shared/factories/elementFactory.js";
import * as ElementUpdate from "./../../../../shared/factories/elementUpdate.js";

export const setupBookPlaceholders = () => {
    const posterLoader = ElementFactory.createDiv("","loading-icon")
    ElementUpdate.appendChildTo("poster-cont",posterLoader)
}

export const setupBookDetails = () => {
    setupContent()
    setupEventHandlers()
}

const setupContent = () => {
    let book = Books.getBook()
    ElementUpdate.updateTextContent("book-title",book.title)
    ElementUpdate.updateTextContent("book-authors",formatAuthors(book.authors))
    ElementUpdate.updateInnerHtml("descr-cont",book.description)
    updateBookPoster(book.image)
    if(book.buyLink !== null){
        ElementUpdate.showElement("buy-btn",true)
        ElementUpdate.addOnclickHandler("buy-btn",() => window.location.href = book.buyLink)
    }
}

const updateBookPoster = (imageUrl) => {
    ElementUpdate.updateInnerHtml("poster-cont","")
    const img = ElementFactory.createImageElement("book-poster",imageUrl)
    img.width = "400"
    ElementUpdate.appendChildTo("poster-cont",img)
    
}

const setupEventHandlers = () => {
    ElementUpdate.addScrollHandler("descr-cont", hideInactiveScrollbar)
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