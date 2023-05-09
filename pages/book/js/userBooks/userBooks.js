import * as Books from "./httpBooks.js";
import * as recommendations from "./httpRecommendations.js"

export const fetchBookDetails = async (reference) => {
    await Books.fetchBook(reference)
}

export const getBook = () => Books.getFetchedBook()

export const getBooks = () => Books.getFetchedBooks()

export const fetchRecommendations = async () => {
    const book = Books.getFetchedBook()
    await recommendations.fetchRecommendations(book.authors,book.title)
}

export const getRecommendations = () => recommendations.getRecommendations()