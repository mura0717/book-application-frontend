import {handleHttpErrors} from "../../utils.js";
import {baseURL} from "../../models/apiInfo.js";

export const update = (username, token) => {
    if(localStorage){
        localStorage.setItem("username",username)
        localStorage.setItem("token",token)
    }
    else
        return false
    return true
}

export const getUsername = () => localStorage.getItem("username")

export const signedIn = () => localStorage.getItem("token") !== null

export const clear = () => {
    localStorage.removeItem("username")
    localStorage.removeItem("token")
}

export const signUp = async credentials => {
    try {
        return await fetch(`${baseURL}/user-with-role`, {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: {
                "Content-Type": "application/json",
            },
        }).then(handleHttpErrors);
    } catch (err) {
        return err
    }
}