export const getBookLists = async () => {
    return [
        {
            title : "Favoritter",
            references : [],
            listCount : 5,
            id : "1",
            createdAt : "2002-10-10",
            updatedAt : "2020-10-10"
        },
        {
            title : "Vil gerne købe",
            references : [],
            listCount : 4,
            id : "2",
            createdAt : "2002-10-10",
            updatedAt : "2020-10-10"
        },
        {
            title : "Interessante",
            references : [],
            listCount : 3,
            id : "3",
            createdAt  : "2002-10-10",
            updatedAt : "2020-10-10"
        }]
}

export const getListTitles = () => []


export const addToBookList = async (reference, listReference) => {
    
}

export const getBookList = async (id) => {
    return {
        title: "Favoritter",
        books: [
            {
                title: "Harry Potter 1",
                authors: "J.K.Rowling",
                categories: ["Ficton", "Fantasy"],
                priceAmount: "299",
                currency: "kr"
            },
            {
                title: "Harry Potter 2",
                authors: "J.K.Rowling",
                categories: ["Ficton", "Fantasy"],
                priceAmount: "399",
                currency: "kr"
            },
            {
                title: "Harry Potter 3",
                authors: "J.K.Rowling",
                categories: ["Ficton", "Fantasy"],
                priceAmount: "499",
                currency: "kr"
            }
        ],
        listCount: 3,
        id: "1"
    };
}

export const removeFromBookList = async (reference, listReference) => {
    const list = bookLists.find(b => b.id === listReference)
    if(list === undefined)
        return false
    let index = list.references.indexOf(reference)
    list.references.splice(index,1)
    return true
}

export const exists = (reference, listReference) => {
    const list = bookLists.find(b => b.id === listReference)
    if(list === undefined)
        return false
    const bookReference = list.references.find(r => r === reference)
    return bookReference !== undefined
}

export const fetchBookList = async (id) => {
    return {
       title: "Favoritter",
       books: [
           {
               title: "Harry Potter 1",
               authors: "J.K.Rowling",
               categories: ["Ficton", "Fantasy"],
               priceAmount: "299",
               currency: "kr"
           },
           {
               title: "Harry Potter 2",
               authors: "J.K.Rowling",
               categories: ["Ficton", "Fantasy"],
               priceAmount: "399",
               currency: "kr"
           },
           {
               title: "Harry Potter 3",
               authors: "J.K.Rowling",
               categories: ["Ficton", "Fantasy"],
               priceAmount: "499",
               currency: "kr"
           }
       ],
       listCount: 3,
       id: "1"
   };
}
