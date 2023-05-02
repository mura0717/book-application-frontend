import {fetchBook, fetchBookList} from "./DummyBooks.js";

class UserList{
    references
    title
}

class Book{
    title
    year
    publisher
    description
    image
    authors
}

let bookLists =[]
let book = null


export const init = async (reference) => {
    const bookResponse =  await fetchBook(reference)
    book = convertToBook(bookResponse)
    bookLists = await fetchBookList()
}

const convertToBook = bookResponse => {
    return  {
        title : bookResponse.volumeInfo.title,
        year : bookResponse.volumeInfo.publishedDate,
        description : bookResponse.volumeInfo.description,
        publisher : bookResponse.volumeInfo.publisher,
        authors : formatAuthors(bookResponse.volumeInfo.authors),
        image : bookResponse.volumeInfo.imageLinks.thumpnail
    }
}

export const bookListTitles = () => bookLists.map(b => b.title)

export const bookListId = title => {
    const filtered = bookLists.filter(b => b.title === title)
    if(filtered.length > 0)
        return filtered.at(0)
    return ""
}

export const getBook = () => book

const formatAuthors = authors => {
    let str = ""
    for (let i = 0;i < authors.length;i++){
        str += authors[i] + ", "
    }
    return str.substring(0,str.length - 2)
}