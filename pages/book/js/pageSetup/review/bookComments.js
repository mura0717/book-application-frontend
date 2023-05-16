import * as ElementFactory from "./../../../../../shared/factories/elementFactory.js";
import * as ElementUpdate from "./../../../../../shared/factories/elementUpdate.js";
import * as UserComments from "../../userComments/userComments.js";
import * as UserBooks from "../../userBooks/userBooks.js"
import * as BookRatings from "./bookRatings.js";
import {signedIn} from "../../../../../shared/users/bookUsers.js";
import * as ReviewForm from "./bookUpdateReview.js";
import {toHtmlContainer} from "./bookComment.js";
import * as BookComments from "../../userComments/userComments.js";

export const setupBookComments = async () => {
    await BookComments.fetchComments(UserBooks.getBook().reference)
    showAddButton()
    createCommentSection()
    updateCommentsCount()
}

const showAddButton = () => {
    if (!signedIn())
        return;
    const btn = ElementFactory.createButton("create-comment-btn", "", "Opret anmeldelse",handleAdd)
    ElementUpdate.appendChildTo("comment-section-bar", btn)
}

const handleAdd = () => {
    const cont = document.getElementById("create-form-wrapper")
    if(!ReviewForm.isVisible())
        ReviewForm.showReviewForm(cont,addReview)
    else
        ReviewForm.closeReviewForm()
}

export const addReview = async reviewModel => {
    if(reviewModel.rating < 1)
        return false
    reviewModel.bookReference = UserBooks.getBook().reference
    const comment = await UserComments.addComment(reviewModel)
    if(comment == null)
        return false
    removePlaceholder()
    const htmlDiv = toHtmlContainer(comment,updateComment,deleteComment)
    ElementUpdate.appendChildTo("comment-cont",htmlDiv)
    BookRatings.updateAverageRating()
    updateCommentsCount()
    return true
}

const removePlaceholder = () => {
    const cont = document.getElementById("comment-cont")
    const placeholder = document.getElementById("comment-no-reviews")
    if(placeholder)
        cont.removeChild(placeholder)
}

const createCommentSection = () => {
    const comments = UserComments.getComments()
    if(comments.length === 0)
        return
    ElementUpdate.updateInnerHtml("comment-cont")
    comments.forEach(comment => {
        const commentItem = toHtmlContainer(comment,updateComment,deleteComment)
        ElementUpdate.appendChildTo("comment-cont",commentItem)
    })
}

const updateComment = async (el,reviewModel) => {
    const comment =  await BookComments.addComment(reviewModel)
    if(comment == null)
        return false
    updateElement(el,comment)
    BookRatings.updateAverageRating()
    return true
}

const updateElement = (el,reviewModel) => {
    const reviewText = el.querySelector(".comment-text")
    reviewText.textContent = reviewModel.review
    const ratingElement = el.querySelector(".comment-rating")
    BookRatings.updateWithStars(ratingElement,reviewModel.rating)
}

const deleteComment = async (el,reviewModel) => {
    const parent = document.getElementById("comment-cont")
    if(!await UserComments.removeComment(reviewModel.reviewId))
        return
    parent.removeChild(el)
    BookRatings.updateAverageRating()
    updateCommentsCount()
}

const updateCommentsCount = () => {
    const count = UserComments.getCommentsCount()
    ElementUpdate.updateTextContent("comment-count",`${count} anmeldelser`)
}