import {useState} from 'react';
import moment from "moment"
import "./style.scss"

const Time = () => {
    const [data, setData] = useState(moment().format("HH:mm"))
    const update = () => {
        setData(moment().format("HH:mm"))
    }
    setInterval(update, 1000)


    return(
        <div className="Clock">
            {
                data
            }
        </div>
    )
};

export default Time;