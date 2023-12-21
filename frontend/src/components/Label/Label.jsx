import astda from "./../../assets/logo.png"
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
        try{
<<<<<<< HEAD
           const icon = await API.get(`http://0.0.0.0:8080/icon?application_id=${id}`, {
=======
           const icon = await API.get(`${process.env.REACT_APP_API_KEY}/icon?application_id=${id}`, {
>>>>>>> main
            headers: {
                Authorization: `Bearer ${Cookies.get("access_token_cookie")}`
            }
        })
        if(icon.data.error) {
            setError(true) 
        }
        else if (id === undefined) {
            setError(true)
        }
        else {
            setError(false)
        }
        }
        catch(error) {
            setError(true)
        }
        
    }



    useEffect(() => {
        fetch()
        
    }, [])
    return(
        <>
            <Link ref={drag} target="_blank" to={item.url} className={`label my-anchor-element${item.id}`}>
<<<<<<< HEAD
                <img src={error ? astda : `http://0.0.0.0:8080/icon?application_id=${id}`} alt=""/>
=======
                <img src={error ? astda : `${process.env.REACT_APP_API_KEY}/icon?application_id=${id}`} alt=""/>
>>>>>>> main
                <p>{item.name}</p>
            </Link>
            <Tooltip anchorSelect={`.my-anchor-element${item.id}`}>
                <ToolTip time={item.time} achiv={item.achivment}/>
            </Tooltip>
        </>

    )
};

export default Label;