import "./style.scss"

const Modal = ({close, userID}) => {



    const addLabel = async() => {

    }

    return(
        <div className="modal-window">
            <div className="modal">
                <div className="modal-header">
                    <p>Добавить ярлык</p>
                    <span onClick={() => close()}>&#10006;</span>
                </div>
                <div className="modal-body">

                </div>
            </div>
            <div onClick={() => close()} className="modal-background">
            </div>
        </div>
    )
}

export default Modal