import test from "./../../assets/logo.png"
import "./style.scss"
import {Link} from "react-router-dom";
import {Tooltip} from "react-tooltip";
import ToolTip from "../ToolTip/ToolTip";
import {useDrag} from "react-dnd";
import { useEffect, useState } from "react";
import { API } from "../../lib/utils/API";
import Cookies from "js-cookie";


const Label = ({item, id}) => {
    const [error, setError] = useState(true)
    const [, drag] = useDrag({
        type: "div",
        item: {id}
    })
    const fetch = async () => {
        const icon = await API.get("http://31.129.105.229:8080/icon?application_id=2", {
            headers: {
                Authorization: `Bearer ${Cookies.get("access_token_cookie")}`
            }
        })
        setError(icon.data.error)
    }
    // ` ? test : `http://31.129.105.229:8080/icon?application_id=${id}`
    useEffect(() => {
        fetch()
    }, [])
    return(
        <>
            <Link ref={drag} target="_blank" to={item.url} className={`label my-anchor-element${item.id}`}>
                <img src={error ? test : `http://31.129.105.229:8080/icon?application_id=${id}`} alt=""/>
                <p>{item.name}</p>
            </Link>
            <Tooltip anchorSelect={`.my-anchor-element${item.id}`}>
                <ToolTip time={item.time} achiv={item.achivment}/>
            </Tooltip>
        </>

    )
};

export default Label;