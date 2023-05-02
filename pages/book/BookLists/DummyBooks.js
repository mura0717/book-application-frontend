
export const fetchBook = async reference => {
    return {
        id : "abcd",
        volumeInfo : {
            title : "Fateful Triangle",
            authors : ["Noam Chomsky, Bingo Leif"],
            publishedDate : "1997",
            description : "A good book bla bla",
            publisher : "Penguin books",
            language : "Danglish",
            categories : [
                "non-fiction","conflict","Free Palestine"
            ],
            imageLinks : {
                thumpnail : "https://cdn-ed.haymarketbooks.org/images/000005/641/9781608463992-9d7c1a7b4bf97888c37c9daea482ccd4.jpg20220302-22-1i3dmt7"
            }
        }
    }
}

export const fetchBookList = async () => {
    return [
        {
            title : "Favoritter",
            id : "1"
        },
        {
            title : "Vil gerne købe",
            id : "2"
        },
        {
            title : "Interessante",
            id : "3"
        }]
}