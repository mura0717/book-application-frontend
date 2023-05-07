import {fetchClient} from "../../../../utils.js";

const route = "/books/recommendations"

let recommendations = {
    "recommendations" : []
}

export const fetchRecommendations = async (authors, title) => {
    const fullRoute = `${route}?author=${authors.at(0)}&title=${title}`
    const response = await fetchClient.get(fullRoute)
    if(response !== undefined)
        recommendations = response
}

export const  getRecommendations = () => recommendations