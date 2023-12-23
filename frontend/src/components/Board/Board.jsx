import { useRef, useState } from "react";
import "./style.scss"
import {useDrop} from "react-dnd";
import Modal from "../Modal/Modal";
import ContextMenu from "../ContextMenu/ContextMenu";

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
        console.log(e.target.parentElement);
        if(e.target.parentElement.classList[0] === "label") {
            return 0
        }
        else {
           const x = e.pageX
            const y = e.pageY
            setPosition({
                x: x,
                y: y
            })
            setContext(true) 
        }
        
    }

    const closeModal = () => {
        setShowModal(!showModal)
    }

    const onClickNAV = () => {
        setShowModal(true)
    } 

    return(
        <div onClick={() => closeContext(setContext)} onContextMenu={rightClick} className="window" ref={drop}>
            {children}
            
            <ContextMenu show={context}>
                <div onClick={onClickNAV} className="rigth" style={{top: position.y + "px", left: position.x + "px"}}>
                    <p >Добавить ярлык</p>
                </div>
            </ContextMenu>
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