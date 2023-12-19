import React from 'react';

const ToolTip = ({time, achiv, deleteLabel}) => {
    return(
        <>
            <h1>Статистика</h1>
            <p>Время: {time} ч.</p>
            <p>Достижения: {achiv} / {achiv}</p>
            <button onClick={() => deleteLabel()}>Удалить</button>
        </>
    )
};

export default ToolTip;