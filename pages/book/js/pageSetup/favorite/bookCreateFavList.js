import * as ElementFactory from "./../../../../../shared/factories/elementFactory.js";
import * as ElementUpdate from "./../../../../../shared/factories/elementUpdate.js";
import * as UserBookLists from "../../../../../shared/bookLists/userBookLists.js"

let showForm = false

export const setupCreateFavoriteButton = () => {
    ElementUpdate.addOnclickHandler("show-create-fav-form",showFormHandler)
    ElementUpdate.addOnclickHandler("create-fav-list-btn",requestCreateList)
}

const showFormHandler = () => {
    showForm = !showForm
    if(showForm)
        showCreateForm()
    else
        hideCreateForm()
}

const showCreateForm = () => {
    const createCont = document.getElementById("create-fav-cont")
    createCont.style.width = "258px"
    const listSelector = document.getElementById("list-sel")
    listSelector.style.width = "0";
}

const hideCreateForm = () => {
    const cont = document.getElementById("create-fav-cont")
    cont.style.width = "0"
    const listSelector = document.getElementById("list-sel")
    listSelector.style.width = "258px";
}

const requestCreateList = async () => {
    const value = document.getElementById("create-fav-ipt").value
    if(value === "-1")
        return
    const response = await UserBookLists.createBookList(value)
    if(!response.status){
        alert(response.message)
        return
    }
    const option = ElementFactory.createOption(response.title,response.id)
    removeEmptyNotify()
    ElementUpdate.appendChildTo("list-sel",option)
    document.getElementById("create-fav-ipt").value = ""
    hideCreateForm()
}

const removeEmptyNotify = () => {
    const el = document.getElementById("list-sel")
    const value = el.value
    if(value === "-1")
        el.innerHTML = ""
}