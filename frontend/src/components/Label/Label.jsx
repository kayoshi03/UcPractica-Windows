import test from "./../../assets/logo.png"
import "./style.scss"
import {Link} from "react-router-dom";

const Label = () => {
    return(
        <Link to="/" className="label">
            <img src={test} alt=""/>
            <p>Название приложения</p>
        </Link>
    )
};

export default Label;