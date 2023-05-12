import * as Comments from "./httpComments.js"

export const fetchComments = async bookReference => await Comments.fetchComments(bookReference)

export const addComment = async reviewModel => await Comments.addUserComment(reviewModel) 

export const updateComment = commentReference => undefined

export const getComments = () => Comments.getUserComments()