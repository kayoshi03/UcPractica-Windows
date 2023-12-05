import React from 'react';
import {useDrag} from "react-dnd";

const Item = ({ id, url }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "div",
        item: { id: id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));
    return (
        <div>
            <p ref={drag} >1dsa</p>
        </div>
    );
};

export default Item;