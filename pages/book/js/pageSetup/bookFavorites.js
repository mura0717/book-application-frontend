import * as Factory from "./../../../../shared/factories/elementFactory.js";
import * as BookLists from "../../../../shared/bookLists/userBookLists.js";
import * as Books from "./../userBooks/userBooks.js";
import {signedIn} from "../../../../shared/users/bookUsers.js";
import {setupCreateFavoriteButton} from "./bookCreateFavList.js";

export const setupFav = async reference => {
    if(signedIn()){
        Factory.updateDisplayMode("fav-cont","flex")
        setupFavIcons(reference)
        setupCreateFavoriteButton()
        updateFavoriteStatus()
        await setupFavList()
    }
}

const setupFavIcons = reference => {
    Factory.addOnclickHandler("fav-btn-add",async () => await addToFavoritesHandler(reference))
    Factory.addOnclickHandler("fav-btn-added",async () => await removeFromFavoritesHandler(reference))
    
}

const addToFavoritesHandler = async reference => {
    const result = await BookLists.addToFavoriteList(reference,Factory.selectValue("list-sel"))
    if(!result)
        alert("Boogie Preben slår til igen! Tilkald politiet eller fyr mønter efter ham. Hvis i vælger at fyre mønter" +
            "efter ham, kan det varmt anbefales at varme mønterne op med en lighter inde i tyrer dem i hovedet på ham.")
    showAddToFavorites(result)
}

const removeFromFavoritesHandler = async reference => {
    const result = await BookLists.removeFromFavoriteList(reference,Factory.selectValue("list-sel"))
    showAddToFavorites(!result)
}

const setupFavList = async () => {
    Factory.addOnChangeHandler("list-sel",async () => updateFavoriteStatus())
    await updateFavListValues()
}

const updateFavListValues = async () => {
    const bookLists = await BookLists.getBookLists()
    for (let i = 0; i < bookLists.length; i++) {
        const bookList = bookLists.at(i)
        const opt = document.createElement("option")
        opt.textContent = bookList.title
        opt.value = bookList.id
        Factory.appendChildTo("list-sel",opt)
    }
}

const updateFavoriteStatus = () => {
    const book = Books.getBook()
    const bookListReference = Factory.selectValue("list-sel")
    showAddToFavorites(BookLists.alreadyAdded(book.reference,bookListReference))
}

const showAddToFavorites = show => {
    if(show){
        Factory.showElement("fav-btn-add",false)
        Factory.showElement("fav-btn-added",true)
    }
    else{
        Factory.showElement("fav-btn-added",false)
        Factory.showElement("fav-btn-add",true)
    }
}