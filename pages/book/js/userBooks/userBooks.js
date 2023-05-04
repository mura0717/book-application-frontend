import * as HttpBooks from "./httpBooks.js";
import * as DummyBoooks from "./dummyBooks.js"
import * as DummyRecommendations from "./dummyRecommedations.js"

const test = false
const Books = !test ? HttpBooks : DummyBoooks

export const fetchBookDetails = async (reference) => {
    await Books.fetchBook(reference)
}

export const fetchRecommendations = async () => {
    const book = Books.getFetchedBook()
    await DummyRecommendations.fetchRecommendations(book.reference)
}

export const getBook = () => Books.getFetchedBook()

export const getBooks = () => Books.getFetchedBooks()

export const getRecommendations = () => DummyRecommendations.getRecommendations()