import {fetchClient} from "../../../../utils.js";

const route = "/books/reference"

let book = null
let books = []

export const fetchBook = async (reference) => {
    const uri = route + "?reference=" + reference
    book = await fetchClient.get(uri)
}

export const getFetchedBook = () => book

export const getFetchedBooks = () => books

const formatBuyLink = link => {
    if(link === undefined || link === null)
        return null
    const s = new RegExp("^.+?id=\\w+")
    const results = s.exec(link)
    return results.at(0)
}