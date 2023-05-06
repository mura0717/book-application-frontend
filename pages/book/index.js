import * as Books from "./js/userBooks/userBooks.js"
import * as BookLists from "../../shared/bookLists/userBookLists.js"
import {setupFav} from "./js/pageSetup/bookFavorites.js";
import {setupReviewDetails} from "./js/pageSetup/bookReviews.js";
import {setupBookDetails} from "./js/pageSetup/bookDetails.js";
import {setupRecommendations} from "./js/pageSetup/recommendedBooks.js";

export const initBook = (referenceId) => {
    init(referenceId).then(() => {
        setupFav(referenceId)
        setupReviewDetails()
        setupBookDetails()
      }).then(() => {
            Books.fetchRecommendations()
              .then(() => setupRecommendations())
    })
};

const init = async bookReference => {
    await Books.fetchBookDetails(bookReference)
    await BookLists.fetchBookLists()
}