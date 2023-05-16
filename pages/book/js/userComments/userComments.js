import * as Comments from "./httpComments.js"

export const fetchComments = async reference => Comments.fetchComments(reference)

export const addComment = async reviewModel => await Comments.addUserComment(reviewModel) 

export const removeComment = async reviewId => await Comments.removeReview(reviewId)

export const getComments = () => Comments.getUserComments()

export const getCommentsCount = () => Comments.getCommentsCount()