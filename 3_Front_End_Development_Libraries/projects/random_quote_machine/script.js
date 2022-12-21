function App() {

    //https://reactjs.org/docs/hooks-reference.html#usestate
    const [quotes, setQuotes] = React.useState({});
    const [randomQuotes, setRandomQuotes] = React.useState("")
    const [dynamicBgImg, setDynamicBgImg] = React.useState(
        {backgroundImage:
        "url('https://images.unsplash.com/photo-1517345438041-cf88a04b4689?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',})

    const imgList = [{
        link: "https://images.unsplash.com/photo-1517345438041-cf88a04b4689?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"},
        {link: "https://images.unsplash.com/photo-1671400833073-0a066e059f44?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"},
        {link: "https://images.unsplash.com/photo-1669817683129-869ca3c0bd3d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"},
        {link: "https://images.unsplash.com/photo-1667248659708-65c5f37a0605?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80"},
        {link: "https://images.unsplash.com/photo-1670958259617-20127980a3d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1179&q=80"},
        {link: "https://images.unsplash.com/photo-1671363332482-d3d2e53808d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1100&q=80"},
        {link: "https://images.unsplash.com/photo-1671372678599-d6267ead7291?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"},
        {link: "https://images.unsplash.com/photo-1669669957371-038884599ba1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1117&q=80"}
    ]

    React.useEffect(() => {
        fetchQuote();
    }, []);

    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    async function fetchQuote() {
        await fetch('https://type.fit/api/quotes')
            .then((response) => {
                if(response.ok) {
                    return response.json()
                    .then((data) => {
                        setQuotes({
                            text : data.text,
                            author: data.author
                        })
                        let randIndexQuote = Math.floor(Math.random() * data.length - 1);
                        setRandomQuotes(data[randIndexQuote]);
                    })
                }
                else {
                    console.log('Wrong network response');
                }
            })
            .catch(function(error) {
                console.log('There was a problem with the fetch operation: ' + error.message);
              })
    }
    // switch background image
    function changeBgImg() {
        console.log('TRUE')
        let randIndexImg = Math.floor(Math.random() * imgList.length - 1);
        setDynamicBgImg({backgroundImage:
            "url('"+imgList[randIndexImg].link+"')",
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',})
    }       

    return (
        <div id="container" style={dynamicBgImg} className="container-fluid vertical-center text-light">
            <div className="row">
                <div className="col col-2"></div>
                <div id="quote-box" className="col col-8 bg-secondary bg-gradient rounded">
                    <h1 className="text-center pb-5 fw-bolder">Random Quote Machine</h1>
                    <h2 id="text" className="fst-italic">"{randomQuotes.text}"</h2>
                    <h2 id="author" className="fw-light text-end pb-4">{randomQuotes.author}</h2>
                    <div className="row">
                        <div className="col col-4 m-1">
                            <button id="new-quote" 
                                onClick={() => {fetchQuote(), changeBgImg()}} className="btn btn-danger">
                                    New Quote
                            </button>
                        </div>
                        <div className="col col-7 m-1 ">
                            <a href="twitter.com/intent/tweet" target="_blank" className="btn btn-primary">
                                Tweet this&nbsp;
                                <i className="tweet-quote fa-brands fa-twitter"></i>
                            </a>
                            <a href="https://mastodon.social/share?text=Hello%20there" target="_blank" className="btn btn-info">
                                Toot that&nbsp;
                                <i className="fa-brands fa-mastodon"></i>
                            </a>
                        </div>  
                    </div>
                </div>
                <div className="col col-2"></div>
            </div>
        
        </div>    
    )
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);