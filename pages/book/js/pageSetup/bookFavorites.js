import * as Factory from "./../../../../shared/factories/elementFactory.js";
import * as BookLists from "../../../../shared/bookLists/userBookLists.js";
import * as Books from "./../userBooks/userBooks.js";
import {signedIn} from "../../../../shared/users/bookUsers.js";
import {setupCreateFavoriteButton} from "./bookCreateFavList.js";

export const setupFav = async () => {
    if(signedIn()){
        Factory.updateDisplayMode("fav-cont","flex")
        await setupFavButtons()
        setupCreateFavoriteButton()
        await updateFavoriteStatus()
        await setupFavList()
    }
}

const setupFavButtons = async () => {
    const reference = Books.getBook().reference
    const listReference = Factory.selectValue("list-sel")
    if (await BookLists.alreadyAdded(reference, listReference))
        showAddedButton(true)
    Factory.addOnclickHandler("fav-btn-add", async () => await addToFavoritesHandler(reference))
    Factory.addOnclickHandler("fav-btn-added", async () => await removeFromFavoritesHandler(reference))
}

const addToFavoritesHandler = async reference => {
    const selectedValue = Factory.selectValue("list-sel")
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
    const result = await BookLists.removeFromFavoriteList(reference,Factory.selectValue("list-sel"))
    showAddedButton(!result)
}

const setupFavList = async () => {
    Factory.addOnChangeHandler("list-sel",async () => updateFavoriteStatus())
    const bookLists = await BookLists.getListTitles()
    if(bookLists.length > 0)
        await populateFavList(bookLists)
}

const populateFavList = async bookLists => {
    for (let i = 0; i < bookLists.length; i++) {
        const bookList = bookLists.at(i)
        const opt = document.createElement("option")
        opt.textContent = bookList.title
        opt.value = bookList.id
        Factory.appendChildTo("list-sel",opt)
    }
}

const updateFavoriteStatus = async () => {
    const book = Books.getBook()
    const bookListReference = Factory.selectValue("list-sel")
    showAddedButton(await BookLists.alreadyAdded(book.reference,bookListReference))
}

const showAddedButton = show => {
    if(show){
        Factory.showElement("fav-btn-add",false)
        Factory.showElement("fav-btn-added",true)
    }
    else{
        Factory.showElement("fav-btn-add",true)
        Factory.showElement("fav-btn-added",false)
    }
}