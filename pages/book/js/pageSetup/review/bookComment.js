import * as Factory from "../../../../../shared/factories/elementFactory.js";
import * as BookRatings from "./bookRatings.js";
import * as ReviewForm from "./bookUpdateReview.js"
import * as BookComments from "../../userComments/userComments.js"

export const toHtmlContainer = comment => {
    const commentItem = Factory.createDiv("","comment-item")
    let menu
    if(comment.editable){
        menu = userMenu()
        setupUpdateHandler(commentItem,menu,comment)
    }
    else{
        menu = Factory.createDiv("","user-logo")
    }
    commentItem.appendChild(menu)
    commentItem.appendChild(Factory.createDiv("","user-name",comment.username))
    const rating = Factory.createDiv("","comment-rating")
    BookRatings.updateWithStars(rating,comment.rating)
    commentItem.appendChild(rating)
    commentItem.appendChild(Factory.createDiv("","comment-text",comment.review))
    return commentItem
}

const userMenu = () => {
    const html = `
            <div class="dropdown">
              <button class="user-menu"" data-bs-toggle="dropdown" aria-expanded="false">
              </button>
              <div class="dropdown-menu" aria-labelledby="user-logo">
                <button class="menu-btn">Opdater</button>
                <button class="menu-btn">Slet</button>
              </div>
            </div>
    `
    const el = Factory.createDiv()
    el.innerHTML = DOMPurify.sanitize(html)
    return el
}

const setupUpdateHandler = (model,menuElement, comment) => {
    const formCont = document.getElementById("create-form-wrapper")
    const buttons = menuElement.getElementsByClassName("menu-btn")
    const updateButton = buttons.item(0)
    updateButton.onclick = () => ReviewForm.updateReviewForm(formCont,comment,
        async reviewModel => await updateComment(model,reviewModel))
    const removeButton = buttons.item(1)
    removeButton.onclick = async () => await deleteComment(model,comment)
}

const updateComment = async (el,reviewModel) => {
    const comment =  await BookComments.addComment(reviewModel) 
    if(comment == null)
        return false
    updateElement(el,comment)
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
    if(await BookComments.removeComment(reviewModel.reviewId)){
        parent.removeChild(el)
    }
}