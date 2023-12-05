import Label from "../Label/Label";
import "./style.scss"
import {useDrop} from "react-dnd";

// const app = [
//     {
//         id: 1,
//         name: "YouTube",
//         link: "https://youtube.com",
//         img: "",
//         time: 60,
//         achivment: 60
//     },
//     {
//         id: 2,
//         name: "vk",
//         link: "https://vk.com",
//         img: "",
//         time: 213,
//         achivment: 12
//     }
// ]
const Board = ({onDrop, children}) => {
    const [,drop] = useDrop({
        accept: "div",
        drop: (item) => onDrop(item.id)
    })

    return(
        <div className="window" ref={drop}>
            {children}

        </div>
    )
};

export default Board;