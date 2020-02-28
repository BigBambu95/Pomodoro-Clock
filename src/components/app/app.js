import React from 'react';
import SettingsPanel from '../settings-panel';
import Display from '../display';
import ControlPanel from '../control-panel';

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            breakLength: 5,
            sessionLength: 25,
            timer: 1500,
            timerType: 'session',
            timerState: 'stopped',
            timerId: ''
        }


        this.reset = this.reset.bind(this);
        this.play = this.play.bind(this);
        this.pause = this.pause.bind(this);
        this.getTime = this.getTime.bind(this);
        this.decrementTimer = this.decrementTimer.bind(this);
        this.switch = this.switch.bind(this);
        this.setSessionLength = this.setSessionLength.bind(this);
        this.setBreakLength = this.setBreakLength.bind(this);
    }


    componentDidUpdate(prevProps, prevState) {
        if(prevState.timer === 0) {
            this.switch();
        }

        if(prevState.sessionLength !== this.state.sessionLength) {
            this.setState({
                timer: this.state.sessionLength * 60
            });
        }

    }

    setBreakLength(value) {
        const { timerState, breakLength } = this.state;

        if(timerState === 'running') return false;

        if(breakLength + value < 1 || breakLength + value > 60) return false;

        return this.setState((state) => {
            return { breakLength: state.breakLength + value }
        });    
    }

    setSessionLength(value) {
        const { timerState, sessionLength } = this.state;

        if(timerState === 'running') return false;

        if(sessionLength + value < 1 || sessionLength + value > 60) return false;

        return this.setState((state) => {
            return { sessionLength: state.sessionLength + value }
        });
    }

    play() {
        if(this.state.timerState === 'running') {
            return this.pause();
        }

        this.setState({
            timerState: 'running',
            timerId: setInterval(() => this.decrementTimer(), 1000)
        });
    }

    pause() {
        clearInterval(this.state.timerId);
        this.setState({
            timerId: '',
            timerState: 'stopped'
        });
    }
    
    
    reset() {
        clearInterval(this.state.timerId);

        this.audioBeep.pause();
        this.audioBeep.currentTime = 0;

        this.setState({
            breakLength: 5,
            sessionLength: 25,
            timer: 1500,
            timerId: '',
            timerType: 'session',
            timerState: 'stopped'
        });
    }

    switch() {
        const { timerType, breakLength, sessionLength } = this.state;

        this.audioBeep.play();

        this.setState({
            timerType: timerType === 'session' ? 'break' : 'session',
            timer: timerType === 'session' ? breakLength * 60 : sessionLength * 60
        });
    }

    decrementTimer() {
        this.setState((state) => {
            return { timer: state.timer - 1 }
        });
    }

    getTime() {
        const { timer } = this.state;

        let minutes = Math.floor(timer / 60);
        let seconds = timer % 60;

        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        return minutes + ' : ' + seconds;
    }



    render() {

        const { breakLength, sessionLength, timerType } = this.state;

        return(
            <div className="clock">
                <h1 className="title">Помодоро Таймер</h1>
                <SettingsPanel 
                    sessionLength={sessionLength} 
                    breakLength={breakLength} 
                    setSessionLength={this.setSessionLength}
                    setBreakLength={this.setBreakLength}
                />
                <Display getTime={this.getTime} timerType={timerType} />
                <ControlPanel reset={this.reset} play={this.play} pause={this.pause} />
                <audio 
                    src="https://goo.gl/65cBl1" 
                    preload="auto" 
                    ref={(audio) => this.audioBeep = audio}
                    id="beep"
                >
                </audio>
            </div>
        )
    }
}

export default App;