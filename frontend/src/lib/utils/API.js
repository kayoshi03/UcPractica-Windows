import axios from "axios";
import cookie from  "js-cookie"

const token = cookie.get("access_token_cookie")

export const API = axios.create({
    baseURL: "http://31.129.105.229:8080",
    headers: {
        Authorization: `Bearer${token}`,

    }
})