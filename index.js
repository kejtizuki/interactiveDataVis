var dataset = [ 5, 10, 15, 20, 25 ];
var rectangles = [
    { "x": "20", "y":"100", "width":"80", "height": "80", "color" : "purple" },
    { "x": "60", "y":"80", "width":"80", "height": "80", "color" : "blue"},
    { "x": "100", "y":"60", "width":"80", "height": "80", "color" : "green"},
    { "x": "140", "y":"40", "width":"80", "height": "80", "color" : "yellow"},
    { "x": "180", "y":"20", "width":"80", "height": "80", "color" : "red"}];

d3.select("body").selectAll("p")
 .data(dataset)
 .enter()
 .append("p")
 .text(function(d) {
   return "I can count up to " + d;
 })
 .style("color", function(d) {
   if (d > 15) { //Threshold of 15
     return "red";
   } else {
     return "black";
   }
});

var mySvg = d3.select("body")
  .append("svg")
  .attr("width", 600)
  .attr("height", 600);

var rects = mySvg.selectAll("rect")
  .data(rectangles)
  .enter()
  .append("rect");

var attributes = rects
  .attr("x", function (d) { return d.x; })
  .attr("y", function (d) { return d.y; })
  .attr("width", function (d) { return d.width; })
  .attr("height", function(d) { return d.height; })
  .attr("stroke", "grey")
  .attr("stroke-width", 2)
  .attr("opacity", function(d) {return d.y * 0.015})
  .style("fill", function(d) { return d.color; });
