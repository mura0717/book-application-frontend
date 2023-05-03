let book = null
let books = []

export const fetchBook = async reference => {
    const bookResponse = {
        id : "abcd",
        saleInfo : {
            buyLink : null
        },
        volumeInfo : {
            title : "Fateful Triangle",
            authors : ["Noam Chomsky, Bingo Leif"],
            publishedDate : "1997",
            description : "A good book bla bla bla bla bla bla bla bla bla bla bla",
            publisher : "Penguin books",
            language : "Danglish",
            categories : [
                "non-fiction","conflict","Free Palestine"
            ],
            imageLinks : {
                thumbnail : "https://cdn-ed.haymarketbooks.org/images/000005/641/9781608463992-9d7c1a7b4bf97888c37c9daea482ccd4.jpg20220302-22-1i3dmt7"
            }
        }
    }
    book = convertToBook(bookResponse)
}

const convertToBook = bookResponse => {
    return {
        reference : bookResponse.id,
        title : bookResponse.volumeInfo.title,
        year : bookResponse.volumeInfo.publishedDate,
        description : bookResponse.volumeInfo.description,
        publisher : bookResponse.volumeInfo.publisher,
        authors : formatAuthors(bookResponse.volumeInfo.authors),
        image : bookResponse.volumeInfo.imageLinks.thumbnail,
        buyLink : bookResponse.saleInfo.buyLink
    }
}

const formatAuthors = authors => {
    let str = ""
    for (let i = 0;i < authors.length;i++){
        str += authors[i] + ", "
    }
    return str.substring(0,str.length - 2)
}

export const getFetchedBook = () => book

export const getFetchedBooks = () => books