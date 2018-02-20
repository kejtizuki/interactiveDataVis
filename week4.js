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

    console.log("men year ", minMenYear, maxMenYear)
    console.log("men time ", minMenTime, maxMenTime)
    console.log("women year ", minWomenYear, maxWomenYear)
    console.log("women time ", minWomenTime, maxWomenTime)

    var xScale = d3.scaleLinear()
      .domain([minMenYear, maxMenYear])
      .range([0, width])

    var yScale = d3.scaleLinear()
      .domain([minMenTime, maxWomenTime])
      .range([height, 0])

    var xAxis = d3.axisBottom(xScale).ticks(6),
        yAxis = d3.axisLeft(yScale);

    svgChart.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    svgChart.append("g")
      .attr("class", "axis")
      .call(yAxis);

    svgChart.selectAll(".men.dot")
     .data(menOpenData)
     .enter().append("circle")
     .attr("class", "dot")
     .attr("r", 2)
     .attr("cx", function(d) {
       return xScale(d.Year);
     })
     .attr("cy", function(d) {
       return yScale(d.Time);
     });

    svgChart.selectAll(".women.dot")
      .data(womenOpenData)
      .enter().append("circle")
      .attr("class", "dot")
      .style("fill", "pink")
      .attr("r", 2)
      .attr("cx", function(d) {
        return xScale(d.Year);
      })
      .attr("cy", function(d) {
        return yScale(d.Time);
      });


    console.log(menOpenData[0])

  });
});
