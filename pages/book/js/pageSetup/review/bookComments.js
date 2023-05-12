import * as Factory from "./../../../../../shared/factories/elementFactory.js";
import * as UserComments from "../../userComments/userComments.js";
import * as UserBooks from "../../userBooks/userBooks.js"
import * as BookRatings from "./bookRatings.js";

export const setupBookComments = async () => {
    await UserComments.fetchComments(UserBooks.getBook().reference)
    createCommentSection()
}

const createCommentSection = () => {
    const comments = UserComments.getComments()
    if(comments.length === 0)
        return
    Factory.updateInnerHtml("comment-cont", "")
    for (let i = 0; i < comments.length; i++) {
        const comment = comments.at(i)
        const commentItem = toHtmlContainer(comment)
        Factory.appendChildTo("comment-cont",commentItem)
    }
}

export const addButtonClicked = async reviewModel => {
    if(reviewModel.rating < 1)
        return
    reviewModel.bookReference = UserBooks.getBook().reference
    const comment = await UserComments.addComment(reviewModel)
    if(comment == null)
        return
    const htmlDiv = toHtmlContainer(comment)
    Factory.appendChildTo("comment-cont",htmlDiv)
    BookRatings.updateAverageRating()
}

const toHtmlContainer = comment => {
    const commentItem = Factory.createDiv("","comment-item")
    commentItem.appendChild(Factory.createDiv("","user-logo"))
    commentItem.appendChild(Factory.createDiv("","user-name",comment.username))
    const rating = Factory.createDiv("","comment-rating")
    BookRatings.updateWithStars(rating,comment.rating)
    commentItem.appendChild(rating)
    commentItem.appendChild(Factory.createDiv("","comment-text",comment.review))
    return commentItem
}