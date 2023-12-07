import axios from "axios";
import cookie from  "js-cookie"

export const API = axios.create({
    baseURL: "http://31.129.105.229:8080",
    headers: {
        Authorization: `Bearer ${cookie.get("access_token_cookie")}`,
    }
})