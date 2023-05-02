export const createStar = isGood => {
    const el = document.createElement("div")
    const dim = "24px"
    el.style.background = isGood ? "url('pages/book/resources/yellow-star.png')" :
        "url('pages/book/resources/blank-star.png')"
    el.style.backgroundSize = "cover"
    el.style.width = dim
    el.style.height = dim
    return el
}