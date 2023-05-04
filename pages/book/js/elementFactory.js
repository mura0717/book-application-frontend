export const createImageElement = (url, dim) => {
    const el = document.createElement("div")
    el.style.background = `url('${url}')`
    el.style.backgroundSize = "cover"
    el.style.width = dim
    el.style.height = dim
    return el
}

export const updateImageElement = (id, imageUrl) => {
    let el = document.getElementById(id)
    el.style.background = `url('${imageUrl}')`
    el.style.backgroundSize = "cover"
}

export const appendChildTo = (id,childElement) => {
    let el = document.getElementById(id)
    el.appendChild(childElement)
}

export const updateTextContent = (id, content) => document.getElementById(id).textContent = content

export const updateInnerHtml = (id, content) => document.getElementById(id).innerHTML = DOMPurify.sanitize(content)

export const selectValue = (id) => {
    const el = document.getElementById(id)
    return el.value
}

export const addOnChangeHandler = (id, handler) => {
    const el = document.getElementById("list-sel")
    el.onchange = handler
}

export const addOnclickHandler = (id, handler) => {
    const el = document.getElementById(id)
    el.onclick = handler
}

export const showElement = (id, show) => {
    const el = document.getElementById(id)
    el.style.display = show ? "block" : "none"
}

export const createDiv = (id,classNames) => {
    return createHTMLElement("div", id, classNames)
}

export const createDivWithBackdrop = (id, imageUrl, classNames) => {
    const el = createHTMLElement("div",id,classNames)
    el.style.background = `url('${imageUrl}')`
    el.style.backgroundSize = "cover"
    return el
}

export const createParagraph = (text,id,classNames) => {
    const el = createHTMLElement("p",id,classNames)
    el.textContent = text
    return el
}

const createHTMLElement = (tagName, id, classNames) => {
    const el = document.createElement(tagName)
    el.id = id ? id : el.id
    el.className = classNames ? classNames : ""
    return el
}