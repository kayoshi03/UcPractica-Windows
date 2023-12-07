import "./style.scss"
import {useDrop} from "react-dnd";

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