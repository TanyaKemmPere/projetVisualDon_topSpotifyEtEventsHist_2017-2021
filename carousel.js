import * as d3 from 'd3';
import { json } from 'd3-fetch'

var width = 4000,
height = 200,
margin = 2,
nRect = 20,
rectWidth = (width - (nRect - 1) * margin) / nRect,
svg = d3.select('#chart').append('svg')
    .attr('width', width)
    .attr('height', height);

var data = d3.range(nRect),
posScale = d3.scale.linear()
    .domain(d3.extent(data))
    .range([0, width - rectWidth]);

svg.selectAll('rect')
    .data(data)
   .enter()
    .append('rect')
    .attr('x', posScale)
    .attr('width', rectWidth)
    .attr('height', height);