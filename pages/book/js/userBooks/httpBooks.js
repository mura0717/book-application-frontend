import {fetchClient} from "../../../../utils.js";

const route = "/books/reference"

let book = null

export const fetchBook = async (reference) => {
    const uri = route + "?reference=" + reference
    book = await fetchClient.get(uri)
    if(!book)
        return
    book.buyLink = formatBuyLink(book.buyLink)
}

export const getFetchedBook = () => book

const formatBuyLink = link => {
    if(link === undefined || link === null)
        return null
    const s = new RegExp("^.+?id=\\w+")
    const results = s.exec(link)
    return results.at(0)
}