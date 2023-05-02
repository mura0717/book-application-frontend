import {fetchClient} from "../../../utils.js";

const route = "/books/reference"

export const fetchBook = async (reference) => {
    const uri = route + "?reference=" + reference
    return await fetchClient.get(uri)
}