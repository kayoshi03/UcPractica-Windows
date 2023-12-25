import {useNavigate} from "react-router";
import {Link} from "react-router-dom";
import {signup} from "../../../lib/utils/signup";

const SignUp = ({user, sign}) => {
    const nav = useNavigate()

    const signUp = async (e) => {
        e.preventDefault()
        const data = new FormData(e.target)
        const name = data.get("name")
        const password = data.get("pass")

        const res = await signup(name, password, user, sign)
        if(res === 0) {
            nav("/signin")
        }
    }

    return(
        <div className="form">
            <form onSubmit={signUp}>
                <h1>Регистрация</h1>
                <div className="login">
                    <p>Логин</p>
                    <input name="name"/>
                    <p>Пароль</p>
                    <input type="password" name="pass"/>
                </div>
                <button>Зарегистрироваться</button>
                <Link to="/signin">Авторизоваться</Link>
            </form>
        </div>
    )
};

export default SignUp;