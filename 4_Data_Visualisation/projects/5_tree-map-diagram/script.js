const App = () => {
	const [error, setError] = React.useState(null);
	const [isLoaded, setIsLoaded] = React.useState(false);
	const [videoGameData, setVideoGameData] = React.useState([]);
	const [moviesData, setMoviesData] = React.useState([]);
	const [kickstarterData, setKickstarterData] = React.useState([]);
	const [currentData, setCurrentData] = React.useState([])
	const [title, setTitle] = React.useState(null);
	const [description, setDescription] = React.useState(null);
	const [colorScale, setColorScale] = React.useState(() => d3.scaleOrdinal().range(d3.schemePastel1));
	const [legendData, setLegendData] = React.useState([]);
  
	const fetchData = async () => {
	  	try {
			const videoGameResponse = await fetch("https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json");
			const videoGameResult = await videoGameResponse.json();
			const moviesResponse = await fetch("https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json");
			const moviesResult = await moviesResponse.json();
			const kickstarterResponse = await fetch("https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json");
			const kickstarterResult = await kickstarterResponse.json();
			// Set the default values to be displayed the first time the DOM renders
			if (!isLoaded) {
				setCurrentData(videoGameResult);
				setTitle("Video Game Sales")
				setDescription("Top 100 Most Sold Video Games Grouped by Platform");
			}
			setIsLoaded(true);
			setVideoGameData(videoGameResult);
			setMoviesData(moviesResult);
			setKickstarterData(kickstarterResult);
	  	} catch (error) {
			setIsLoaded(true);
			setError(error);
	  	}
	};
  
	React.useEffect(() => {
	  	fetchData();
	}, []);

	React.useEffect(() => {
		if (currentData.length > 0) {
		  const categoryNames = [...new Set(currentData.children.map(d => d.name))];
		  setColorScale(() => d3.scaleOrdinal().domain(categoryNames).range(d3.schemeCategory10));
		} else {
		  setColorScale(() => d3.scaleOrdinal().range(d3.schemePastel1));
		}
	}, [currentData]);
  
	if (error) {
	  return <div>Error: {error.message}</div>;
	} else if (!isLoaded) {
	  return <div>Loading...</div>;
	} else {

		const dataChoice = (event) => {
			if (event.target.id == "videoGame") {
				setCurrentData(videoGameData);
				setTitle("Video Game Sales")
				setDescription("Top 100 Most Sold Video Games Grouped by Platform");
			} else if (event.target.id == "movies") {
				setCurrentData(moviesData);
				setTitle("Movie Sales")
				setDescription("Top 100 Highest Grossing Movies Grouped By Genre");
			} else if (event.target.id == "kickstarter") {
				setCurrentData(kickstarterData);
				setTitle("Kickstarter Pledges")
				setDescription("Top 100 Most Pledged Kickstarter Campaigns Grouped By Category");
			}
			console.log("currentData", currentData)
		}

		console.log(colorScale)

		return (
			<div className="dataContainer">
				<div id="buttonContainer">
					<button id="videoGame" onClick={dataChoice}>Video Game Data Set</button> 
					<span>|</span>
					<button id="movies" onClick={dataChoice}>Movies Data Set</button>
					<span>|</span>
					<button id="kickstarter" onClick={dataChoice}>Kickstarter Data Set</button>
				</div>
				<h1 id="title">{title}</h1>
				<div id="description">{description}</div>
				<TreeMap data={currentData} colorScale={colorScale} createTreeMap={createTreeMap}/>
				<Legend data={currentData} colorScale={colorScale}/>
			</div>
	  	);
	}
};

const createTreeMap = (data, width, height, margins, colorScale) => {

	// remove the previous svg to avoid addition
	d3.select("#treemap svg").remove();

	const svg = d3.select("#treemap")
		.append("svg")
		.attr("width", width + margins.left + margins.right)
		.attr("height", height + margins.top + margins.bottom);

    // create hierarchical data structure
    const root = d3.hierarchy(data)
        .sum((d) => d.value)
        .sort((a, b) => b.value - a.value);

    // create treemap layout
    const treemapLayout = d3.treemap()
        .size([width, height])
        .paddingInner(1);

	// perform layout on hierarchy
	treemapLayout(root);

	const tooltip = d3.select(".dataContainer")
		.append("div")
		.attr("id", "tooltip")
		.style("opacity", 0);

	const rects = svg.selectAll("rect")
		.data(root.leaves())
		.enter()
		.append("g");
	  
	rects.append("rect")
		.attr("x", (d) => d.x0 + margins.left)
		.attr("y", (d) => d.y0 + margins.top)
		.attr("width", (d) => d.x1 - d.x0)
		.attr("height", (d) => d.y1 - d.y0)
		.attr("fill", (d) => colorScale(d.data.category))
		.attr("data-name", (d) => d.data.name)
		.attr("data-category", (d) => d.parent.data.name)
		.attr("data-value", (d) => d.data.value)
		.attr("class", "tile")
		.on("mouseover", (event, d) => {
			tooltip.transition()
			.duration(200)
			.style("opacity", 1);
			tooltip.html(
			"Name: " + d.data.name + "<br>" +
			"Category: " + d.parent.data.name + "<br>" +
			"Value: " + d3.format("$,.2f")(d.data.value))
			.attr("data-value", d.data.value)
			.style("left", event.pageX + 10 + "px")
			.style("top", event.pageY - 28 + "px");
		})
		.on("mousemove", function(event, d) {
			const x = event.pageX;
			const y = event.pageY;
			tooltip.style("opacity", 1)
			  	.style("left", x + 10 + "px")
			  	.style("top", y - 28 + "px")
			  	.attr("data-value", d.data.value)
			  	.html(
					"Name: " + d.data.name + "<br>" +
					"Category: " + d.parent.data.name + "<br>" +
					"Value: " + d3.format("$,.2f")(d.data.value)
				);
		})
		.on("mouseout", () => {
			tooltip.transition()
			.duration(100)
			.style("opacity", 0);
		})
	  
	rects.append("foreignObject")
		.attr("x", (d) => d.x0 + margins.left + 3)
		.attr("y", (d) => d.y0 + margins.top + 3)
		.attr("width", (d) => d.x1 - d.x0 - 6)
		.attr("height", (d) => d.y1 - d.y0 - 6)
		.append("xhtml:div")
		.attr("class", "tile-text")
		.text((d) => d.data.name);
};

const TreeMap = ({ data, colorScale }) => {
	console.log(data)

    const svgWidth = 1050;
    const svgHeight = 650;
    const margins = { top: 20, right: 20, bottom: 50, left: 60 };
    const width = svgWidth - margins.left - margins.right;
    const height = svgHeight - margins.top - margins.bottom;

    React.useEffect(() => {
		createTreeMap(data, width, height, margins, colorScale);
    }, [data, width, height, margins, colorScale]);

    return (
        <div id="treemap"></div>
    );
};

const Legend = ({ data, colorScale }) => {
	const sortedData = [...data.children].sort((a, b) => b.children.length - a.children.length);
	console.log(sortedData);
	const items = sortedData.map((d) => (
		<div key={d.name} className="legend-item">
			<svg width="16" height="16" className="legend-color">
				<rect width="16" height="16" fill={colorScale(d.name)} className="legend-item"/>
			</svg>
			<span className="legend-label">{d.name}</span>
		</div>
	));
  
	return <div id="legend">{items}</div>;
};

  
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);
