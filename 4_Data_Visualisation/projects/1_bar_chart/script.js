const App = () => {

	const [error, setError] = React.useState(null);
	const [isLoaded, setIsLoaded] = React.useState(false);
	const [items, setItems] = React.useState([]);

	React.useEffect(() => {
		fetch("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json")
		  .then(res => res.json())
		  .then(
			(result) => {
				setIsLoaded(true);
				setItems(result.data);
			},
			(error) => {
				setIsLoaded(true);
				setError(error);
			}
		  )
	  }, [])

	if (error) {
		return <div>Error: {error.message}</div>;
	} else if (!isLoaded) {
		return <div>Loading...</div>;
	} else {

		console.log(items.length * 3)
		return (
			<div className="dataContainer">
				<h1 id="title">United States GDP</h1>
				<BarChart 
					data={items}
				/>
			</div>
		);
	}
}

const BarChart = ({ data }) => {
	React.useEffect(() => {
	createBarChart();
	}, [data]);

	const h = 500;
	const w = 800;
	const padding = 100;

	const createBarChart = () => {
		const dates = data.map((item) => item[0]);
		const values = data.map((item) => item[1]);
		console.log(dates);
		console.log(values);

		const svg = d3.select(".dataContainer")
			.select("div")
			.append("svg")
			.attr("id", "chart")
			.attr("width", w + "px")
			.attr("height", h + "px");

		const tooltip = d3.select(".dataContainer")
			.append("div")
			.attr("id", "tooltip")
			.style("opacity", 0);

		const datesMax = d3.max(dates);
		const datesMin = d3.min(dates);
		console.log(datesMin, datesMax)
		const xScale = d3.scaleTime()
			.domain([new Date(datesMin), new Date(datesMax)])
			.range([padding, w - padding]);
		const xAxis = d3.axisBottom(xScale);

		const valuesMax = d3.max(values);
		const yScale = d3.scaleLinear()
			.domain([valuesMax, 0])
			.range([padding, h - padding])
		const yAxis = d3.axisLeft(yScale);

		svg.append("g")
			.attr("id", "x-axis")
			.attr("transform", "translate(0," + (h - padding) + ")")
			.call(xAxis);
	  
	  	svg.append("g")
			.attr("id", "y-axis")
			.attr("transform", "translate(" + padding + ", 0)")
			.call(yAxis);

		svg.selectAll("rect")
			.data(data)
			.enter()
			.append("rect")
			.attr("class", "bar")
			.style("fill", (d, i) => (i % 2 == 0 ? "#deba4c" : "#4c71de"))
			.attr("x", (d, i) => xScale(new Date(d[0])))
			.attr("y", (d, i) => yScale(d[1]))
			.attr("width", 4)
			.attr("height", (d) => h - yScale(d[1]) - padding)
			.attr("data-date", (d) => d[0])
			.attr("data-gdp", (d) => d[1])
			.on("mouseover", (e, d, i) =>
				tooltip.style("display", "inline-block")
					.html("Date: " + d[0] + "<br/>GDP:" + d[1])
					.style("opacity", 0.9)
					.attr("data-date", d[0])
		  	)
		  	.on("mouseout", (d) => tooltip.style("opacity", 0))
	}


	return (
		<div></div>
	)
};

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);