import * as Comments from "./dummyComments.js"

export const fetchComments = async bookReference => await Comments.fetchComments(bookReference)

export const addComment = reviewRequest => Comments.addUserComment(reviewRequest) 

export const updateComment = commentReference => undefined

export const getComments = () => Comments.getUserComments()