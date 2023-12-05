import test from "./../../assets/logo.png"
import "./style.scss"
import {Link} from "react-router-dom";
import {Tooltip} from "react-tooltip";
import ToolTip from "../ToolTip/ToolTip";
import {useDrag} from "react-dnd";


const Label = ({item, id}) => {
    const [, drag] = useDrag({
        type: "div",
        item: {id}
    })
    return(
        <>
            <Link ref={drag} target="_blank" to={item.link} className={`label my-anchor-element${item.id}`}>
                <img src={test} alt=""/>
                <p>{item.name}</p>
            </Link>
            <Tooltip anchorSelect={`.my-anchor-element${item.id}`}>
                <ToolTip time={item.time} achiv={item.achivment}/>
            </Tooltip>
        </>

    )
};

export default Label;