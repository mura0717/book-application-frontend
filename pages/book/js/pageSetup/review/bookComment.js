import * as Factory from "../../../../../shared/factories/elementFactory.js";
import * as BookRatings from "./bookRatings.js";
import * as ReviewForm from "./bookUpdateReview.js"

export const toHtmlContainer = (comment,updateHandler, deleteHandler) => {
    const commentItem = Factory.createDiv("","comment-item")
    let menu
    if(comment.editable){
        menu = userMenu()
        setupCommentMenu(commentItem,menu,comment,updateHandler, deleteHandler)
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

const setupCommentMenu = (model,menuElement, comment, updateHandler, deleteHandler) => {
    const formCont = document.getElementById("create-form-wrapper")
    const menuEntries = menuElement.getElementsByClassName("menu-btn")
    const updateEntry = menuEntries.item(0)
    updateEntry.onclick = () => ReviewForm.showReviewForm(formCont,
        async reviewModel => await updateHandler(model,reviewModel),comment)
    const deleteEntry = menuEntries.item(1)
    deleteEntry.onclick = async () => await deleteHandler(model,comment)
}