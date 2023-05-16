
let userComments = []

export const fetchRestrictedComments = async bookReference => {
    userComments = [
        {
            "review" : "Hold da ferie en ringe performance af FC København i dag. Øv bøv.",
            "rating" : 1,
            "username" : "Elmer2012",
            "reviewId" : "abcd"
        },
        {
            "review" : "Hold da ferie en ringe performance af FC København i dag. Øv bøv.",
            "rating" : 1,
            "username" : "Elmer2012",
            "reviewId" : "abcd"
        }
    ]
    return true
}

export const getUserComments = () => userComments

export const addUserComment = async reviewRequest => {
    const newComment = {
        "review" : reviewRequest.review,
        "rating" : reviewRequest.rating,
        "username" : "Elmer2012",
        "bookReference" : reviewRequest.bookReference,
        "reviewId" : "abcd"
    }
    userComments.push(newComment)
    return newComment
}