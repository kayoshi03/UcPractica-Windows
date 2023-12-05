import Label from "../Label/Label";
import "./style.scss"

const app = [
    {
        id: 1,
        name: "YouTube",
        link: "https://youtube.com",
        img: "",
        time: 60,
        achivment: 60
    },
    {
        id: 2,
        name: "vk",
        link: "https://vk.com",
        img: "",
        time: 213,
        achivment: 12
    }
]
const Board = () => {
    return(
        <div className="window">
            {app.map((item) => (
                <Label key={item.id} item={item}/>
            ))}

        </div>
    )
};

export default Board;