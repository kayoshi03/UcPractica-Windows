import { useState } from "react";
import "./style.scss"
import {useDrop} from "react-dnd";
import Modal from "../Modal/Modal";

const Board = ({onDrop, children, item, update, closeContext, context, setContext}) => {
    const [,drop] = useDrop({
        accept: "div",
        drop: (item) => onDrop(item.id)
    })
    const [showModal, setShowModal] = useState(false)
    const [position, setPosition] = useState({
        x: "",
        y: ""
    })


    const rightClick = (e) => {
        e.preventDefault()
        const x = e.pageX
        const y = e.pageY
        setPosition({
            x: x,
            y: y
        })
        setContext(true)
    }

    const closeModal = () => {
        setShowModal(!showModal)
    }

    const onClickNAV = () => {
        setShowModal(true)
    } 

    return(
        <div onClick={() => closeContext()} onContextMenu={rightClick} className="window" ref={drop}>
            {children}
            {
                context ? 
                <div className="rigth" style={{top: position.y + "px", left: position.x + "px"}}>
                    <p onClick={onClickNAV}>Добавить ярлык</p>
                </div>
                : 
                <></>
            }
            {
                showModal ?
                (
                    <Modal update={update} close={closeModal}/>
                )
                : 
                <></>
            }
            
        </div>
    )
};

export default Board;