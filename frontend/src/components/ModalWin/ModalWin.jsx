import React from 'react';
import "./style.scss"

const ModalWin = ({show}) => {
    return (
        show ?
            <div className="modalWin">
                <ul>
                    <li>asd</li>
                    <li>das</li>
                    <li>afs</li>
                    <li>zcx</li>
                </ul>
            </div>
                :
            <></>

    )
};

export default ModalWin;