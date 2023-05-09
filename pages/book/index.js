import * as Books from "./js/userBooks/userBooks.js"
import * as BookLists from "../../shared/bookLists/userBookLists.js"
import {setupFav} from "./js/pageSetup/bookFavorites.js";
import {setupBookComments} from "./js/pageSetup/bookComments.js";
import {setupBookDetails, setupBookPlaceholders} from "./js/pageSetup/bookDetails.js";
import {setupRecPlaceholders, setupRecommendations} from "./js/pageSetup/recommendedBooks.js";
import {updateAverageRating} from "./js/pageSetup/bookRatings.js";
import {setupAddForm} from "./js/pageSetup/bookReviewCreateForm.js";

export const initBook = (referenceId) => {
    setupPlaceholders()
    init(referenceId)
        .then(initBookDetails)
        .then(setupAddForm)
        .then(setupBookComments)
        .then(updateAverageRating)
        //.then(initRecommendations)
        .catch(handleFetchError)
};

const init = async bookReference => {
    await Books.fetchBookDetails(bookReference)
    await BookLists.fetchBookLists()
    return bookReference
}

const setupPlaceholders = () => {
    setupBookPlaceholders()
    setupRecPlaceholders()
}

const initBookDetails = referenceId => {
    updateAverageRating()
    setupBookDetails()
    setupFav(referenceId)
}

const initRecommendations = async () => {
    await Books.fetchRecommendations()
    setupRecommendations()
}

const handleFetchError = () => {
    console.log("Fetch error")
}