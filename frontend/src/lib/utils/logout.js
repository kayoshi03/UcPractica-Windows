import cookie from  "js-cookie"

export const logout = (user, setUser) => {
    setUser({...user, name: "", auth: false})
    localStorage.setItem("name", "")
    localStorage.setItem("auth", false)
    cookie.remove("access_token_cookie")
}