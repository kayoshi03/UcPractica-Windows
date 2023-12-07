import {API} from "./API";
import cookie from  "js-cookie"

export const signin = (user, setUser, name, pass) => {
    API.post("/login", {
        username: name,
        password: pass
    }).then(response => {
        cookie.set("access_token_cookie", response.data.payload)
        setUser({...user, name: name, auth: true})
        localStorage.setItem("name", name)
        localStorage.setItem("auth", true)
    }).catch(error => {
        console.log(error);
    });
}