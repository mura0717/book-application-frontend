import {fetchClient} from "../../../../utils.js";
import {signedIn} from "../../../../shared/users/bookUsers.js";

let userComments = []

const restrictedUri = "/reviews"
const unrestrictedUri = "/reviews/unrestricted"
const updateRoute = "/reviews/update"
const deleteRoute = "/reviews/delete"

export const fetchComments = async reference => {
    if(signedIn())
        await fetchUnRestrictedComments(reference)
    else
        await fetchRestrictedComments(reference)
}

const fetchRestrictedComments = async bookReference =>  {
    const fullRoute = `${restrictedUri}?bookReference=${bookReference}`
    const response = await fetchClient.get(fullRoute)
    if(!response)
        return false
    userComments = response
    return true
}

const fetchUnRestrictedComments = async bookReference =>  {
    const fullRoute = `${unrestrictedUri}?bookReference=${bookReference}`
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
    removeCommentFromMemory(reviewId)
    return response
}

export const getUserComments = () => userComments

export const getCommentsCount = () => userComments.length

export const addUserComment = async reviewModel => {
    const response = await fetchClient.postWithAuth(updateRoute,reviewModel)
    if(response === undefined)
        return null
    userComments.push(response)
    return response
}

const removeCommentFromMemory = id => {
    const subject = userComments.find(c => c.reviewId === id)
    if(!subject)
        return
    const index = userComments.indexOf(subject)
    userComments.splice(index,1)
}