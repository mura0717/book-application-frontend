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

export const clearCredentials = () => UserImp.clear()

export const getUsername = () => UserImp.getUsername()

export const signedIn = () => UserImp.signedIn()

export const signUp = async credentials => {
    const response = await UserImp.signUp(credentials)
    if(!response.message){
        return {
            status : true,
            credentials : response
        }
    }
    else{
        return {
            status : false,
            message : response.message
        }
    }
}