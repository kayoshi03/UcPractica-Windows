export const signin = (user, setUser, name) => {
    setUser({...user, name:name, auth: true})
    localStorage.setItem("user", name)
    localStorage.setItem("auth", true)
}