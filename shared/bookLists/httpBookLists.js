import {fetchClient} from "../../utils.js";

let bookLists =[]

const bookList = "/books/bookLists"

export const fetchBookLists = async () => {
    const response = await fetchClient.getWithAuth(bookList)
    bookLists = response !== undefined ? response : bookLists
}

export const getFetchedBookLists = () => bookLists

export const addToBookList = async (reference, listReference) => {
    const body = {
        bookId : reference,
        bookListId : listReference
    }
    const response = await fetchClient.pathWithAuth(bookList,body)
    return response !== undefined
}

export const getBookList = (id) => {
    const found = bookLists.find(list => list.id === id)
    if(found === undefined)
        return null
    return found
}

export const removeFromBookList = async (reference, listReference) => {
    const list = bookLists.find(b => b.id === listReference)
    if(list === undefined)
        return false
    let index = list.references.indexOf(reference)
    list.references.splice(index,1)
    return true
}

export const exists = (reference, listReference) => {
    const list = bookLists.find(b => b.id === listReference)
    if(list === undefined)
        return false
    const bookReference = list.references.find(r => r === reference)
    return bookReference !== undefined
}

export const fetchBookList = async (id) => {
    
}
