function convertToMinutes(strTime) {
  var arrayTime = strTime.split(":");
  var hours = parseInt(arrayTime[0]);
  var minutes = parseInt(arrayTime[1]);
  var seconds = parseInt(arrayTime[2]);
  return hours * 60 + minutes + seconds/60
}

var margin = {top: 20, right: 20, bottom: 50, left: 70},
    width = 700 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var svgChart = d3.select("body").select("#content4").select(".chartManWoman").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

console.log(convertToMinutes("2:55:10"))

//Square symbol to show men
var symbol = d3.symbol()
  .type(d3.symbolSquare)
  .size(30);

//This function is called as default (at the beginning) and than on click on button
//"All"
function createGraphAll() {
  d3.csv("data/menOpen.csv", function(error1, menOpenData) {
    d3.csv("data/womenOpen.csv", function(error2, womenOpenData) {

      menOpenData.forEach(function(d) {
        d.Time = convertToMinutes(d.Time)
        d.Year = d.Year
      })

      womenOpenData.forEach(function(d) {
        d.Time = convertToMinutes(d.Time)
        d.Year = d.Year
      })

      var minMenYear = d3.min(menOpenData, function(d) {return d.Year;});
      var maxMenYear = d3.max(menOpenData, function(d) { return d.Year; })

      var minWomenYear = d3.min(womenOpenData, function(d) {return d.Year;});
      var maxWomenYear = d3.max(womenOpenData, function(d) { return d.Year; })

      var minMenTime = d3.min(menOpenData, function(d) {return d.Time;});
      var maxMenTime = d3.max(menOpenData, function(d) {return d.Time;});

      var minWomenTime = d3.min(womenOpenData, function(d) {return d.Time;});
      var maxWomenTime = d3.max(womenOpenData, function(d) { return d.Time; })

      var xScale = d3.scaleLinear()
        .domain([minMenYear, maxMenYear])
        .range([0, width])

      var yScale = d3.scaleLinear()
        .domain([minMenTime, maxWomenTime])
        .range([height, 0])

      var xAxis = d3.axisBottom(xScale).ticks(6),
          yAxis = d3.axisLeft(yScale);

      //Remove axis to assign new axis when press on button "All"
      //we should change this to update instead of removing but idk how
      svgChart.select(".x.axis")
        .remove()

      svgChart.select(".y.axis")
        .remove()

      svgChart.selectAll(".women")
        .remove()

      svgChart.selectAll(".men")
        .remove()

      //Transition should work as update but it'd not working :(
      svgChart.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .transition()
        .duration(1000)
        .call(xAxis);

      svgChart.append("g")
        .attr("class", "y axis")
        .transition()
        .duration(1000)
        .call(yAxis);

      //Path is requored to use symbols
      svgChart.selectAll(".men.dot")
        .data(menOpenData)
        .enter().append("path")
        .transition()
        .duration(1000)
        .attr("class", "dot men")
        .style("stroke", "#515151")
        .style("fill", "white")
        .attr("transform", function(d) { return "translate(" + xScale(d.Year) + "," + yScale(d.Time) + ")"; })
        .attr("d", symbol);

      svgChart.selectAll(".women.dot")
        .data(womenOpenData)
        .enter().append("circle")
        .transition()
        .duration(1000)
        .attr("class", "dot women")
        .style("stroke", "#515151")
        .style("fill", "white")
        .attr("r", 2)
        .attr("cx", function(d) {
          return xScale(d.Year);
        })
        .attr("cy", function(d) {
          return yScale(d.Time);
        });

      //Connect the dots with line
      var valueline = d3.line()
        .x(function(d) { return xScale(d.Year); })
        .y(function(d) { return yScale(d.Time); });

      // svgChart.append("path")
      //   .datum(womenOpenData)
      //   .attr("class", "line")
      //   .attr("d", valueline);


      console.log(menOpenData[0])

    });
  });
}

//on enter create default graph for both datasets
createGraphAll()


