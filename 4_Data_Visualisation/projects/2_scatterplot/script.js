const App = () => {

	const [error, setError] = React.useState(null);
	const [isLoaded, setIsLoaded] = React.useState(false);
	const [items, setItems] = React.useState([]);

	React.useEffect(() => {
		fetch("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json")
		  .then(res => res.json())
		  .then(
			(result) => {
				setIsLoaded(true);
				setItems(result);
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

		return (
			<div className="dataContainer">
				<h1 id="title">Doping in Professional Bicycle Racing</h1>
				<h2 id="subtitle">35 Fastest times up Alpe d'Huez</h2>
				<Scatterplot 
					data={items} 
				/>
			</div>
		);
	}
};

const Scatterplot = ({ data }) => {
	React.useEffect(() => {
	createScatterplot();
	}, [data]);

	const h = 400;
	const w = 800;
	const padding = 100;

	const createScatterplot = () => {
		const time = data.map((item) => item["Time"]);
		const year = data.map((item) => item["Year"]);

		const svg = d3.select(".dataContainer")
			.select("div")
			.append("svg")
			.attr("id", "chart")
			.attr("width", w + "px")
			.attr("height", h + "px");

		const tooltip = d3.select(".dataContainer")
		.append("div")
		.attr("id", "tooltip")


		const parsedYear = year.map(function(d) {
			return d3.timeParse("%Y")(d)
		})

		const xDomain = d3.extent(parsedYear);
		xDomain[0] = d3.timeYear.offset(xDomain[0], -1);
		xDomain[1] = d3.timeYear.offset(xDomain[1], 1);
		
		const xScale = d3.scaleTime()
		  .domain(xDomain)
		  .range([padding, w - padding]);
		  
		const xAxis = d3.axisBottom(xScale)
			.tickFormat(function(d) {
				return d3.timeFormat("%Y")(d)
			});

		const parsedTime = time.map(function(d) {
			return d3.timeParse("%M:%S")(d)
		});
		const yDomain = d3.extent(parsedTime);
		yDomain[0] = d3.timeSecond.offset(yDomain[0], -10);
		yDomain[1] = d3.timeSecond.offset(yDomain[1], 10);
		
		const yScale = d3.scaleTime()
		  .domain(yDomain.reverse())
		  .range([padding, h - padding]);
		const yAxis = d3.axisLeft(yScale)
			.tickFormat(function(d){
				return d3.timeFormat("%M:%S")(d)
			});

		svg.append("g")
			.attr("id", "x-axis")
			.attr("transform", "translate(0," + (h - padding) + ")")
			.call(xAxis);
	  
	  	svg.append("g")
			.attr("id", "y-axis")
			.attr("transform", "translate(" + padding + ", 0)")
			.call(yAxis);

		svg.selectAll("circle")
			.data(data)
			.enter()
			.append("circle")
			.attr("class", "dot")
			.attr("cx", (d) => xScale(parsedYear[data.indexOf(d)]))
			.attr("cy", (d) => h - yScale(parsedTime[data.indexOf(d)]))
			.attr("data-xvalue", (d) => d3.timeFormat("%Y")(parsedYear[data.indexOf(d)]))
			.attr("data-yvalue", (d) => new Date (parsedTime[data.indexOf(d)]))
			.attr("fill", (d) => d.Doping === "" ? "green" : "orange")
			.attr("r", 5)
			.on("mouseover", (e, d, i) =>
				tooltip.style("display", "inline-block")
					.html(d["Name"] + ": " + d["Nationality"] + "<br/>Year:" + d["Year"] + ", Time" + d["Time"] + "<br/>" + d.Doping)
					.style("opacity", 0.9)
					.attr("data-year", d3.timeFormat("%Y")(parsedYear[data.indexOf(d)]))
		  	)
		  	.on("mouseout", () => tooltip.style("opacity", 0))

		const legend = svg.append("g")
			.attr("id", "legend")
			.attr("transform", "translate(" + (w - padding) + ", " + h / 2 + ")");
			
		legend.append("rect")
			.attr("y", -1)
			.attr("width", 12)
			.attr("height", 12)
			.style("fill", "orange");
		
		legend.append("text")
			.attr("x", -24)
			.attr("y", 9)
			.style("font-size", "12px")
			.style("text-anchor", "end")
			.text("Riders with doping allegations");
		
		legend.append("rect")
			.attr("y", 20)
			.attr("width", 12)
			.attr("height", 12)
			.style("fill", "green");
		
		legend.append("text")
			.attr("x", -24)
			.attr("y", 27)
			.style("font-size", "12px")
			.style("text-anchor", "end")
			.text("No doping allegations");
		
		
	}
	return (
		<div></div>
	)
};

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);
