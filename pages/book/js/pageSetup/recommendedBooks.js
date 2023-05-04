import * as Books from "./../userBooks/userBooks.js"
import * as Factory from "./../elementFactory.js"

export const setupRecommendations = () => {
    const recs = Books.getRecommendations()
    const items = recs.map(rec => createItem(rec))
    const cont = document.getElementById("rec-cont")
    for (let i = 0; i < items.length; i++) {
        const item = items.at(i)
        cont.appendChild(item)
    }
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