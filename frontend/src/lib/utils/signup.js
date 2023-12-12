import {API} from "./API";

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
        if (res.data.error) {
            alert(res.data.message)
        }
    }
    catch (error) {
        if (error.code === "ERR_NETWORK") {
            alert("Не удалось подключиться к сервису, повторите попытку позже!")
        }
    }
}