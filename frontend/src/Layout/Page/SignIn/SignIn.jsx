import "./style.scss"
import {useNavigate} from "react-router";
import {useEffect} from "react";
const SignIn = ({user, sign}) => {
    const nav = useNavigate()
    const signIn = (e) => {
        const data = new FormData(e.target)
        e.preventDefault()
        sign({...user, name:data.get("name"), auth: true})
        localStorage.setItem("user", data.get("name"))
        localStorage.setItem("auth", true)
        nav("/")
    }
    useEffect(() => {
        if (user.auth) {
            nav("/")
        }
    })

    return(
        <div className="form">
            <form onSubmit={signIn}>
                <h1>Авторизаци</h1>

                <div className="login">
                    <p>Логин</p>
                    <input name="name"/>
                    <p>Пароль</p>
                    <input/>
                </div>
                <button>Зайти</button>
            </form>
        </div>

    )
};

export default SignIn;