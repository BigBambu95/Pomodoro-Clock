import React from 'react';

const SettingsPanel = ({ sessionLength, breakLength, setSessionLength, setBreakLength }) => {
    return(
        <div className="settings-panel">
            <div>
                <h4 id="break-label">Время перерыва</h4>
                <button id="break-decrement" onClick={() => setBreakLength(-1)}>&minus;</button>
                <span className="number" id="break-length">{breakLength}</span>
                <button id="break-increment" onClick={() => setBreakLength(1)}>+</button>
            </div>
            <div>
                <h4 id="session-label">Время работы</h4>
                <button id="session-decrement" onClick={() => setSessionLength(-1)}>&minus;</button>
                <span className="number" id="session-length">{sessionLength}</span>
                <button id="session-increment" onClick={() => setSessionLength(1)}>+</button>
            </div>
        </div>
    )
}

export default SettingsPanel;