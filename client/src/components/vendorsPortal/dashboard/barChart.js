import React, {Component} from 'react';
import * as d3 from "d3";

class BarChart extends Component {
    componentDidMount() {
      this.drawChart();
    }
      
    drawChart() {
      const data = [12, 5, 6, 6, 9, 10];
      
      const svg = d3.select("body")
      .append("svg")
      .attr("width", "fit-content")
      .attr("height", 111)
      .style("position","absolute")
      .style("bottom","1em")
      
     
                    
      svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d, i) => i * 70)
        .attr("y", (d, i) => 111 - 10 * d)
        .attr("width", 65)
        .attr("height", (d, i) => d * 21)
        .attr("fill", "blue")
    }
          
    render(){
        console.log(this.props);
      return <div ></div>
    }
  }
      
  export default BarChart;