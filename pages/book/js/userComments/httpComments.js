import {fetchClient} from "../../../../utils.js";

let userComments = []

const fetchRoute = "/reviews"
const updateRoute = "/reviews/update"
const deleteRoute = "/reviews/delete"

export const fetchComments = async bookReference =>  {
    const fullRoute = `${fetchRoute}?bookReference=${bookReference}`
    const response = await fetchClient.getWithAuth(fullRoute)
    if(!response)
        return false
    userComments = response
    return true
}

export const removeReview = async reviewId => {
    const requestBody = {
        reviewId : reviewId
    }
    const response = await fetchClient.deleteWithAuth(deleteRoute,requestBody)
    if(!response)
        return false
    return response
}

export const getUserComments = () => userComments

export const addUserComment = async reviewModel => {
    const response = await fetchClient.postWithAuth(updateRoute,reviewModel)
    if(response === undefined)
        return null
    userComments.push(response)
    return response
}