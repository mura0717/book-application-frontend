import * as Factory from "./../../../../shared/factories/elementFactory.js";
import * as UserBookLists from "../../../../shared/bookLists/userBookLists.js"

let showForm = false

export const setupCreateFavoriteButton = () => {
    Factory.addOnclickHandler("show-create-fav-form",showFormHandler)
    Factory.addOnclickHandler("create-fav-list-btn",requestCreateList)
}

const showFormHandler = () => {
    showForm = !showForm
    if(showForm)
        showCreateForm()
    else
        hideCreateForm()
}

const showCreateForm = () => {
    const cont = document.getElementById("create-fav-cont")
    cont.style.width = "304px"
}

const hideCreateForm = () => {
    const cont = document.getElementById("create-fav-cont")
    cont.style.width = "0"
}

const requestCreateList = async () => {
    const name = document.getElementById("create-fav-ipt").value
    const bookList = await UserBookLists.createBookList(name)
    if(bookList == null)
        return
    const option = Factory.createOption(bookList.title,bookList.id)
    removeEmptyNotify()
    Factory.appendChildTo("list-sel",option)
    hideCreateForm()
}

const removeEmptyNotify = () => {
    const el = document.getElementById("list-sel")
    const value = el.value
    if(value === "-1")
        el.innerHTML = ""
}