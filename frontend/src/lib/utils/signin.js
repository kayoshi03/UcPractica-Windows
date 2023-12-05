export const signin = (user, setUser, name) => {
    setUser({...user, name:name, auth: true})
    localStorage.setItem("name", name)
    localStorage.setItem("auth", true)
}