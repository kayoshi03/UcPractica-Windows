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
    const [showContext, setShowContext] = useState(false)
    const [show, setShow] = useState(false)
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

    useEffect(() => {

        fetchLabel()
    }, [])

    const handleDrop = (id) => {
        const newItems = [...items];
        const itemIndex = newItems.findIndex((item) => item.id === id)
        const item = newItems[itemIndex]
        newItems.splice(itemIndex, 1)
        newItems.unshift(item)
        setItems(newItems)
    }

    const closeContext = (set) => {
        set(false)
    }
    
    
    return(
        <>
            <DndProvider backend={HTML5Backend}>
                <Board closeContext={closeContext} setContext={setShow} context={show} update={fetchLabel} item={items} onDrop={handleDrop}>
                    {
                        items.map((item) => (
                            <Label update={fetchLabel} closeContext={closeContext} key={item.id} item={item} id={item.id}/>
                        ))
                    }
                </Board>
            </DndProvider>
        </>
    )
};

export default Home;