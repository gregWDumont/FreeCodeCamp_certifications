function App() {

    const [markdownText, setMarkdownText] = React.useState(`
# Type your markdown text here


--- 

## Use the markdown styles displayed below to see the result translated into an HTML format

here is a [link](https://commonmark.org/help/) with basics markdown styling methods.

We use [marked-react](https://github.com/sibiraj-s/marked-react) to automatically parse our markdown input into HTML (kudos to the team!).

This markdown previewer uses the [GitHub Flavored Markdown Spec](https://github.github.com/gfm/).

* You can 
* write down 
* a list of items

### You can also integrate your code directly within the text

\`Inline code\` with backticks 

or even code blocks as below:

\`\`\`
# code block
print '3 backticks or'
print 'indent 4 spaces'
\`\`\` 

`)

React.useEffect(() => {
    textToMarkdown()
})

    const [markdowned, setMarkdowned] = React.useState("")



    const handleChange = (e) => {
        setMarkdownText(e.target.value)
        textToMarkdown()
    }

    // https://marked.js.org/using_advanced
    const textToMarkdown = () => {
        marked.setOptions({breaks: true})
        setMarkdowned(marked.parse(markdownText));
    }

    return (
        
        <div className="row jumbotron">
            <h1 className="text-center mt-4 text-light fw-bold text-decoration-underline">Markdown Previewer</h1>
            <h2 className="text-center mb-4 text-light fw-bold text-decoration-underline">Free Code Camp Project</h2>
            <div className="col-1"></div>
            <div className="col-5 border border-dark bg-dark rounded">
                <h3 className="text-center text-light fw-bold">
                    Markdown:
                </h3>
                <textarea 
                onChange={handleChange} 
                defaultValue={markdownText} 
                id="editor"
                className="container-fluid box bg-secondary text-light markdown-text p-2"/>
            </div>
            <div 
            className="col-5 border border-light rounded text-light ms-4" id="container-html">
                <h3 className="text-center fw-bold">
                    HTML:
                </h3>
                <div id="preview" 
                className="border border-light rounded p-2 container-fluid box html-text"
                dangerouslySetInnerHTML={{ __html: markdowned }}/>
            </div>
            <div className="col-1"></div>
        </div>
    )
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);