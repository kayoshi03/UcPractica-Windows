import { API } from "../../lib/utils/API"

const Edit = ({close, update, id, url}) => {
    const updateName = async(e) => {
        try {
            const form = new FormData(e.target)
            e.preventDefault()
            const log = await API.put(`/application?application_id=${id}`, {
                name: form.get("name"),
                url: url
            })
            console.log(log)
            update()
        }
        catch(error) {
            console.log(error);
        }
        
    }
    return (
        <>
            <div className="modal-window">
            <div className="modal">
                <div className="modal-header">
                    <h1>Изменить ярлык</h1>
                    <span onClick={() => close()}>&#10006;</span>
                </div>
                <form onSubmit={updateName} className="modal-body">
                    <p>Название ярлыка</p>
                    <input type="text" name="name"/>
                    <button>Изменить</button>
                </form>
            </div>
            <div onClick={() => close()} className="modal-background">
            </div>
        </div>
        </>
    )
}

export default Edit