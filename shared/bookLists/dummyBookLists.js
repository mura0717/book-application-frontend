let bookLists =[]

export const fetchBookLists = async () => {
    bookLists = [
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

export const getFetchedBookLists = () => bookLists

export const addToBookList = async (reference, listReference) => {
    const list = bookLists.find(b => b.id === listReference)
    if(list === undefined)
        return false
    list.references.push(reference)
    return true
}

export const getBookList = (id) => {
    const found = bookLists.find(list => list.id === id)
    if(found === undefined)
        return null
    return found
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
