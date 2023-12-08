import {API} from "./API";
import cookie from "js-cookie";

export const signup = async (name, pass, user, setUser) => {
    try {
        const res = await API.post("/register", {
            username: name,
            password: pass
        })

        console.log(res.data)

        if(!res.data.error) {
            alert("Пользователь создан")
            return 0
        }
    }
    catch (error) {
        console.log(error)
    }
}