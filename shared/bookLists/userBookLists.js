import * as BookLists from "./dummyBookLists.js";

export const fetchBookLists = async () => await BookLists.fetchBookLists()

export const getBookLists = () => BookLists.getFetchedBookLists()

export const getBookList = id => BookLists.getBookList(id)

export const addToFavoriteList = async (reference, listReference) => await BookLists.addToBookList(reference,listReference)

export const removeFromFavoriteList = async (reference, listReference) => await BookLists.removeFromBookList(reference,listReference)

export const alreadyAdded = (reference, listReference) => BookLists.exists(reference,listReference)