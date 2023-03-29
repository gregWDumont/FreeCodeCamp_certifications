const App = () => {

	const [error, setError] = React.useState(null);
	const [isLoaded, setIsLoaded] = React.useState(false);
	const [items, setItems] = React.useState([]);

	React.useEffect(() => {
		fetch("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json")
		  .then(res => res.json())
		  .then(
			(result) => {
				setIsLoaded(true);
				setItems(result["monthlyVariance"]);
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
				<h1 id="title">Monthly Global Land-Surface Temperature</h1>
				<h2 id="description">1753 - 2015: base temperature 8.66℃</h2>
				<Heatmap 
					data={items} 
				/>
			</div>
		);
	}
};

const Heatmap = ({ data }) => {
	React.useEffect(() => {
	  	createHeatmap();
	}, [data]);
    
	const height = 700;
	const width = 1400;
  
	const margins = {
		top: 10,
		right: 10,
		bottom: 80,
		left: 75
	}
  
	const boundsWidth = width - margins.left - margins.right;
	const boundsHeight = height - margins.top - margins.bottom;
  
	const year = data.map((item) => item["year"]);
	const month = data.map((item) => item["month"]);
	const variance = data.map((item) => item["variance"]);
	const baseTemperature = 8.66;

	const tooltip = d3.select("body")
		.append("div")
		.attr("id", "tooltip")
		.style("position", "absolute")
		.style("background-color", "white")
		.style("border", "1px solid black")
		.style("padding", "10px")
		.style("display", "none");
	  
	const createHeatmap = () => {
		const svg = d3.select("#heatmap")
			.append("svg")
			.attr("width", width)
			.attr("height", height)
			.append("g")
			.attr("transform", `translate(${margins.left},${margins.top})`);
	  
		const xScale = d3.scaleBand()
			.domain([...new Set(year)])
			.range([0, boundsWidth]);

		const yScale = d3.scaleBand()
			.domain(month.map(m => new Date(2000, m - 1).toLocaleString('default', { month: 'long' })))
			.range([boundsHeight, margins.bottom])
		
		const xAxis = d3.axisBottom(xScale)
			.tickValues(year.filter((d) => d % 10 === 0));
		
		const yAxis = d3.axisLeft(yScale);
		
		svg.append("g")
			.attr("id", "x-axis")
			.attr("transform", `translate(0, ${boundsHeight})`)
			.style("font-size", "12px")
			.attr("font-weight",function(d,i) {return i*200+200;})
			.attr("font-family", function(d,i) {return i<5 ? "serif" : "sans-serif"; })
			.call(xAxis);
		
		svg.append("g")
			.attr("id", "y-axis")
			.style("font-size", "12px")
			.call(yAxis);
	  
		const colorScale = d3.scaleSequential()
			.interpolator(d3.interpolateRdYlBu)
			.domain([d3.max(variance) + baseTemperature, d3.min(variance) + baseTemperature]);
	  
		svg.selectAll()
			.data(data)
			.enter()
			.append("rect")
			.attr("class", "cell")
			.attr("data-month", (d) => new Date(2000, d.month - 1).getMonth())
			.attr("data-year", (d) => d.year)
			.attr("data-temp", (d) => baseTemperature + d.variance)
			.attr("x", (d) => xScale(d.year))
			.attr("y", (d) => yScale(new Date(2000, d.month - 1).toLocaleString('default', { month: 'long' })))
			.attr("width", xScale.bandwidth())
			.attr("height", yScale.bandwidth())
			.style("fill", (d) => colorScale(baseTemperature + d.variance))
			.on("mouseover", (event, d) => {
				tooltip.attr("data-year", d.year)
					.html(`Year: ${d.year} - Month: ${new Date(2000, d.month - 1).toLocaleString('default', { month: 'long' })} <br/> Temperature: ${baseTemperature + d.variance} <br/> Variance: ${d.variance}`)
					.style("display", "block")
					.style("top", `${event.pageY}px`)
					.style("left", `${event.pageX}px`);
				d3.select(event.target).style("stroke", "black").style("stroke-width", 2);
			})
			.on("mouseout", (event, d) => {
				tooltip.style("display", "none");
				d3.select(event.target).style("stroke", "none").style("stroke-width", 0);
			});	

		const legendData = d3.range(1.6840000000000002, 13.888 );
		const legendWidth = 30;
		const legendHeight = 10;
		const legendX = (d, i) => i * legendWidth;
		const legendY = boundsHeight + margins.top + 30;

		const legend = svg.append("g")
			.attr("id", "legend")
			.attr("transform", `translate(${boundsWidth / 2 - (legendData.length * legendWidth) / 2}, ${legendY})`);

		legend.selectAll("rect")
			.data(legendData)
			.enter()
			.append("rect")
			.attr("x", legendX)
			.attr("y", 0)
			.attr("width", legendWidth)
			.attr("height", legendHeight)
			.style("fill", (d) => colorScale(d))
			.style("stroke", "#fff")
			.style("stroke-width", 2);

		legend.selectAll("text")
			.data(legendData)
			.enter()
			.append("text")
			.attr("x", (d, i) => legendX(d, i) + legendWidth / 2)
			.attr("y", legendHeight * 2)
			.text(d => d.toFixed(1))
			.style("font-size", "10px")
			.style("text-anchor", "middle");
	};
	  
	return <div id="heatmap"></div>;
  };
  


const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);