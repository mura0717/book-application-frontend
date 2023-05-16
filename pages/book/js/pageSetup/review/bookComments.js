import * as ElementFactory from "./../../../../../shared/factories/elementFactory.js";
import * as ElementUpdate from "./../../../../../shared/factories/elementUpdate.js";
import * as UserComments from "../../userComments/userComments.js";
import * as UserBooks from "../../userBooks/userBooks.js"
import * as BookRatings from "./bookRatings.js";
import {signedIn} from "../../../../../shared/users/bookUsers.js";
import * as ReviewForm from "./bookUpdateReview.js";
import {toHtmlContainer} from "./bookComment.js";

export const setupBookComments = async () => {
    showAddButton()
    await UserComments.fetchComments(UserBooks.getBook().reference)
    createCommentSection()
}

const showAddButton = () => {
    if (!signedIn())
        return;
    const btn = ElementFactory.createButton("create-comment-btn", "",
        "Opret anmeldelse",handleAdd)
    ElementUpdate.appendChildTo("comment-section-bar", btn)
}

const handleAdd = () => {
    const cont = document.getElementById("create-form-wrapper")
    if(!ReviewForm.isVisible()){
        ReviewForm.showReviewForm(cont,addReview)
        ElementUpdate.updateTextContent("create-comment-btn","Luk")
    }
    else{
        ReviewForm.closeReviewForm()
        ElementUpdate.updateTextContent("create-comment-btn","Opret anmeldelse")
    }
}

export const addReview = async reviewModel => {
    if(reviewModel.rating < 1)
        return false
    reviewModel.bookReference = UserBooks.getBook().reference
    const comment = await UserComments.addComment(reviewModel)
    if(comment == null)
        return false
    removePlaceholder()
    const htmlDiv = toHtmlContainer(comment)
    ElementUpdate.appendChildTo("comment-cont",htmlDiv)
    BookRatings.updateAverageRating()
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
    ElementUpdate.updateInnerHtml("comment-cont", "")
    for (let i = 0; i < comments.length; i++) {
        const comment = comments.at(i)
        const commentItem = toHtmlContainer(comment)
        ElementUpdate.appendChildTo("comment-cont",commentItem)
    }
}