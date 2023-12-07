import "./style.scss"
import {useNavigate} from "react-router";
import {useEffect} from "react";
import {signin} from "../../../lib/utils/signin";
import {is_auth} from "../../../lib/utils/API";

const SignIn = ({user, sign}) => {
    const nav = useNavigate()
    const signIn = (e) => {
        const data = new FormData(e.target)
        const name = data.get("name")
        const pass = data.get("pass")
        e.preventDefault()
        signin(user, sign, name, pass)
        nav("/")
    }

    useEffect(() => {
        if (is_auth() && user.auth) {
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
                    <input name="pass"/>
                </div>
                <button>Зайти</button>
            </form>
        </div>

    )
};

export default SignIn;