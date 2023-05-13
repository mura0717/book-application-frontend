import * as Comments from "./httpComments.js"

export const fetchComments = async bookReference => await Comments.fetchComments(bookReference)

export const addComment = async reviewModel => await Comments.addUserComment(reviewModel) 

export const removeComment = async reviewId => await Comments.removeReview(reviewId)

export const getComments = () => Comments.getUserComments()