import * as Books from "./js/userBooks/userBooks.js"
import {setupFav} from "./js/pageSetup/favorite/bookFavorites.js";
import {addReview, setupBookComments} from "./js/pageSetup/review/bookComments.js";
import {setupBookDetails, setupBookPlaceholders} from "./js/pageSetup/bookDetails.js";
import {setupRecPlaceholders, setupRecommendations} from "./js/pageSetup/recommendedBooks.js";
import {updateAverageRating} from "./js/pageSetup/review/bookRatings.js";

export const initBook = async (referenceId) => {
    setupPlaceholders()
    await Books.fetchBookDetails(referenceId)
    initRecommendations().then()
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
    await setupBookComments()
    updateAverageRating()
}

const initRecommendations = async () => {
    Books.fetchRecommendations()
        .then(setupRecommendations)
}
