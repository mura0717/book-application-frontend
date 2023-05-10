import * as Books from "./../userBooks/userBooks.js"
import * as Factory from "./../../../../shared/factories/elementFactory.js"

export const setupRecPlaceholders = () => {
    for (let i = 0; i < 5; i++) {
        const loadingCont = Factory.createDiv("","rec-loading")
        const loadingDiv = Factory.createDiv("","loading-icon")
        loadingCont.appendChild(loadingDiv)
        Factory.appendChildTo("rec-cont",loadingCont)
    }
}

export const setupRecommendations = () => {
    Factory.updateInnerHtml("rec-cont","")
    createRecommendations()
}

const createRecommendations = () => {
    const recs = Books.getRecommendations()
    const items = recs.map(toHtmlElement)
    for (let i = 0; i < items.length; i++) {
        const item = items.at(i)
        Factory.appendChildTo("rec-cont",item)
    }
}

const toHtmlElement = rec => {
    const el = createItem(rec)
    const reference = rec.reference
    el.onclick = () => window.router.navigate(`/#/book/${reference}`)
    return el
}

const createItem = rec => {
    const cont = Factory.createDiv("","rec-item")
    const poster = Factory.createDivWithBackdrop("",rec.imageLink.smallThumbnail,"rec-poster")
    const titleCont = Factory.createParagraph(rec.title,"","rec-title")
    const authorsCont = Factory.createParagraph(rec.authors,"","rec-author")
    let priceCont = Factory.createParagraph("Not for sale","","rec-price")
    if(rec.currency != null)
        priceCont = Factory.createParagraph(`${rec.priceAmount} ${rec.currency}`,"","rec-price")
    cont.appendChild(poster)
    cont.appendChild(titleCont)
    cont.appendChild(authorsCont)
    cont.appendChild(priceCont)
    return cont
}