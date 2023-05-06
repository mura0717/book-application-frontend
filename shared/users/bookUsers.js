import {fetchClient} from "../../utils.js";
import {clear, get, update} from "./localStorageCredentials.js";

const loginEvent = new Event("login");
const logoutEvent = new Event("logout");

export const login = async (username, password) => {
    const res = await fetchClient.post("/auth/login", {
        username : username, password : password
    });
    if(res === undefined)
        return false
    update(res.user,res.token)
    window.dispatchEvent(loginEvent)
    return true
}

export const logout = () => {
    clear()
    window.dispatchEvent(logoutEvent)
    
}

export const updateCredentials = (username, token) => {
    return update(username,token)
}

export const getCredentials = () => get()

export const signedIn = () => get() !== undefined