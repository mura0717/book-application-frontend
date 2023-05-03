import * as BookLists from "./dummyBookLists.js";

export const init = async () => await BookLists.fetchBookList()

export const getBookLists = () => BookLists.getFetchedBookLists()

export const addToFavoriteList = async (reference, listReference) => await BookLists.addToBookList(reference,listReference)

export const removeFromFavoriteList = async (reference, listReference) => await BookLists.removeFromBookList(reference,listReference)

export const alreadyAdded = (reference, listReference) => BookLists.exists(reference,listReference)