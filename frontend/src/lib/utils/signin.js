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
            }
            else {
                console.log(log.data)
                cookie.set("access_token_cookie", log.data.payload)
                setUser({...user, name: name, auth: true})
                localStorage.setItem("name", name)
                localStorage.setItem("auth", true)
                return 0
            }
        }
    }
    catch (error) {
        console.log(error)
    }
}