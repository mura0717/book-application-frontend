import * as Books from "./js/userBooks/userBooks.js"
import {setupFav} from "./js/pageSetup/favorite/bookFavorites.js";
import {addButtonClicked, setupBookComments} from "./js/pageSetup/review/bookComments.js";
import {setupBookDetails, setupBookPlaceholders} from "./js/pageSetup/bookDetails.js";
import {setupRecPlaceholders, setupRecommendations} from "./js/pageSetup/recommendedBooks.js";
import {updateAverageRating} from "./js/pageSetup/review/bookRatings.js";
import * as ReviewForm from "./js/pageSetup/review/bookUpdateReview.js";
import {signedIn} from "../../shared/users/bookUsers.js";
import * as Factory from "../../shared/factories/elementFactory.js";

let showReviewForm = false

export const initBook = async (referenceId) => {
    setupPlaceholders()
    await Books.fetchBookDetails(referenceId)
    //initRecommendations().then()
    await initBookDetails()
    await initReviewDetails()
};

const setupPlaceholders = () => {
    setupBookPlaceholders()
    setupRecPlaceholders()
}

const initBookDetails = async () => {
    updateAverageRating()
    setupBookDetails()
    await setupFav()
}

const initReviewDetails =  async () => {
    showAddButton()
    await setupBookComments()
    updateAverageRating()
}

const initRecommendations = async () => {
    Books.fetchRecommendations()
        .then(setupRecommendations)
}

const showAddButton = () => {
    if (!signedIn())
        return;
    const btn = Factory.createButton("create-comment-btn", "", "Opret anmeldelse",handleAdd)
    Factory.appendChildTo("comment-section-bar", btn)
}

const handleAdd = () => {
    showReviewForm = !showReviewForm
    const cont = document.getElementById("create-form-wrapper")
    if(showReviewForm){
        ReviewForm.showReviewForm(cont,addButtonClicked)
        Factory.updateTextContent("create-comment-btn","Luk")
    }
    else{
        ReviewForm.closeReviewForm()
        Factory.updateTextContent("create-comment-btn","Opret anmeldelse")
    }
}