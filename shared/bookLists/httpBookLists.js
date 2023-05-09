import {fetchClient} from "../../utils.js";

let bookLists =[]

const fetchAllRoute = "/bookLists"
const fetchSingleRoute = "/bookLists/"
const updateRoute = "/bookLists/update"
const createRoute = "/bookLists/create"

let hasFetched = false

export const fetchBookLists = async () => {
    const response = await fetchClient.getWithAuth(fetchAllRoute)
    bookLists = response !== undefined ? response : bookLists
    hasFetched = true
    return response
}

export const getBookLists = async () => {
    const response = await fetchClient.getWithAuth(fetchAllRoute)
    if(response === undefined)
        return []
    hasFetched = true
    return response
}

export const addToBookList = async (reference, listReference) => {
    const body = {
        bookReference : reference,
        bookListId : listReference
    }
    const response = await fetchClient.pathWithAuth(updateRoute,body)
    return response !== undefined
}

export const getBookList = async (id) => {
    const query = `?id=${id}`
    const response = await fetchClient.getWithAuth(fetchSingleRoute + query)
    if(response === undefined)
        return null
    return response
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

export const createBookList = async title => {
    const body = {title : title}
    const response = await fetchClient.postWithAuth(createRoute,body)
    if(response === undefined)
        return null
    return response.title
}
