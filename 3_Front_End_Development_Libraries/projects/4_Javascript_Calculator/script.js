function App() {

    const inputArray = [
        {value: '7', name:'seven'},
        {value: '8', name:'eight'},
        {value: '9', name:'nine'},
        {value: '4', name:'four'},
        {value: '5', name:'five'},
        {value: '6', name:'six'},
        {value: '1', name:'one'},
        {value: '2', name:'two'},
        {value: '3', name:'three'},
        {value: '0', name:'zero'},
        {value: '.', name:'decimal'}
    ];

    const [expression, setExpression] = React.useState('');
    const [output, setOutput] = React.useState('')


    const enterInput = (e) => {
        const input = e.target.value;
        const regexNumDec = /[0-9.]/
        const regexOperators = /[+/*-]/
        setExpression((prev) => prev + input);
        
        if (expression[expression.length - 1] == "=") {
            if (regexNumDec.test(input)) {
                setExpression(input)
            }
            else {
                setExpression(output + input)
            }
        }

        if (regexNumDec.test(input)) {
            if (expression[0] == '.') {
                if (input == '.') {
                    setOutput('0.');
                    setExpression('0.');
                } 
                else {
                    setOutput('0.' + input);
                    setExpression('0.' + input);
                }
            }      
            else if (input == '.' && /\./.test(output)) {
                setExpression(expression)
                setOutput(output)
            }     
            else if (output[0] == '0' && output[1] !== '.') {
                setOutput(input)
                setExpression(input)
            } 
            else if (expression !== '' && input == '.') {
                setOutput((prev) => prev + input + '0')
                setExpression(expression + '.0')
            }
            else if (output[output.length - 1] == '0' && output[output.length - 2] == '.' && input !== '.') {
                setOutput(output.slice(0, output.length - 1) + input)
                setExpression(expression.slice(0, expression.length - 1) + input)
            }
            else {
                setOutput((prev) => prev + input)
            }
            }
        else {
            setOutput(input)
        }

        // The sequence "5 * - + 5" = should produce an output of "10" : expected '25' to equal '10'
        if (regexOperators.test(input) && regexOperators.test(expression[expression.length - 1])) {
            if (input == '-') {
                setExpression(expression + input)
            }
            else if (regexOperators.test(input) && expression[expression.length - 1] == '-' && regexOperators.test(expression[expression.length - 2])) {
                setExpression(expression.slice(0, expression.length - 2) + input)
            }
            else {
                setExpression(expression.slice(0, expression.length - 1) + input)
            }
        }
        
    }

    const calcInput = () => {
        setOutput(eval(expression));
        setExpression((prev) => prev + "=");
        } 

    let arrayToInput = inputArray.map((input) => {
        return <button onClick={enterInput} className="btn" id={input.name} value={input.value} key={input.value}>{input.value}</button>
    })

    const clearAll = () => {
        setExpression('');
        setOutput('')
    }


    const clear = () => {
        if (output == '') {
            setExpression(output)
        } else {
            setExpression(expression.slice(0, output.length));
        }
        setOutput('')
    }
 


    return (
        <div className="container">
            <h1>Javascript Calculator</h1>
            <div className="calculator">
                <div id="output">
                    <div id="expression">{expression || '0'}</div>
                    <div id="display">{output || '0'}</div>
                </div>
                <div className="data-entry">
                <div id="btn-top-row">
                        <button 
                            onClick={clearAll} 
                            className="btn" 
                            id="clear"
                            value={'AC'}
                            >
                            AC
                        </button>
                        <button 
                            onClick={clear} 
                            className="btn" 
                            id="clear-last"
                            value={'C'}
                            >
                            C
                        </button>
                        <button 
                            onClick={enterInput}
                            className="btn tall" 
                            id="divide"
                            value={'/'}
                                >
                                /
                        </button>
                        <button 
                            onClick={enterInput}
                            className="btn tall" 
                            id="multiply"
                            value={'*'}
                            >
                            x
                        </button>
                    </div>
                    <div id="number-pad">
                        {arrayToInput}
                    </div>

                    <div id="btn-right-column">
                        <button 
                            onClick={enterInput}
                            className="btn" 
                            id="subtract"
                            value={'-'}
                            >
                            -
                        </button>
                        <button 
                            onClick={enterInput}
                            className="btn" 
                            id="add"
                            value={'+'}
                            >
                            +
                        </button>
                        <button 
                            onClick={calcInput}
                            className="btn tall" 
                            id="equals"
                            value={'='}
                            >
                            =
                        </button>
                    </div>
                </div>
            </div> 
        </div>    
            
    )
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);