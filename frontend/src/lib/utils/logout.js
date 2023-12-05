export const logout = (user, setUser) => {

    setUser({
        ...user,
        name: "",
        auth: false
    })
}