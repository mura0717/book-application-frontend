import * as HttpBooks from "./httpBooks.js";
import * as DummyBoooks from "./dummyBooks.js"

const test = false

const Books = !test ? HttpBooks : DummyBoooks

export const init = async (reference) => {
    await Books.fetchBook(reference)
}

export const getBook = () => Books.getFetchedBook()

export const getBooks = () => Books.getFetchedBooks()
