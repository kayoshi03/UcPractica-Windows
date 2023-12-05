import {DndProvider} from "react-dnd"
import {HTML5Backend} from "react-dnd-html5-backend"
import Board from "../../../components/Board/Board";
import DragDrop from "../../../components/DragDrop";
import {useState} from "react";
import Label from "../../../components/Label/Label";

const itemList = [
    {id:1, name: "dsa"},
    {id:2, name: "dsads"},
    {id:3, name: "ddssa"},
]

const Home = () => {
    const [items, setItems] = useState([
        {id:1, name: "dsa"},
        {id:2, name: "dsads"},
        {id:3, name: "ddssa"}
    ])
    const handleDrop = (id) => {
        console.log("ok")
        const newItems = [...items];
        const itemIndex = newItems.findIndex((item) => item.id === id)
        const item = newItems[itemIndex]
        newItems.splice(itemIndex, 1)
        newItems.unshift(item)
        setItems(newItems)
        console.log(newItems)
    }

    return(
        <>
            <DndProvider backend={HTML5Backend}>
                <Board onDrop={handleDrop}>
                    {
                        items.map((item) => (
                            <Label key={item.id} item={item} id={item.id}/>
                        ))
                    }
                </Board>
            </DndProvider>
        </>
    )
};

export default Home;