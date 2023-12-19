import React from 'react';

const ToolTip = ({time, achiv}) => {
    return(
        <>
            <h1>Статистика</h1>
            <p>Время: {time} ч.</p>
            <p>Достижения: {achiv} / {achiv}</p>
        </>
    )
};

export default ToolTip;