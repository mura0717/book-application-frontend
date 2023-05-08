import * as Comments from "./dummyComments.js"

export const fetchComments = async bookReference => await Comments.fetchComments(bookReference)

export const addComment = async (text, rating) => await Comments.addUserComment({
        review : text,
        rating : rating
    }
) 

export const updateComment = commentReference => undefined

export const getComments = () => Comments.getUserComments()