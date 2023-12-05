import test from "./../../assets/logo.png"
import "./style.scss"
import {Link} from "react-router-dom";
import {Tooltip} from "react-tooltip";
import ToolTip from "../ToolTip/ToolTip";


const Label = () => {
    return(
        <>
            <Link to="/" className="label my-anchor-element">
                <img src={test} alt=""/>
                <p>Название приложения</p>
            </Link>
            <Tooltip anchorSelect=".my-anchor-element">
                <ToolTip/>
            </Tooltip>
        </>

    )
};

export default Label;