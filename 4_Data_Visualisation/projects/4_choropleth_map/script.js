const App = () => {
	const [error, setError] = React.useState(null);
	const [isLoaded, setIsLoaded] = React.useState(false);
	const [counties, setCounties] = React.useState(null);
	const [educationData, setEducationData] = React.useState([]);
  
	// Ref: https://codepen.io/freeCodeCamp/pen/EZKqza

	const fetchData = async () => {
	  	try {
			const geoResponse = await fetch("https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json");
			const geoResult = await geoResponse.json();
			const eduResponse = await fetch("https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json");
			const eduResult = await eduResponse.json();
			setIsLoaded(true);
			setCounties(geoResult);
			setEducationData(eduResult);
	  	} catch (error) {
			setIsLoaded(true);
			setError(error);
	  	}
	};
  
	React.useEffect(() => {
	  	fetchData();
	}, []);
  
	if (error) {
	  return <div>Error: {error.message}</div>;
	} else if (!isLoaded) {
	  return <div>Loading...</div>;
	} else {
		return (
			<div className="dataContainer">
				<h1 id="title">United States Educational Attainment</h1>
				<h3 id="description"> Percentage of adults age 25 and older with a bachelor's degree or higher (2010-2014)</h3>
				<ChoroplethMap counties={counties} educationData={educationData} />
				<p id="source"> Source: <a href="https://www.ers.usda.gov/data-products/county-level-data-sets/download-data.aspx" target="_blank" rel="noopener noreferrer">USDA Economic Research Service</a></p>
			</div>
	  	);
	}
};

const createChoroplethMap = (counties, educationData, width, height, margins) => {
	// create SVG element
	const svg = d3.select("#chomap")
		.append("svg")
		.attr("width", width + margins.left + margins.right)
		.attr("height", height + margins.top + margins.bottom);
  
	// create tooltip
	const tooltip = d3.select(".dataContainer")
		.append("div")
		.attr("id", "tooltip")
		.attr("class", "tooltip")
		.style("opacity", 0);

	// create projection and path generator
	const path = d3.geoPath();

	// join education data with county data
	const countyData = topojson.feature(counties, counties.objects.counties).features;
	console.log(countyData)
	countyData.forEach(county => {
		const countyId = county.id;
		const countyEducationData = educationData.find(item => item.fips === countyId);
		if (countyEducationData) {
			county.properties.education = countyEducationData.bachelorsOrHigher;
			county.properties.state = countyEducationData.state;
			county.properties.areaName = countyEducationData.area_name;
		}
	});

	// set color scale
	const colorScale = d3.scaleThreshold()
		.domain([3, 12, 21, 30, 39, 48, 57, 66])
		.range(['#f7fcf5', '#e5f5e0', '#c7e9c0', '#a1d99b', '#74c476', '#41ab5d', '#238b45', '#006d2c']);

	// create color groups for the legend
	const colorGroups = colorScale.range().map((color, i) => {
		const min = colorScale.invertExtent(color)[0];
		const max = colorScale.invertExtent(color)[1];
		return { color, min, max };
	  });

	// create legend
	const legendWidth = 300;
	const legendHeight = 10;

	const legend = svg.append("g")
		.attr("id", "legend")
		.attr("transform", `translate(${(width - legendWidth - 20)}, ${margins.bottom - 10})`);

	const legendBar = legend.append("rect")
		.attr("width", legendWidth)
		.attr("height", legendHeight)
		.style("fill", "white")
		.style("stroke", "black");

	const legendScale = d3.scaleLinear()
		.domain([3, 66])
		.range([0, legendWidth]);

	const legendAxis = d3.axisBottom(legendScale)
		.ticks(8)
		.tickSize(10)
		.tickValues([3, 12, 21, 30, 39, 48, 57, 66])
		.tickFormat(d => `${d}%`);

	const legendTicks = legend.append("g")
		.attr("transform", `translate(0, ${legendHeight})`)
		.call(legendAxis)
		.selectAll(".tick text")
		.attr("y", 8);

	const legendColors = legend.append("g")
		.selectAll("rect")
		.data(colorGroups)
		.enter()
		.append("rect")
		.attr("x", d => legendScale(d.min))
		.attr("y", 0)
		.attr("width", d => legendScale(d.max) - legendScale(d.min))
		.attr("height", legendHeight)
		.style("fill", d => d.color);

	// append counties to svg
	svg.append("g")
		.selectAll("path")
		.data(countyData)
		.enter()
		.append("path")
		.attr("class", "county")
		.attr("d", path)
		.attr("data-fips", d => d.id)
		.attr("data-education", d => d.properties.education)
		.attr("fill", d => colorScale(d.properties.education))
		.on("mouseover", (event, d) => {
			tooltip.style("opacity", 1);
			tooltip.html(`${d.properties.areaName}, ${d.properties.state}: ${d.properties.education}%`)
			  	.style("left", `${event.pageX + 10}px`)
			  	.style("top", `${event.pageY - 30}px`)
				.attr("data-education", d.properties.education);
		})			
		.on("mouseout", () => {
			tooltip.style("opacity", 0);
		});

	// append states to svg
	svg.append("g")
		.selectAll("path")
		.data(topojson.feature(counties, counties.objects.states).features)
		.enter()
		.append("path")
		.attr("class", "states")
		.attr("d", path)
		.style("fill", "none")
		.style("stroke", "#fff")
		.style("stroke-width", "1px");
};


const ChoroplethMap = ({ counties, educationData }) => {
    const svgWidth = 960;
    const svgHeight = 600;
    const margins = { top: 20, right: 20, bottom: 50, left: 60 };
    const width = svgWidth - margins.left - margins.right;
    const height = svgHeight - margins.top - margins.bottom;

    React.useEffect(() => {
        createChoroplethMap(counties, educationData, width, height, margins);
    }, [counties, educationData, width, height, margins]);

    return (
        <div id="chomap"></div>
    );
};

  
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);
