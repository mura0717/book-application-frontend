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

export const getInputValue = (id) => {
    const el = document.getElementById(id)
    return el.value
}

export const addOnChangeHandler = (id, handler) => {
    const el = document.getElementById(id)
    el.onchange = handler
}

export const addScrollHandler = (id,handler) => {
    const el = document.getElementById(id)
    el.onscroll = () => handler(el)
}

export const addOnclickHandler = (id, handler) => {
    const el = document.getElementById(id)
    el.onclick = handler
}

export const showElement = (id, show) => {
    const el = document.getElementById(id)
    el.style.display = show ? "block" : "none"
}

export const createOption = (text,value) => {
    const el = document.createElement("option")
    el.textContent = text
    el.value = value
    return el
}

export const createButton = (id, classNames, text, clickHandler) => {
    const btn = createHTMLElement("button",id,classNames)
    btn.textContent = text
    if(clickHandler)
        btn.onclick = clickHandler
    return btn
}

export const updateDisplayMode = (id, mode) => {
    const el = document.getElementById(id)
    el.style.display = mode
}

export const createDiv = (id,classNames = "",  text = "") => {
    const el = createHTMLElement("div", id, classNames)
    if(text !== undefined)
        el.textContent = text
    return el
}

export const createTextArea = (id = "",classNames = "", changeHandler) => {
    const el = createHTMLElement("textArea",id,classNames)
    el.onchange = changeHandler
    return el
}

export const createDivWithBackdrop = (id, imageUrl, classNames) => {
    const el = createHTMLElement("div",id,classNames)
    if(imageUrl !== null){
        el.style.background = `url('${imageUrl}')`
        el.style.backgroundSize = "cover"
    }
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