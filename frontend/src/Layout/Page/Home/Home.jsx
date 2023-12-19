import {DndProvider} from "react-dnd"
import {HTML5Backend} from "react-dnd-html5-backend"
import Board from "../../../components/Board/Board";
import {useEffect, useState} from "react";
import Label from "../../../components/Label/Label";
import {API} from "../../../lib/utils/API"
import cookie from "js-cookie";
import { useNavigate } from "react-router";


const Home = () => {
    const nav = useNavigate()
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
            if(error.response.status === 401) {
                localStorage.removeItem("token")
                cookie.remove("access_token_cookie")
                nav("/signin")
            }
        }
    }
    console.log(items);

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
                <Board update={fetchLabel} item={items} onDrop={handleDrop}>
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