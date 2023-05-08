import {fetchClient} from "../../utils.js";
import {login} from "../../shared/users/bookUsers.js";

export const initSignup = () => {

    const form = document.querySelector("form");
    form.onsubmit = handleSignUp;
};

async function handleSignUp(e) {
    
    e.preventDefault();

    const body = fetchInputValues();
    //console.log(body)
    const res = await fetchClient.post("/user-with-role", body)
    if (res){
        await login(body.username,body.password)
        await window.router.navigate("/");
        
    } 
//TO DO Errors
};

function fetchInputValues() {

    const usernameInput = document.getElementById("input-username").value;
    const emailInput = document.getElementById("input-email").value;
    const passwordInput = document.getElementById("input-password").value;

    return {
        username: usernameInput,
        email: emailInput,
        password: passwordInput,
    };
};
