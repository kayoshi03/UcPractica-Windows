import React from 'react';

const ToolTip = ({time, achiv}) => {
    return(
        <>
            <h1>Статистика</h1>
            <p>Время: {time === undefined ? 0 : time} ч.</p>
            <p>Достижения: {achiv === undefined ? 0 : achiv.length} / 10</p>
        </>
    )
};

export default ToolTip;