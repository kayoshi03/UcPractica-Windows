import {API} from "./API";
import cookie from  "js-cookie"

export const  signin = async (user, setUser, name, pass) => {

    try {
        if(name === "" || pass === "") {
            alert("Не все поля заполнены")
        }
        else  {
            const log = await API.post("/login", {
                username: name,
                password: pass
            })

            if (log.data.error) {
                alert(log.data.message)
                localStorage.removeItem("name")
                localStorage.removeItem("auth")
            }
            else {
                console.log(log.data)
                cookie.set("access_token_cookie", log.data.payload, { httpOnly: false })
                setUser({...user, name: name, auth: true})
                localStorage.setItem("name", name)
                localStorage.setItem("auth", true)
                localStorage.setItem("token", log.data.payload)
                return 0
            }
        }
    }
    catch (error) {
        if (error.code === "ERR_NETWORK") {
            alert("Не удалось подключиться к сервису, повторите попытку позже!")
        }

    }
}