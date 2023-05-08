
let userComments = []

export const fetchComments = async bookReference => {
    userComments = [
        {
            "review" : "Piv elendig fremstilling af FC København. Alle ved de er Danmarks bedste hold",
            "rating" : 2,
            "username" : "Elmer2012",
            "reviewId" : "abcd"
        },
        {
            "review" : "Piv elendig fremstilling af FC København. Alle ved de er Danmarks bedste hold",
            "rating" : 2,
            "username" : "Elmer2012",
            "reviewId" : "abcd"
        },
        {
            "review" : "Piv elendig fremstilling af FC København. Alle ved de er Danmarks bedste hold",
            "rating" : 2,
            "username" : "Elmer2012",
            "reviewId" : "abcd"
        },
        {
            "review" : "Piv elendig fremstilling af FC København. Alle ved de er Danmarks bedste hold",
            "rating" : 2,
            "username" : "Elmer2012",
            "reviewId" : "abcd"
        }
    ]
    return true
}

export const getUserComments = () => userComments

export const addUserComment = reviewRequest => {
    const newComment = {
        "review" : reviewRequest.review,
        "rating" : reviewRequest.rating,
        "username" : "PowerRider",
        "bookReference" : reviewRequest.bookReference,
        "reviewId" : "abcd"
    }
    userComments.push(newComment)
    return newComment
}