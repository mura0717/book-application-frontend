import * as Factory from "./../../../../../shared/factories/elementFactory.js";
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
    const btn = Factory.createButton("create-comment-btn", "",
        "Opret anmeldelse",handleAdd)
    Factory.appendChildTo("comment-section-bar", btn)
}

const handleAdd = () => {
    const cont = document.getElementById("create-form-wrapper")
    if(!ReviewForm.isVisible()){
        ReviewForm.showReviewForm(cont,addReview)
        Factory.updateTextContent("create-comment-btn","Luk")
    }
    else{
        ReviewForm.closeReviewForm()
        Factory.updateTextContent("create-comment-btn","Opret anmeldelse")
    }
}

export const addReview = async reviewModel => {
    if(reviewModel.rating < 1)
        return false
    reviewModel.bookReference = UserBooks.getBook().reference
    const comment = await UserComments.addComment(reviewModel)
    if(comment == null)
        return false
    const htmlDiv = toHtmlContainer(comment)
    Factory.appendChildTo("comment-cont",htmlDiv)
    BookRatings.updateAverageRating()
    return true
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