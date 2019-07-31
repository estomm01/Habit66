import React, { Component } from 'react';
import CanvasJSReact from "../../canvasjs.react.js";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class Charts extends Component {






	render() {

		const options = {
			title: {
				text: "Your Habits Progress"
			},
			toolTip: {
				shared: true
			 },
			//   legend: {
			// 	verticalAlign: "top"
			// },
			axisY: {
        suffix: "%",
        maximum: 100
			},
			data: [{
        type: "bar",
				color: "#17223b",
				name: "Habits",
				showInLegend: true,
				indexLabel: "{y}",
				indexLabelFontColor: "white",
				yValueFormatString: "#,###'%'",
        dataPoints:
          this.props.habits.map(habit => (
           { label: habit.name, y: habit.dayStreak.length }
          ))

       }]
		 }
		return (
		<div>
			<CanvasJSChart options = {options}
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}
export default Charts;
