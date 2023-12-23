import astda from "./../../assets/logo.png"
import "./style.scss"
import {Link} from "react-router-dom";
import {Tooltip} from "react-tooltip";
import ToolTip from "../ToolTip/ToolTip";
import {useDrag} from "react-dnd";
import { useEffect, useState } from "react";
import { API } from "../../lib/utils/API";
import Cookies from "js-cookie";
import axios from "axios";
import Modal from "../Modal/Modal";
import Edit from "../Edit/Edit";


const Label = ({item, id, update}) => {
    const [error, setError] = useState(true)
    const [position, setPosition] = useState({
        x: "",
        y: ""
    })
    const [showModal, setShowModal] = useState(false)
    const [show, setShow] = useState(false)
    const [hour, setHour] = useState()
    const [achiv, setAchiv] = useState()
    const [, drag] = useDrag({
        type: "div",
        item: {id}
    })

    const getAchivment = async () => {
        try{
            const fetch = await API.get(`/achievements?url=${item.url}/get-achivements.php`, {
            })
            setHour(fetch.data.hours_spent)
            setAchiv(fetch.data.achievements)
        }
        catch(error) {
            console.log(error);
        }
        
    }
    
    const fetch = async () => {
        try{
           const icon = await API.get(`${process.env.REACT_APP_API_KEY}/icon?application_id=${id}`, {
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
    const rightClick = (e) => {
        e.preventDefault()
        const x = e.pageX
        const y = e.pageY
        setPosition({
            x: x,
            y: y
        })
        setShow(true)
    }

    const closeContext = (e) => {
            setShow(false)
    }
    const clicdf = () => {
        setShowModal(true)
        setShow(false)

    }
    const closeModal = () => {
        setShowModal(!showModal)
    }
    const editName = () => {

    }

    const deleteLabel = async() => {
        try {
            const log = await API.delete(`/application?application_id=${item.id}`)
            console.log(log)
            update()
        }
        catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetch()
        getAchivment()
    }, [])
    return(
        <>
            <Link onClick={closeContext}  onContextMenu={rightClick} ref={drag} target="_blank" to={item.url} className={`label my-anchor-element${item.id}`}>
                <img src={error ? astda : `${process.env.REACT_APP_API_KEY}/icon?application_id=${id}`} alt=""/>
                <p>{item.name}</p>
            </Link>
            {
                show ? 
                <div onBlur={closeContext}  className="oven" style={{top: position.y + "px", left: position.x + "px"}}>
                    <p onClick={clicdf}>Переименовать</p>
                    <p onClick={deleteLabel}>Удалить</p>
                </div>:
                <></>
            }
            {
                showModal ?
                (
                    <Edit url={item.url} id={item.id} update={update} close={closeModal}/>
                )
                : 
                <></>
            }
            <Tooltip anchorSelect={`.my-anchor-element${item.id}`}>
                <ToolTip time={hour} achiv={achiv}/>
            </Tooltip>
        </>

    )
};

export default Label;