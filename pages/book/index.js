import * as Books from "./js/userBooks/userBooks.js"
import {setupFav} from "./js/pageSetup/bookFavorites.js";
import {setupBookComments} from "./js/pageSetup/bookComments.js";
import {setupBookDetails, setupBookPlaceholders} from "./js/pageSetup/bookDetails.js";
import {setupRecPlaceholders, setupRecommendations} from "./js/pageSetup/recommendedBooks.js";
import {updateAverageRating} from "./js/pageSetup/bookRatings.js";
import {setupAddForm} from "./js/pageSetup/bookReviewCreateForm.js";

export const initBook = (referenceId) => {
    setupPlaceholders()
    Books.fetchBookDetails(referenceId)
        .then(initBookDetails)
        .then(setupAddForm)
        .then(setupBookComments)
        .then(updateAverageRating)
        //.then(initRecommendations)
        .catch(handleFetchError)
};

const setupPlaceholders = () => {
    setupBookPlaceholders()
    setupRecPlaceholders()
}

const initBookDetails = async referenceId => {
    updateAverageRating()
    setupBookDetails()
    await setupFav(referenceId)
}

const initRecommendations = async () => {
    Books.fetchRecommendations()
        .then(setupRecommendations)
}

const handleFetchError = e => {
    console.log(e)
}