import {fetchClient} from "../../utils.js";

const fetchAllRoute = "/bookLists"
const fetchSingleRoute = "/bookLists/"
const addToRoute = "/bookLists/addToBookList"
const createRoute = "/bookLists/create"
const fetchTitlesRoute = "/bookLists/titles"
const duplicateRoute = "/bookLists/alreadyExists"

let hasFetched = false

export const getBookLists = async () => {
    const response = await fetchClient.getWithAuth(fetchAllRoute)
    if(response === undefined)
        return []
    hasFetched = true
    return response
}

export const addToBookList = async (reference, listReference) => {
    const body = {
        bookId : reference,
        bookListId : listReference
    }
    const response = await fetchClient.patchWithAuth(addToRoute,body)
    if(!response)
        return {status : false, message : "Connection error"}
    return response
}

export const getListTitles = async () => {
    const response = await fetchClient.getWithAuth(fetchTitlesRoute)
    if(!response)
        return []
    hasFetched = true
    return response
}

export const getBookList = async (id) => {
    const query = `?id=${id}`
    const response = await fetchClient.getWithAuth(fetchSingleRoute + query)
    if(response === undefined)
        return null
    return response
}

export const removeFromBookList = async (reference, listReference) => {
    /*
        Needs to implement endpoint for this functionality
     */
    return false
}

export const exists = async (reference, listReference) => {
    const query = `?bookListId=${listReference}&bookReference=${reference}`
    const response = await fetchClient.getWithAuth(duplicateRoute + query)
    if(!response)
        return false
    return response
}

/*
    Til Kaan:
    Ex. fail:
        
        {
            status : false,
            message : "Booklist already exists",
            title : null,
            id : null,
            listCount : 0,
        }
    ex. success:
    
        {
            status : true,
            message : "",
            title : "The game",
            id : Abbcd89,
            listCount : 3,
        }
 */

export const createBookList = async title => {
    const body = {title : title}
    const response = await fetchClient.postWithAuth(createRoute,body)
    if(!response)
        return {status : false, message : "Connection error"}
    return response
}
