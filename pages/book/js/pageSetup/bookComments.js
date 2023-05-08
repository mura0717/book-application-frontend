import * as Factory from "./../../../../shared/factories/elementFactory.js";
import * as UserComments from "../userComments/userComments.js";
import * as UserBooks from "../userBooks/userBooks.js"
import {createStarElements, updateStarElements, updateWithStars} from "./bookStarReviews.js";
import {signedIn} from "../../../../shared/users/bookUsers.js";


let toggleForm = false
let currentStars = 0

export const setupBookComments = () => {
    createIntroSection()
    setupAddForm()
    UserComments.fetchComments(UserBooks.getBook().reference)
        .then(createCommentSection)
}

const createIntroSection = () => {
    Factory.appendChildTo("comment-section-bar",Factory.createDiv("comment-section-title","","Anmeldelser"))
    if(signedIn()){
        const btn = Factory.createButton("create-comment-btn","","Opret anmeldelse",handleAddClicked)
        Factory.appendChildTo("comment-section-bar",btn)
    }
}

const handleAddClicked = () => {
    toggleForm = !toggleForm
    if(toggleForm)
        showCreateFrom()
    else
        closeCreateForm()
}

const showCreateFrom = () => {
    Factory.updateTextContent("create-comment-btn","Luk")
    const el = document.getElementById("create-form-wrapper")
    el.style.height = "275px"
    const rect = el.getBoundingClientRect()
    window.scroll(0,520 + 275)
}

const closeCreateForm = () => {
    Factory.updateTextContent("create-comment-btn","Opret anmeldelse")
    document.getElementById("create-form-wrapper").style.height = "0"
}

const setupAddForm = bookReference => {
    setupUserRating()
    Factory.addOnclickHandler("comment-add-btn",addButtonClicked)
}

const addButtonClicked = async () => {
    if(currentStars < 1)
        return
    const textBox = document.getElementById("comment-text-ipt")
    const comment = await UserComments.addComment(UserBooks.getBook().reference,textBox.value,currentStars)
    if(comment == null)
        return
    const htmlDiv = toHtmlContainer(comment)
    Factory.appendChildTo("comment-cont",htmlDiv)
    closeCreateForm()
}

const setupUserRating = () => {
    const stars = createStarElements()
    for (let i = 0; i < stars.length; i++) {
        const star = stars.at(i)
        star.onclick = () => {
            const rating = i + 1
            currentStars = rating
            updateStarElements(stars,rating)
        }
        Factory.appendChildTo("user-rating",star)
    }
}

const createCommentSection = () => {
    const comments = UserComments.getComments()
    for (let i = 0; i < comments.length; i++) {
        const comment = comments.at(i)
        const commentItem = toHtmlContainer(comment)
        Factory.appendChildTo("comment-cont",commentItem)
    }
}

const toHtmlContainer = comment => {
    const commentItem = Factory.createDiv("","comment-item")
    commentItem.appendChild(Factory.createDiv("","user-logo"))
    commentItem.appendChild(Factory.createDiv("","user-name",comment.username))
    const rating = Factory.createDiv("","comment-rating")
    updateWithStars(rating,comment.rating)
    commentItem.appendChild(rating)
    commentItem.appendChild(Factory.createDiv("","comment-text",comment.review))
    return commentItem
}