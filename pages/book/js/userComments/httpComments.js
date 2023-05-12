import {fetchClient} from "../../../../utils.js";

let userComments = []

const fetchRoute = "/books/reviews"
const addRoute = "/books/add"

export const fetchComments = async bookReference =>  {
    const fullRoute = `${fetchRoute}?bookReference=${bookReference}`
    const response = await fetchClient.get(fullRoute)
    if(!response)
        return false
    userComments = response
    return true
}

export const getUserComments = () => userComments

export const addUserComment = async reviewModel => {
    const response = await fetchClient.postWithAuth(addRoute,reviewModel)
    if(response === undefined)
        return null
    userComments.push(response)
    return response
}