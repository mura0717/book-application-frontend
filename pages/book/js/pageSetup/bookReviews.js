import * as Factory from "./../../../../shared/factories/elementFactory.js";
import {fetchComments, getComments} from "../userComments/userComments.js";

export const setupReviewDetails = bookReference => {
    const cont = document.getElementById("stars-cont")
    createStars(cont,3)
    fetchComments(bookReference)
        .then(createCommentSection)
}

const createCommentSection = () => {
    const comments = getComments()
    for (let i = 0; i < comments.length; i++) {
        const comment = comments.at(i)
        const commentCont = Factory.createDiv("","comment-item")
        const userLogo = Factory.createDiv("","user-logo")
        const userName = Factory.createDiv("","user-name",comment.username)
        
        
    }
    
}

const createStars = (el,stars) => {
    for (let i = 0;i<5;i++){
        if(i < stars)
            el.appendChild(Factory.createImageElement("pages/book/resources/yellow-star.png","24px"))
        else
            el.appendChild(Factory.createImageElement("pages/book/resources/blank-star.png","24px"))
    }
}