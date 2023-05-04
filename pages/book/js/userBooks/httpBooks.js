import {fetchClient} from "../../../../utils.js";

const route = "/books/reference"

let book = null
let books = []

export const fetchBook = async (reference) => {
    const uri = route + "?reference=" + reference
    const response = await fetchClient.get(uri)
    book = convertToBook(response)
}

export const getFetchedBook = () => book

export const getFetchedBooks = () => books

const convertToBook = bookResponse => {
    return {
        reference : bookResponse.id,
        title : bookResponse.volumeInfo.title,
        year : bookResponse.volumeInfo.publishedDate,
        description : bookResponse.volumeInfo.description,
        publisher : bookResponse.volumeInfo.publisher,
        authors : bookResponse.volumeInfo.authors,
        image : bookResponse.volumeInfo.imageLinks.thumbnail,
        buyLink : formatBuyLink(bookResponse.saleInfo.buyLink)
    }
}

const formatBuyLink = link => {
    if(link === undefined || link === null)
        return null
    const s = new RegExp("^.+?id=\\w+")
    const results = s.exec(link)
    return results.at(0)
}