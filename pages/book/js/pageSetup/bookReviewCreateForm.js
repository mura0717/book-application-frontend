import * as Factory from "../../../../shared/factories/elementFactory.js";
import * as BookRatings from "./bookRatings.js";
import * as UserComments from "../userComments/userComments.js";
import * as UserBooks from "../userBooks/userBooks.js";
import {toHtmlContainer} from "./bookComments.js";
import {signedIn} from "../../../../shared/users/bookUsers.js";

let toggleForm = false
let currentStars = 0

export const setupAddForm = bookReference => {
    showAddButton()
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
    BookRatings.updateAverageRating()
}

const setupUserRating = () => {
    const stars = BookRatings.createStarElements()
    for (let i = 0; i < stars.length; i++) {
        const star = stars.at(i)
        star.onclick = () => {
            const rating = i + 1
            currentStars = rating
            BookRatings.updateStarElements(stars,rating)
        }
        Factory.appendChildTo("user-rating",star)
    }
}

const showAddButton = () => {
    if (!signedIn())
        return;
    const btn = Factory.createButton("create-comment-btn", "", "Opret anmeldelse", handleAddClicked)
    Factory.appendChildTo("comment-section-bar", btn)
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
    window.scroll(0,520 + 275)
}

const closeCreateForm = () => {
    Factory.updateTextContent("create-comment-btn","Opret anmeldelse")
    document.getElementById("create-form-wrapper").style.height = "0"
    window.scroll(0,520)
}