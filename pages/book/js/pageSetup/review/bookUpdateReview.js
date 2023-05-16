import * as Factory from "../../../../../shared/factories/elementFactory.js";
import * as BookRatings from "./bookRatings.js";
import * as ElementUpdate from "../../../../../shared/factories/elementUpdate.js";

let parentContainer = null
let reviewModel

export const showReviewForm = (parent,resultHandler, model) => {
    if(parent.innerHTML !== "")
        return
    parentContainer = parent
    reviewModel = model ?? emptyModel()
    ElementUpdate.updateTextContent("create-comment-btn","Luk")
    show(resultHandler)
}

export const isVisible = () => parentContainer != null && parentContainer.innerHTML !== ""

export const closeReviewForm = () => {
    window.scroll(0,520)
    const cont = document.getElementById("create-comment-form")
    parentContainer.removeChild(cont)
    ElementUpdate.updateTextContent("create-comment-btn","Opret anmeldelse")
}

const show = (resultHandler) => {
    const createform = Factory.createDiv("create-comment-form")
    const textArea = Factory.createTextArea("comment-text-ipt","",
        e => reviewModel.review = e.target.value)
    textArea.value = reviewModel.review
    createform.appendChild(textArea)
    createform.appendChild(createUserRating())
    const addButton = Factory.createButton("comment-add-btn","","Gem",
        async () => await handleClick(resultHandler))
    createform.appendChild(addButton)
    parentContainer.appendChild(createform)
    window.scroll(0,520 + 257)
}

const handleClick = async (clickHandler) => {
    if(await clickHandler(reviewModel))
        closeReviewForm()
}

const createUserRating = () => {
    const userRating = Factory.createDiv("user-rating")
    appendRatingSymbols(userRating)
    return userRating
}

const appendRatingSymbols = (el) => {
    const stars = BookRatings.createStarElements(reviewModel.rating)
    for (let i = 0; i < stars.length; i++) {
        const star = stars.at(i)
        star.onclick = () => {
            const rating = i + 1
            reviewModel.rating = rating
            BookRatings.updateStarElements(stars,rating)
        }
        el.appendChild(star)
    }
}

const emptyModel = () => {
    return {
        rating : 0,
            review : "",
        reviewId : "",
        bookReference : ""
    }
}