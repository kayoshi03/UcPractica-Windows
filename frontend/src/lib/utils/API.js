import axios from "axios";
import cookie from  "js-cookie"

export const is_auth = () => {
    return !(cookie.get("access_token_cookie") === undefined
        || cookie.get("access_token_cookie") === null
        || cookie.get("access_token_cookie") === "");
}

export const API = axios.create({
<<<<<<< HEAD
    baseURL: "http://0.0.0.0:8080",
=======
    baseURL: process.env.REACT_APP_API_KEY,
>>>>>>> main
    headers: {
        Authorization: `Bearer ${cookie.get("access_token_cookie")}`,
        "Access-Control-Allow-Origin" : "*"
    }
})