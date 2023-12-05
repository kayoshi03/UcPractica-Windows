import React from 'react';
import "./style.scss"
import {logout} from "../../lib/utils/logout";

const ModalWin = ({show, user, change}) => {

    return (
        show ?
            <div className="modalWin">
                <ul>
                    <div>Пользователь:{user.name}</div>
                    <li onClick={() => logout(user, change)}>Выйти</li>
                </ul>

            </div>
                :
            <></>

    )
};

export default ModalWin;