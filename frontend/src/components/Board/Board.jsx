import { useState } from "react";
import "./style.scss"
import {useDrop} from "react-dnd";

const Board = ({onDrop, children}) => {
    const [,drop] = useDrop({
        accept: "div",
        drop: (item) => onDrop(item.id)
    })
    const [showModal, setShowModal] = useState(false)
    const [show, setShow] = useState(false)
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
        setShow(true)
    }

    const closeContext = () => {
        setShow(false)
    }

    const closeModal = () => {
        setShowModal(!showModal)
    }

    const onClickNAV = () => {
        setShowModal(true)
    } 

    return(
        <div onClick={closeContext} onContextMenu={rightClick} className="window" ref={drop}>
            {children}
            {
                show ? 
                <div className="rigth" style={{top: position.y + "px", left: position.x + "px"}}>
                    <p onClick={onClickNAV}>Добавить ярлык</p>
                </div>
                : 
                <></>
            }
            
            {
                showModal ?
                <div onClick={closeModal}  className="modal">
                    Gey
                </div>
                : 
                <></>
            }
            
        </div>
    )
};

export default Board;