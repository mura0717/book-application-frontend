import * as Books from "./../userBooks/userBooks.js"
import * as ElementFactory from "./../../../../shared/factories/elementFactory.js"
import * as ElementUpdate from "./../../../../shared/factories/elementUpdate.js"
export const setupRecPlaceholders = () => {
    for (let i = 0; i < 5; i++) {
        const loadingCont = ElementFactory.createDiv("","rec-loading")
        const loadingDiv = ElementFactory.createDiv("","loading-icon")
        loadingCont.appendChild(loadingDiv)
        ElementUpdate.appendChildTo("rec-cont",loadingCont)
    }
}

export const setupRecommendations = () => {
    ElementUpdate.updateInnerHtml("rec-cont","")
    createRecommendations()
}

const createRecommendations = () => {
    const recs = Books.getRecommendations()
    const items = recs.map(toHtmlElement)
    for (let i = 0; i < items.length; i++) {
        const item = items.at(i)
        ElementUpdate.appendChildTo("rec-cont",item)
    }
}

const toHtmlElement = rec => {
    const el = createItem(rec)
    const reference = rec.reference
    el.onclick = () => window.router.navigate(`/#/book/${reference}`)
    return el
}

const createItem = rec => {
    const cont = ElementFactory.createDiv("","rec-item")
    const poster = ElementFactory.createDivWithBackdrop("",rec.imageLink.smallThumbnail,"rec-poster")
    const titleCont = ElementFactory.createParagraph(rec.title,"","rec-title")
    const authorsCont = ElementFactory.createParagraph(rec.authors,"","rec-author")
    let priceCont = ElementFactory.createParagraph("Not for sale","","rec-price")
    if(rec.currency != null)
        priceCont = ElementFactory.createParagraph(`${rec.priceAmount} ${rec.currency}`,"","rec-price")
    cont.appendChild(poster)
    cont.appendChild(titleCont)
    cont.appendChild(authorsCont)
    cont.appendChild(priceCont)
    return cont
}