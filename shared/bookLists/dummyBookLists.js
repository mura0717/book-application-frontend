let bookLists =[]

export const fetchBookLists = async () => {
    bookLists = [
        {
            title : "Favoritter",
            references : [],
            listCount : 5,
            id : "1"
        },
        {
            title : "Vil gerne købe",
            references : [],
            listCount : 4,
            id : "2"
        },
        {
            title : "Interessante",
            references : [],
            listCount : 3,
            id : "3"
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
