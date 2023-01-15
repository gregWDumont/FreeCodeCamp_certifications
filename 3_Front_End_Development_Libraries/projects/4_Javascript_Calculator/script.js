function App() {

    const inputArray = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '.'];
    
    const [resultDisplay, setResultDisplay] = React.useState('I am a calculator');
    const [inputDisplay, setInputDisplay] = React.useState('Bip Boop');
    const [clear, setClear] = React.useState(false);

    let arrayToInput = inputArray.map((input, index) => {
        return <button className="btn" id={input} key={index}>{input}</button>
    })

    return (
        <div className="container">
            <h1>Javascript Calculator</h1>
            <div className="calculator">
                <div id="input-container">
                    <div id="input-text">{inputDisplay}</div>
                    <div id="input-result">{resultDisplay}</div>
                </div>
                <div className="data-entry">
                <div id="btn-top-row">
                        <button className="btn" id="AC">AC</button>
                        <button className="btn" id="C">C</button>
                        <button className="btn tall" id="divide">/</button>
                        <button className="btn tall" id="x">x</button>
                    </div>
                    <div id="number-pad">
                        {arrayToInput}
                    </div>

                    <div id="btn-right-column">
                        <button className="btn" id="minus">-</button>
                        <button className="btn" id="add">+</button>
                        <button className="btn tall" id="equal">=</button>
                    </div>
                </div>
            </div> 
        </div>    
            
    )
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);