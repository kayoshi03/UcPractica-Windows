import {useState} from "react"
import { useDrop } from "react-dnd";
import Item from "./Item";

const PictureList = [
    {
        id: 1,
        url:
            "https://yt3.ggpht.com/ytc/AAUvwnjOQiXUsXYMs8lwrd4litEEqXry1-atqJavJJ09=s900-c-k-c0x00ffffff-no-rj",
    },
    {
        id: 2,
        url:
            "https://media-exp1.licdn.com/dms/image/C4D03AQExheo0sff_yQ/profile-displayphoto-shrink_200_200/0/1590072898568?e=1630540800&v=beta&t=_W-gWZewSBYQ-UAjpGvR8h_8Vvo202IHQQissbK2aKc",
    },
    {
        id: 3,
        url:
            "https://yt3.ggpht.com/pe57RF1GZibOWeZ9GwRWbjnLDCK2EEAeQ3u4iMAFNeaz-PN9uSsg1p2p32TZUedNnrUhKfoOuMM=s900-c-k-c0x00ffffff-no-rj",
    },
];

function DragDrop() {
    const [board, setBoard] = useState([]);

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "div",
        drop: (item) => addImageToBoard(item.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    const addImageToBoard = (id) => {
        const pictureList = PictureList.filter((picture) => id === picture.id);
        setBoard((board) => [...board, pictureList[0]]);
    };
    return (
        <>
            <div className="Pictures">
                {PictureList.map((picture) => {
                    return <Item url={picture.url} id={picture.id} />;
                })}
            </div>
            <div className="Board" ref={drop}>
                {board.map((picture) => {
                    return <Item url={picture.url} id={picture.id} />;
                })}
            </div>
        </>
    );
}

export default DragDrop;