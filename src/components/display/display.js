import React from 'react';

const Display = ({ getTime, timerType }) => {

    const timerLabel = timerType === 'session' ? 'Сессия' : 'Перерыв';

    return(
        <div className="display">
            <h4 className="display__title" id="timer-label">{timerLabel}</h4>
            <div className="number" id="time-left">{getTime()}</div>
        </div>
    )
}

export default Display;