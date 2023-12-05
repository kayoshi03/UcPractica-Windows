export const logout = (user, setUser) => {
    setUser({...user, name: "", auth: false})
    localStorage.setItem("name", "")
    localStorage.setItem("auth", false)
}