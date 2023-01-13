const audioClips = [
    {
        keyCode: 81,
        keyTrigger: "Q",
        id: "Heater 1",
        src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
    },
    {
        keyCode: 87,
        keyTrigger: "W",
        id: "Heater 2",
        src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
    },
    {
        keyCode: 69,
        keyTrigger: "E",
        id: "Heater 3",
        src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
    },
    {
        keyCode: 65,
        keyTrigger: "A",
        id: "Heater 4",
        src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
    },
    {
        keyCode: 83,
        keyTrigger: "S",
        id: "Clap",
        src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
    },
    {
        keyCode: 68,
        keyTrigger: "D",
        id: "Open-HH",
        src: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
    },
    {
        keyCode: 90,
        keyTrigger: "Z",
        id: "Kick-n'-Hat",
        src: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
    },
    {
        keyCode: 88,
        keyTrigger: "X",
        id: "Kick",
        src: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
    },
    {
        keyCode: 67,
        keyTrigger: 'C',
        id: 'Snare',
        src: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
    }
]

function App() {

    const [displayClipName, setDisplayClipName] = React.useState('Click a key!')

    React.useEffect(() => {
        document.addEventListener('keydown', changeDisplay);
        return () => {
            document.removeEventListener('keydown', changeDisplay)
        }
    }, [])

    const changeDisplay = (e) => {
        const targetId = e.target.id.slice(e.target.id.length -1, e.target.id.length);
        console.log(targetId);
        if (targetId) {
            if (targetId === 'Q' ) {
                setDisplayClipName('You played: ' + audioClips[0].id)
            }
            else if (targetId === 'W') {
                setDisplayClipName('You played: ' + audioClips[1].id)
            }
            else if (targetId  === 'E') {
                setDisplayClipName('You played: ' + audioClips[2].id)
            }
            else if (targetId  === 'A') {
                setDisplayClipName('You played: ' + audioClips[3].id)
            }
            else if (targetId  === 'S') {
                setDisplayClipName('You played: ' + audioClips[4].id)
            }
            else if (targetId  === 'D') {
                setDisplayClipName('You played: ' + audioClips[5].id)
            }
            else if (targetId  === 'Z') {
                setDisplayClipName('You played: ' + audioClips[6].id)
            }
            else if (targetId  === 'X') {
                setDisplayClipName('You played: ' + audioClips[7].id)
            }
            else if (targetId  === 'C') {
                setDisplayClipName('You played: ' + audioClips[8].id)
            }
        }
        else {
            const keyDownUpperCase = e.key.toUpperCase();
            console.log(keyDownUpperCase);
            if (keyDownUpperCase) {
                if (keyDownUpperCase === 'Q') {
                    setDisplayClipName('You played: ' + audioClips[0].id)
                }
                else if (keyDownUpperCase === 'W') {
                    setDisplayClipName('You played: ' + audioClips[1].id)
                }
                else if (keyDownUpperCase === 'E') {
                    setDisplayClipName('You played: ' + audioClips[2].id)
                }
                else if (keyDownUpperCase === 'A' || targetId  === 'A') {
                    setDisplayClipName('You played: ' + audioClips[3].id)
                }
                else if (keyDownUpperCase === 'S') {
                    setDisplayClipName('You played: ' + audioClips[4].id)
                }
                else if (keyDownUpperCase === 'D') {
                    setDisplayClipName('You played: ' + audioClips[5].id)
                }
                else if (keyDownUpperCase === 'Z') {
                    setDisplayClipName('You played: ' + audioClips[6].id)
                }
                else if (keyDownUpperCase === 'X') {
                    setDisplayClipName('You played: ' + audioClips[7].id)
                }
                else if (keyDownUpperCase === 'C') {
                    setDisplayClipName('You played: ' + audioClips[8].id)
                }
                else {
                    setDisplayClipName('You missed it, try again!')
                }
            }
        }        
    }

    return (
    <div id="drum-machine" className="text-white text-center">
        <div id="display" className="container-fluid bg-info rounded p-2">
            <h1>FCC - Drum Machine</h1>
            <div onClick={changeDisplay} className="pad-container bg-warning rounded p-3 m-3">
                {audioClips.map((clip) => (
                <Pad 
                    key={clip.id}
                    clip={clip}           
                />
                ))}
            </div>
            <h2>{displayClipName}</h2>
        </div>
    </div>
    )
}



const Pad = ({clip}) => {
    const [playing, setPlaying] = React.useState(false)

    React.useEffect(() => {
        document.addEventListener('keydown', handleKey);
        return () => {
            document.removeEventListener('keydown', handleKey)
        }
    }, [])

    const handleKey = (e) => {
        if(e.keyCode === clip.keyCode) {
            playSound()
            }
    }

    const playSound = () => {
        const audioPlay = document.getElementById(clip.keyTrigger);
        setPlaying(true);
        setTimeout(() => setPlaying(false), 300);
        audioPlay.currentTime = 0; 
        audioPlay.play();
    }

    return (
        <div onClick={playSound} className={`btn btn-secondary p-4 m-3 drum-pad ${playing && "btn-info"}`} id={`drum-pad-${clip.keyTrigger}`}>
            <audio src={clip.src} className="clip" id={clip.keyTrigger}/>
            {clip.keyTrigger}
        </div>
        
    )
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);