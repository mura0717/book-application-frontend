import * as Factory from "../../../../../shared/factories/elementFactory.js";
import * as Comments from "../../userComments/userComments.js";

export const updateAverageRating = () => {
    const rating = getAverageRating()
    const cont = document.getElementById("stars-cont")
    updateWithStars(cont,rating)
}

export const updateWithStars = (el,stars) => {
    el.innerHTML = ""
    for (let i = 0;i<5;i++){
        if(i < stars)
            el.appendChild(Factory.createDiv("","good-star"))
        else
            el.appendChild(Factory.createDiv("","bad-star"))
    }
}

export const createStarElements = value => {
    let stars = []
    for (let i = 0;i<5;i++){
        if(i < value)
            stars.push(Factory.createDiv("","good-star"))
        else
            stars.push(Factory.createDiv("","bad-star"))
    }
    return stars
}

export const updateStarElements = (elements,stars) => {
    for (let i = 0;i<5;i++){
        const el = elements.at(i)
        if(i < stars)
            el.className = "good-star"
        else
            el.className = "bad-star"
    }
}

const getAverageRating = () => {
    const comments = Comments.getComments()
    return average(comments)
}

const average = (comments) => {
    const count = comments.length
    if(count === 0)
        return 0
    const sum = comments
        .map(c => c.rating)
        .reduce((r, acc) => r*(1/count),0)
    return Math.floor(sum)
}