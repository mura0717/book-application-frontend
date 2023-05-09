import * as HttpBooks from "./httpBooks.js";
import * as DummyBoooks from "./dummyBooks.js"
import * as DummyRecommendations from "./dummyRecommedations.js"
import * as HttpRecommendations from "./httpRecommendations.js"

const useDummyBooks = false
const useDummyRecommendations = false

const Books = !useDummyBooks ? HttpBooks : DummyBoooks
const recommendations = !useDummyRecommendations ? HttpRecommendations : DummyRecommendations

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