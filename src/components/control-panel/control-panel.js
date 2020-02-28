import React from 'react';


const ControlPanel = ({ reset, play, pause }) => {
    return(
        <div className="control-panel">
            <button id="start_stop" onClick={play}>Запуск</button>
            <button onClick={pause}>Пауза</button>
            <button id="reset" onClick={reset}>Сброс</button>
        </div>
    )
}

export default ControlPanel;