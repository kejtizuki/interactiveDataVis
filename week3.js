var w = 500, h = 300, padding = 30;

// var datasetScatter = [ [5,20], [480,90], [250,50], [100,33], [330,95],
//                 [410,12], [475,44], [25,67], [85,21], [220, 80], [600, 150]];

var datasetScatter = [];
var numDataPoints = 50;
var xRange = Math.random() * 1000;
var yRange = Math.random() * 1000;
for (var i = 0; i < numDataPoints; i++) {
  var newNumber1 = Math.floor(Math.random() * xRange);
  var newNumber2 = Math.floor(Math.random() * yRange);
  datasetScatter.push([newNumber1, newNumber2]);
}

var svgScatter = d3.select("body").select("#content3").select(".part1").select(".scatterplot").append("svg")
    .attr("width", w + 200)
    .attr("height", h);

//SCALES FROM WEEK 3
var xScale = d3.scaleLinear()
  .domain([0, d3.max(datasetScatter, function(d) { return d[0]; })])
  .range([padding, w - padding]);

var yScale = d3.scaleLinear()
  .domain([0, d3.max(datasetScatter, function(d) { return d[1]; })])
  .range([h - padding, padding * 2])

var rScale = d3.scaleLinear()
  .domain([0, d3.max(datasetScatter, function(d) { return d[1]; })])
  .range([2, 5]);

var aScale = d3.scaleSqrt()
  .domain([0, d3.max(datasetScatter, function(d) { return d[1]; })])
  .range([0, 10]);

var xAxis = d3.axisBottom(xScale);
var yAxis = d3.axisLeft(yScale);

svgScatter.selectAll("circle")
  .data(datasetScatter)
  .enter()
  .append("circle")
  .attr("cx", function(d) {
    return xScale(d[0]);
  })
  .attr("cy", function(d) {
    return yScale(d[1]);
  })
  .attr("r", 5)
  .attr("r", function(d) {
    return aScale(d[1]);
  });


// svgScatter.selectAll("text")
//   .data(datasetScatter)
//   .enter()
//   .append("text")
//   .text(function(d) {
//     return d[0] + "," + d[1];
//   })
//   .attr("x", function(d) {
//     return xScale(d[0]);
//   })
//   .attr("y", function(d) {
//     return yScale(d[1]);
//   })
//   .attr("font-family", "sans-serif")
//   .attr("font-size", "11px")
//   .attr("fill", "#5BAAD6");

svgScatter.append("g")
  .attr("class", "axis")
  .attr("transform", "translate(0," + (h - padding) + ")")
  .call(xAxis);

svgScatter.append("g")
  .attr("class", "axis")
  .attr("transform", "translate(" + padding + ",0)")
  .call(yAxis);

var w = 600, h = 250;

var svgBar = d3.select("body").select("#content3").select(".part1").select(".barChart").append("svg")
  .attr("width", w)
  .attr("height", h);

var xScaleBar = d3.scaleBand()
  .domain(d3.range(dataset.length))
  .range([0, w])
  .paddingInner(0.05);

svgBar.selectAll("rect")
   .data(dataset)
   .enter()
   .append("rect")
   .attr("x", function(d, i) {
     return i * (w / dataset.length);
   })
   .attr("y", function(d) {
     return h - (d*4);
   })
   .attr("height", function(d) {
     return d * 4;
   })
   .attr("width", w / dataset.length - barPadding)
   .attr("fill", function(d) {
     return "rgb(0,0, "+ Math.round(d*10) +")";
   });

svgBar.selectAll("text")
   .data(dataset)
   .enter()
   .append("text")
   .text(function(d) {
     return d;
   })
   .attr("x", function(d, i) {
     return i * (w / dataset.length) + (w/dataset.length - barPadding) / 2;
   })
   .attr("y", function(d) {
     return h - (d*4) + 14;
   })
   .attr("font-family", "sans-serif")
   .attr("font-size", "11px")
   .attr("fill", "white")
   .attr("text-anchor", "middle");
