import * as Comments from "./httpComments.js"

export const fetchComments = async bookReference => await Comments.fetchComments(bookReference)

export const addComment = async (bookReference,text, rating) => await Comments.addUserComment({
        review : text,
        rating : rating,
        bookReference : bookReference
    }
) 

export const updateComment = commentReference => undefined

export const getComments = () => Comments.getUserComments()