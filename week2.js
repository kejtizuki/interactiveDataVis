d3.csv("/data/basicDataWeek2.csv", function(data) {
  console.log(data[0]);
  d3.select("#content2").select(".part2").selectAll("p")
    .data(data)
    .enter()
    .append("p")
    .text(function(d) {
      return "I can count up to " + d.Data;
    })
});

//Basic Bar Chart
// var dataset=[25,7,5,26,11,8,25,14,23,19,14, 11, 22, 29, 11, 13, 12, 17, 18, 10,24,18,25,9,3];
// var dataset = [];
// for (var i = 0; i < 25; i++) {
//   var newNumber = Math.random() * 30;
//   dataset.push(newNumber);
// }
var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13, 11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];

var basicData = [5,10,15,20,25];

d3.select("body").select(".part3").select(".barChart").selectAll("div")
  .data(dataset)
  .enter()
  .append("div")
  .attr("class", "bar")
  .style("height", function(d) {
    var barHeight = d * 5;
    return barHeight + "px";
  });

//CIRCLES
var w = 500;
var h = 110;
var barPadding = 1;

var svg = d3.select("body").select(".part3").select(".circles").append("svg")
  .attr("width", w)
  .attr("height", h);

var circles = svg.selectAll("circle")
  .data(basicData)
  .enter()
  .append("circle");

circles.attr("cx", function(d, i) {
    return (i * 50) + 25;
  })
  .attr("cy", h/2)
  .attr("r", function(d) {
    return d;
  })
  .attr("fill", "#f4f756")
  .attr("stroke", "#d2f287")
  .attr("stroke-width", function(d) {
    return d/2;
  });

//Nice bar chart

var svgSecond = d3.select("body").select(".part3").select(".niceBarChart").append("svg")
  .attr("width", w)
  .attr("height", h);

svgSecond.selectAll("rect")
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
     console.log(d*2)
     return d * 4;
   })
   .attr("width", w / dataset.length - barPadding)
   .attr("fill", function(d) {
     return "rgb(0,0, "+ Math.round(d*10) +")";
   });

svgSecond.selectAll("text")
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

//Scatterplot
var datasetScatter = [ [5,20], [480,90], [250,50], [100,33], [330,95],
                [410,12], [475,44], [25,67], [85,21], [220, 80]];

var svgScatter = d3.select("body").select(".part3").select(".scatterplot").append("svg")
    .attr("width", w + 200)
    .attr("height", h);

svgScatter.selectAll("circle")
  .data(datasetScatter)
  .enter()
  .append("circle")
  .attr("cx", function(d) {
    return d[0];
  })
  .attr("cy", function(d) {
    return d[1];
  })
  .attr("r", 5)
  .attr("r", function(d) {
    return Math.sqrt((h - d[1]));
  });


svgScatter.selectAll("text")
  .data(datasetScatter)
  .enter()
  .append("text")
  .text(function(d) {
    return d[0] + "," + d[1];
  })
  .attr("x", function(d) {
    return d[0];
  })
  .attr("y", function(d) {
    return d[1];
  })
  .attr("font-family", "sans-serif")
  .attr("font-size", "11px")
  .attr("fill", "#5BAAD6");
