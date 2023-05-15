import {fetchClient} from "../../utils.js";

export const getBookLists = async () => {
    const response = await fetchClient.getWithAuth("/bookLists")
    if(response === undefined)
        return []
    return response
}

export const addToBookList = async (reference, listReference) => {
    const body = {
        bookId : reference,
        bookListId : listReference
    }
    const response = await fetchClient.patchWithAuth("/bookLists/addToBookList",body)
    if(!response)
        return {status : false, message : "Connection error"}
    return response
}

export const getListTitles = async () => {
    const response = await fetchClient.getWithAuth("/bookLists/titles")
    if(!response)
        return []
    return response
}

export const getBookList = async (id) => {
    const query = `?id=${id}`
    const response = await fetchClient.getWithAuth("/bookLists/" + query)
    if(response === undefined)
        return null
    return response
}

export const removeFromBookList = async (reference, listReference) => {
    const body = {
        bookId : reference,
        bookListId : listReference
    }
    const response = await fetchClient.patchWithAuth("/bookLists/removeFromBookList",body)
    if(!response)
        return false
    return response
}

export const exists = async (reference, listReference) => {
    const query = `?bookListId=${listReference}&bookReference=${reference}`
    const response = await fetchClient.getWithAuth("/bookLists/alreadyExists" + query)
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
    const response = await fetchClient.postWithAuth("/bookLists/create",body)
    if(!response)
        return {status : false, message : "Connection error"}
    return response
}
