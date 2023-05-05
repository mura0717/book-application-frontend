import * as Factory from "./../elementFactory.js";

export const setupReviewDetails = () => {
    for (let i = 0;i<5;i++){
        if(i < 3)
            Factory.appendChildTo("stars-cont",Factory.createImageElement("pages/book/resources/yellow-star.png","24px"))
        else
            Factory.appendChildTo("stars-cont",Factory.createImageElement("pages/book/resources/blank-star.png","24px"))
    }
}