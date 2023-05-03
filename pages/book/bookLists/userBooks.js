import * as Books from "./http/httpBooks.js";
import * as BookLists from "./dummy/dummyBookLists.js";

export const init = async (reference) => {
    await Books.fetchBook(reference)
    await BookLists.fetchBookList()
}

export const getBookLists = () => BookLists.getFetchedBookLists()

export const addToFavoriteList = async (reference, listReference) => await BookLists.addToBookList(reference,listReference)

export const removeFromFavoriteList = async (reference, listReference) => await BookLists.removeFromBookList(reference,listReference)

export const getBook = () => Books.getFetchedBook()

export const alreadyAdded = (reference, listReference) => BookLists.exists(reference,listReference)