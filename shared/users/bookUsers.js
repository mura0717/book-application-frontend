import {fetchClient} from "../../utils.js";
import * as UserImp from "./localStorageCredentials.js";

const loginEvent = new Event("login");
const logoutEvent = new Event("logout");

export const login = async (username, password) => {
    const res = await fetchClient.post("/auth/login", {
        username : username, password : password
    });
    if(res === undefined)
        return false
    UserImp.update(res.username,res.token)
    window.dispatchEvent(loginEvent)
    return true
}

export const logout = () => {
    UserImp.clear()
    window.dispatchEvent(logoutEvent)
    
}

export const updateCredentials = (username, token) => {
    return UserImp.update(username,token)
}

export const getUsername = () => UserImp.getUsername()

export const signedIn = () => UserImp.signedIn()

export const isActiveUser = username => UserImp.getUsername() === username