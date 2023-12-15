import {DndProvider} from "react-dnd"
import {HTML5Backend} from "react-dnd-html5-backend"
import Board from "../../../components/Board/Board";
import {useEffect, useState} from "react";
import Label from "../../../components/Label/Label";
import {API} from "../../../lib/utils/API"
import cookie from "js-cookie";


const Home = () => {
    const [items, setItems] = useState([])
    const fetchLabel = async () => {
        try {
            const data = await API.get('', {
                headers: {
                    Authorization: `Bearer ${cookie.get("access_token_cookie") === undefined ? localStorage.getItem("token") : cookie.get("access_token_cookie")}`
                }
            })
            setItems(data.data.payload)
        }
        catch(error) {

        }
    }

    useEffect(() => {
        fetchLabel()
    }, [])

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