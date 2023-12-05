import React from 'react';

const ToolTip = ({time, achiv}) => {
    return(
        <>
            <h1>Статистика</h1>
            <p>Время:{time}</p>
            <p>Достижения: {achiv}</p>
        </>
    )
};

export default ToolTip;