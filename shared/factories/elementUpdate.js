export const updateTextContent = (id, content) => document.getElementById(id).textContent = content

export const updateInnerHtml = (id, content = "") => document.getElementById(id).innerHTML = DOMPurify.sanitize(content)

export const updateDisplayMode = (id, mode) => {
    const el = document.getElementById(id)
    el.style.display = mode
}

export const appendChildTo = (id,childElement) => {
    let el = document.getElementById(id)
    el.appendChild(childElement)
}

export const addOnChangeHandler = (id, handler) => {
    const el = document.getElementById(id)
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

export const addScrollHandler = (id,handler) => {
    const el = document.getElementById(id)
    el.onscroll = () => handler(el)
}