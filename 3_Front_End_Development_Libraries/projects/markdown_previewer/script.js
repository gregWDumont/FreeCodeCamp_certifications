function App() {

    const [markdownText, setMarkdownText] = React.useState("When my markdown previewer first loads, the default text in the #editor field should contain valid markdown that represents at least one of each of the following elements: a heading element (H1 size), a sub heading element (H2 size), a link, inline code, a code block, a list item, a blockquote, an image, and bolded text.")
    const [markdowned, setMarkdowned] = React.useState("")

    const handleChange = (e) => {
        setMarkdownText(e.target.value)
        textToMarkdown()
    }

    const textToMarkdown = () => {
        console.log('here')
        setMarkdowned(marked.parse(markdownText));
        return dangerouslySetInnerHTML={ __html: markdowned };
    }

    return (
        
        <div className="row">
            <h1 className="text-center m-4">Convert your markdown</h1>
            <div className="col-6 border bg-danger">
                <h5 className="text-center">
                    Markdown:
                </h5>
                <textarea 
                onChange={handleChange} 
                value={markdownText} 
                id="editor"
                className="border-danger container-fluid box"/>
            </div>
            <div 
            className="col-6 border bg-warning">
                <h5 className="text-center">
                    HTML:
                </h5>
                <div id="preview" 
                className="border border-info rounded p-1 container-fluid box bg-light">
                    {markdowned}
                </div>
            </div>
        </div>
    )
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);