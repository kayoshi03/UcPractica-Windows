export const logout = (user, setUser) => {
    setUser({...user, name: "", auth: false})
    localStorage.setItem("user", "")
    localStorage.setItem("auth", false)
}