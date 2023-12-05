import "./style.scss"
const SignIn = ({sign}) => {
    return(
        <div className="form">
            <form>
                <h1>Авторизаци</h1>

                <div className="login">
                    <p>Логин</p>
                    <input/>
                    <p>Пароль</p>
                    <input/>
                </div>
                <button>Зайти</button>
            </form>
        </div>

    )
};

export default SignIn;