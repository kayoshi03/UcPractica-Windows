import { useState } from "react"
import { API } from "../../lib/utils/API"
import "./style.scss"
import cookie from "js-cookie"

const Modal = ({close, update}) => {
    const [label, setLabel] = useState({})

    const addIcon = async (id, filename) => {
        console.log(filename);
        await API.post(`/icon?app_id=${id}`,
            {
                file: filename,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    'Content-Type': 'multipart/form-data'
                }
            }
        )
    }
    const addLabel = async(e) => {
        try {
            e.preventDefault()
            const data = new FormData(e.target)
            const label = await API.post("/application", {
                    name: data.get("name"),
                    url: data.get("url"),
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            )
            if(!label.data.error) {
                console.log("ok");
                const file = data.get("icon")
                addIcon(label.data.payload.id, file)
                update()
                console.log(e.target);
                e.target.name.value = ""
                e.target.url.value = ""
                e.target.icon.value = ""
            }
        }
        catch(error) {

        }
    }

    return(
        <div className="modal-window">
            <div className="modal">
                <div className="modal-header">
                    <h1>Добавить ярлык</h1>
                    <span onClick={() => close()}>&#10006;</span>
                </div>
                <form onSubmit={addLabel} className="modal-body">
                    <p>Название ярлыка</p>
                    <input type="text" name="name"/>
                    <p>Ссылка на ярлык</p>
                    <input type="text" name="url"/>
                    <p>Добавить иконку</p>
                    <input type="file" name="icon"/>
                    <button>Добавить ярлык</button>
                </form>
            </div>
            <div onClick={() => close()} className="modal-background">
            </div>
        </div>
    )
}

export default Modal