import * as BookLists from "../../shared/bookLists/userBookLists.js"

export const initBookList = id => {
    console.log(id)
    
    const bookList = BookLists.getBookList(id)
    console.log(bookList.title)
};