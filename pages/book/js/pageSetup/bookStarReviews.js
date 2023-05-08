import * as Factory from "../../../../shared/factories/elementFactory.js";

export const updateWithStars = (el,stars) => {
    el.innerHTML = ""
    for (let i = 0;i<5;i++){
        if(i < stars)
            el.appendChild(Factory.createDiv("","good-star"))
        else
            el.appendChild(Factory.createDiv("","bad-star"))
    }
}

export const createStarElements = () => {
    let stars = []
    for (let i = 0;i<5;i++)
        stars.push(Factory.createDiv("","bad-star"))
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