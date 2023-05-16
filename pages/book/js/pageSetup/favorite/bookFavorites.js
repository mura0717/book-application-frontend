import * as ElementUpdate from "./../../../../../shared/factories/elementUpdate.js";
import * as BookLists from "../../../../../shared/bookLists/userBookLists.js";
import * as Books from "./../../userBooks/userBooks.js";
import {signedIn} from "../../../../../shared/users/bookUsers.js";
import {setupCreateFavoriteButton} from "./bookCreateFavList.js";

export const setupFav = async () => {
    if(signedIn()){
        ElementUpdate.updateDisplayMode("fav-cont","flex")
        await setupFavList()
        await setupFavButtons()
        await updateFavoriteStatus()
    }
}

const setupFavButtons = async () => {
    setupCreateFavoriteButton()
    await updateFavoriteStatus()
    const reference = Books.getBook().reference
    ElementUpdate.addOnclickHandler("fav-btn-add", async () => await addToFavoritesHandler(reference))
    ElementUpdate.addOnclickHandler("fav-btn-added", async () => await removeFromFavoritesHandler(reference))
}

const addToFavoritesHandler = async reference => {
    const selectedValue = document.getElementById("list-sel").value
    if(!selectedValue){
        alert("Du har ingen liste at tilføje til. Vær venlig at oprette en.")
        return
    }
    const result = await BookLists.addToFavoriteList(reference,selectedValue)
    if(!result.status)
        alert(result.message)
    else
        showAddedButton(true)
}

const removeFromFavoritesHandler = async reference => {
    const inputValue = document.getElementById("list-sel").value
    const result = await BookLists.removeFromFavoriteList(reference,inputValue)
    showAddedButton(!result)
}

const setupFavList = async () => {
    ElementUpdate.addOnChangeHandler("list-sel",async () => updateFavoriteStatus())
    const bookLists = await BookLists.getListTitles()
    if(bookLists.length > 0) {
        ElementUpdate.updateInnerHtml("list-sel","")
        await populateFavList(bookLists)
    }
}

const populateFavList = async bookLists => {
    for (let i = 0; i < bookLists.length; i++) {
        const bookList = bookLists.at(i)
        const opt = document.createElement("option")
        opt.textContent = bookList.title
        opt.value = bookList.id
        ElementUpdate.appendChildTo("list-sel",opt)
    }
}

const updateFavoriteStatus = async () => {
    const book = Books.getBook()
    const listId = document.getElementById("list-sel").value
    if(listId !== "-1")
        showAddedButton(await BookLists.alreadyAdded(book.reference,listId))
}

const showAddedButton = show => {
    if(show){
        ElementUpdate.showElement("fav-btn-add",false)
        ElementUpdate.showElement("fav-btn-added",true)
    }
    else{
        ElementUpdate.showElement("fav-btn-add",true)
        ElementUpdate.showElement("fav-btn-added",false)
    }
}