import "./style.scss"
import {useNavigate} from "react-router";
import {useEffect} from "react";
import {signin} from "../../../lib/utils/signin";
import {is_auth} from "../../../lib/utils/API";
import {Link} from "react-router-dom";

const SignIn = ({user, sign}) => {
    const nav = useNavigate()
    const signIn = async (e) => {
        const data = new FormData(e.target)
        const name = data.get("name")
        const pass = data.get("pass")

        e.preventDefault()
        
        const res = await signin(user, sign, name, pass)
        if (res === 0) {
            nav("/")
        }
    }

    useEffect(() => {
        if (is_auth() && user.auth) {
            nav("/")
        }
    })
    return(
        <div className="form">
            <form onSubmit={signIn}>
                <h1>Авторизация</h1>
                <div className="login">
                    <p>Логин</p>
                    <input name="name"/>
                    <p>Пароль</p>
                    <input type="password" name="pass"/>
                </div>
                <button>Зайти</button>
                <Link to="/signup">Зарегистрироваться</Link>
            </form>
        </div>

    )
};

export default SignIn;