function createPlot(whichAxisX, whichAxisY, whichScaleX, whichScaleY, whichData, whichToHide) {
  svgChart.select(".x.axis")
    .transition()
    .duration(1000)
    .call(whichAxisX);

  svgChart.select(".y.axis")
    .transition()
    .duration(1000)
    .call(whichAxisY);

  if (whichToHide === ".men") {
    svgChart.selectAll(".women")
      .remove()

    svgChart.selectAll(whichToHide)
      .remove()

    svgChart.selectAll("circle")
      .data(whichData)
      .enter().append("circle")
      .attr("class", "dot women")
      .style("stroke", "#515151")
      .style("fill", "white")
      .transition()
      .duration(1000)
      .attr("r", 2)
      .attr("cx", function(d) {
        return whichScaleX(d.Year);
      })
      .attr("cy", function(d) {
        return whichScaleY(d.Time);
      })
      .delay(function(d, i) {
        return i / whichData.length * 500;  // Dynamic delay (i.e. each item delays a little longer)
      });
  }

  if (whichToHide === ".women") {

    svgChart.selectAll(".men")
      .remove()

    svgChart.selectAll(whichToHide)
      .remove()

    svgChart.selectAll(".men.dot")
      .data(whichData)
      .enter().append("path")
      .attr("class", "dot men")
      .style("stroke", "#515151")
      .style("fill", "white")
      .transition()
      .duration(1000)
      .attr("transform", function(d) { return "translate(" + whichScaleX(d.Year) + "," + whichScaleY(d.Time) + ")"; })
      .attr("d", symbol);
  }

}

function updateChart(whichToHide) {
  d3.csv("data/menOpen.csv", function(error1, menOpenData) {
    d3.csv("data/womenOpen.csv", function(error2, womenOpenData) {
      menOpenData.forEach(function(d) {
        d.Time = convertToMinutes(d.Time)
        d.Year = d.Year
      })

      womenOpenData.forEach(function(d) {
        d.Time = convertToMinutes(d.Time)
        d.Year = d.Year
      })

      var minMenYear = d3.min(menOpenData, function(d) {return d.Year;});
      var maxMenYear = d3.max(menOpenData, function(d) { return d.Year; })

      var minWomenYear = d3.min(womenOpenData, function(d) {return d.Year;});
      var maxWomenYear = d3.max(womenOpenData, function(d) { return d.Year; })

      var minMenTime = d3.min(menOpenData, function(d) {return d.Time;});
      var maxMenTime = d3.max(menOpenData, function(d) {return d.Time;});

      var minWomenTime = d3.min(womenOpenData, function(d) {return d.Time;});
      var maxWomenTime = d3.max(womenOpenData, function(d) { return d.Time; })

      var womenXscale = d3.scaleLinear()
        .domain([minWomenYear, maxWomenYear])
        .range([0, width])

      var menXscale = d3.scaleLinear()
        .domain([minMenYear, maxMenYear])
        .range([0, width])

      var womenYscale = d3.scaleLinear()
        .domain([minWomenTime, maxWomenTime])
        .range([height, 0])

      var menYscale = d3.scaleLinear()
        .domain([minMenTime, maxMenTime])
        .range([height, 0])

      var womenXAxis = d3.axisBottom(womenXscale).ticks(6),
          womenYAxis = d3.axisLeft(womenYscale);

      var menXAxis = d3.axisBottom(menXscale).ticks(6),
          menYAxis = d3.axisLeft(menYscale);

      if (whichToHide === ".men") {
        createPlot(womenXAxis, womenYAxis, womenXscale, womenYscale, womenOpenData, whichToHide)
      }
      if (whichToHide === ".women") {
        createPlot(menXAxis, menYAxis, menXscale, menYscale, menOpenData, whichToHide)
      }

    });
  });
}

d3.select("#allData")
	.on("click", function() {
		createGraphAll()
	});

d3.select("#menData")
	.on("click", function() {
		updateChart(".women")
	});

d3.select("#womenData")
	.on("click", function() {
		updateChart(".men")
	});
