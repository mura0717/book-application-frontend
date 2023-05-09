import * as BookLists from "./httpBookLists.js";

export const fetchBookLists = async () => await BookLists.fetchBookLists()

export const getBookLists = async () => await BookLists.getBookLists()

export const getListTitles = async () => undefined

export const addToFavoriteList = async (reference, listReference) => await BookLists.addToBookList(reference,listReference)

export const removeFromFavoriteList = async (reference, listReference) => await BookLists.removeFromBookList(reference,listReference)

export const alreadyAdded = (reference, listReference) => BookLists.exists(reference,listReference)

export const fetchBookList = async id => await BookLists.getBookList(id)

export const createBookList = async title => await BookLists.createBookList(title)