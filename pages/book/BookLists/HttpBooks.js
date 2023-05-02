import {fetchClient} from "../../../utils";

const route = "/api/books"

export const fetchBook = async (reference) => {
    const uri = route + "?reference=" + reference
    return await fetchClient .get(uri)
}

export const fetchBookList = () => {
    return ""
}