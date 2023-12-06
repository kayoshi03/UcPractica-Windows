import {API} from "./API";

export const signin = (user, setUser, name, pass) => {
    const log = API.post("/login", {
        username: name,
        password: pass
    })
    console.log(log.data)
    setUser({...user, name:name, auth: true})
    localStorage.setItem("name", name)
    localStorage.setItem("auth", true)
}