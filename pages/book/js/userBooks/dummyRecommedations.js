
let recommendations = []

export const fetchRecommendations = (authors, title) => {
    recommendations = {
        "recommendations": [
            {
                "imageLink": {
                    "smallThumbnail": "https://cdn-ed.haymarketbooks.org/images/000005/641/9781608463992-9d7c1a7b4bf97888c37c9daea482ccd4.jpg20220302-22-1i3dmt7",
                    "thumbnail": "https://cdn-ed.haymarketbooks.org/images/000005/641/9781608463992-9d7c1a7b4bf97888c37c9daea482ccd4.jpg20220302-22-1i3dmt7",
                    "small": "https://cdn-ed.haymarketbooks.org/images/000005/641/9781608463992-9d7c1a7b4bf97888c37c9daea482ccd4.jpg20220302-22-1i3dmt7",
                    "medium": "https://cdn-ed.haymarketbooks.org/images/000005/641/9781608463992-9d7c1a7b4bf97888c37c9daea482ccd4.jpg20220302-22-1i3dmt7",
                    "large": "https://cdn-ed.haymarketbooks.org/images/000005/641/9781608463992-9d7c1a7b4bf97888c37c9daea482ccd4.jpg20220302-22-1i3dmt7",
                    "extraLarge": "https://cdn-ed.haymarketbooks.org/images/000005/641/9781608463992-9d7c1a7b4bf97888c37c9daea482ccd4.jpg20220302-22-1i3dmt7"
                },
                "title": "Fateful Triangle",
                "authors": "Noam Chomsky, Bingo Leif",
                "priceAmount": 15000,
                "currency": "zloty",
                "id" : "abcd"
            }
        ]
    }
}

export const  getRecommendations = () => recommendations.recommendations