function App() {

    const [breakTime, setBreakTime] = React.useState(5*60)
    const [sessionTime, setSessionTime] = React.useState(25*60)
    const [timeLeft, setTimeLeft] = React.useState(25*60)
    const [currentPhase, setCurrentPhase] = React.useState(true)
    const [playPause, setPlayPause] = React.useState(false)
    const [playPauseIcon, setPlayPauseIcon] = React.useState(<i className="fa-solid fa-play"></i>);
    const beepSound = document.getElementById("beep")

    const playBreakSound = () => {
        beepSound.play()
    }

    const settingsTimes = (time) => {
        let minutes = Math.floor(time/60);
        return minutes
    }

    const formatTime = (time) => {
        let minutes = Math.floor(time/60);
        let seconds = time % 60;
        return (
            (minutes < 10 ? "0" + minutes : minutes) +
            ":" +
            (seconds < 10 ? "0" + seconds : seconds)
        )
    };

    const changePhase = (amount, phase) => {
        if (phase == "break") {
            if (breakTime <= 60 && amount < 0) {
                return;
            } else if (breakTime >= 3600 && amount > 0) {
                return;
            }
            setBreakTime((prev) => prev + amount)
        }
        else {
            if (sessionTime <= 60 && amount < 0) {
                return;
            } else if (sessionTime >= 3600 && amount > 0) {
                return;
            }
            setSessionTime((prev) => prev + amount)
            if(!playPause) {
                setTimeLeft(sessionTime + amount)
            }
        }
    }

    const startStop = () => {
        let second = 1000;
        let date = new Date().getTime();
        let nextDate = new Date().getTime() + second;
        let varCurrentPhase = currentPhase;
        if (!playPause) {
            let interval = setInterval(() => {
                date = new Date().getTime();
                if (date> nextDate) {
                    setTimeLeft((prev) => {
                        if(prev <= 0 && !varCurrentPhase) {
                            playBreakSound();
                            varCurrentPhase=true;
                            setCurrentPhase(true);
                            return breakTime;
                        } else if (prev <= 0 && varCurrentPhase) {
                            playBreakSound();
                            varCurrentPhase=false;
                            setCurrentPhase(false);
                            return sessionTime;
                        }
                        return prev - 1;
                    });
                    nextDate += second;
                }
            }, 50);
            localStorage.clear();
            localStorage.setItem('interval-id', interval);
            setPlayPauseIcon(<i className="fa-solid fa-pause"></i>);
        }
        if (playPause) {
            clearInterval(localStorage.getItem('interval-id'));
            setPlayPauseIcon(<i className="fa-sharp fa-solid fa-circle-play"></i>);
        }

        setPlayPause(!playPause)
    }

    const reset = () => {
        if (playPause) {
            startStop()
        } 
        setBreakTime(5*60);
        setSessionTime(25*60);
        setTimeLeft(25*60);
        setCurrentPhase(true);
        beepSound.pause()
        beepSound.currentTime = 0;
    }

    return (
        <div className="container">
            <h1>25 + 5 Clock</h1>
            <div className="settings-container">
                <div>
                    <h3 id="break-label">Break Length</h3>
                    <div className="break-settings">
                        <button onClick={() => changePhase(-60, "break")} id="break-decrement" ><i className="fa-solid fa-arrow-down"></i></button>
                        <h4 id="break-length">{settingsTimes(breakTime)}</h4>
                        <button onClick={() => changePhase(60, "break")} id="break-increment"><i className="fa-solid fa-arrow-up"></i></button>
                    </div>
                </div>
                <div>
                    <h3 id="session-label">Session Length</h3>
                    <div className="session-settings">
                        <button onClick={() => changePhase(-60, "session")} id="session-decrement"><i className="fa-solid fa-arrow-down"></i></button>
                        <h4 id="session-length">{settingsTimes(sessionTime)}</h4>
                        <button onClick={() => changePhase(60, "session")} id="session-increment"><i className="fa-solid fa-arrow-up"></i></button>
                    </div>
                </div>
            </div>
            <div className="display-container">
                <h3 id="timer-label">{currentPhase ? 'Session' : 'Break'}</h3>
                <div id="time-left">{formatTime(timeLeft)}</div>
            </div>
            <div className="commands-container">
                <button id="start_stop" onClick={startStop}>{playPauseIcon}</button>
                <button id="reset" onClick={reset}><i className="fa-solid fa-arrows-rotate"></i></button>
            </div>
        </div>        
    )
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);