import * as BookLists from "./httpBookLists.js";

export const getBookLists = async () => await BookLists.getBookLists()

export const getListTitles = async () => await BookLists.getListTitles()

export const addToFavoriteList = async (reference, listReference) => await BookLists.addToBookList(reference,listReference)

export const removeFromFavoriteList = async (reference, listReference) => await BookLists.removeFromBookList(reference,listReference)

export const alreadyAdded = async (reference, listReference) => await BookLists.exists(reference,listReference)

export const fetchBookList = async id => await BookLists.getBookList(id)

export const createBookList = async title => await BookLists.createBookList(title)

export const deleteBookList = async id => await BookLists.deleteBookList(id)

export const getBookList = async id => await BookLists.getBookList(id)

export const editBookList = async (id, title) => await BookLists.editBookList(id, title)