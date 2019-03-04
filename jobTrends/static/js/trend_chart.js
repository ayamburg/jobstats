import React from 'react';
import {Line} from 'react-chartjs-2';
import {Tooltip} from '@material-ui/core';

var colorArray = [
    'rgba(255, 99, 132, 0.9)',
    'rgba(54, 162, 235, 0.9)',
    'rgba(255, 206, 86, 0.9)',
    'rgba(190, 100, 150, 0.9)',
    'rgba(178, 120, 100, 0.9)',
    'rgba(64, 250, 20, 0.9)',
    'rgba(4, 0, 140, 0.9)',
    'rgba(0, 0, 0, 0.9)',
    'rgba(30, 251, 255, 0.9)'
];

function colorSelector(colorArray, count) {
    if (count <= 10) {
        return colorArray[count];
    } else {
        return 'rgba(189, 195, 199, 0.9)';
    }
}

export default class TrendChart extends React.Component {
    render() {
        let traces = [];
        var percentData = [],
            cols = 3;

        var dateLabels = [];
        //init the grid matrix
        for (var i = 0; i < cols; i++) {
            percentData[i] = [];
            dateLabels[i] = [];
        }

        let ticks = {};
        let scaleLabel = {};

        for (let i = 0; i < this.props.data.x.length; i++) {
            for (let j = 0; j < this.props.data.x[i].length; j++) {
                dateLabels[i][j] = this.props.data.x[i][j].slice(0, 10);
            }
        }

        if (this.props.data.raw !== '1') {
            for (let i = 0; i < this.props.data.y.length; i++) {
                for (let j = 0; j < this.props.data.y[i].length; j++) {
                    percentData[i][j] = (this.props.data.y[i][j] * 100).toFixed(2);
                }
            }

            for (let i = 0; i < this.props.data.keywords.length; i++) {
                traces.push({
                    data: percentData[i],
                    label: this.props.data.keywords[i],
                    borderColor: [
                        colorSelector(colorArray, i)
                    ],
                    backgroundColor: [
                        colorSelector(colorArray, i)
                    ],
                    pointHoverBackgroundColor: 'rgba(64, 64, 64, 0.6)',
                    pointHoverBorderColor: 'rgba(64, 64, 64, 0.6)',
                    fill: false

                });

            }
            ticks = {
                min: 0,
                stepSize: 10,
                callback: function (value) {
                    return value + "%"
                }
            };
            scaleLabel = {
                display: true,
                labelString: "Percent of Listings"
            }
        } else if (this.props.data.raw === '1') {
            for (let i = 0; i < this.props.data.keywords.length; i++) {
                traces.push({
                    data: this.props.data.y[i],
                    label: this.props.data.keywords[i],
                    borderColor: [
                        colorSelector(colorArray, i)
                    ],
                    backgroundColor: [
                        colorSelector(colorArray, i)
                    ],
                    pointHoverBackgroundColor: 'rgba(64, 64, 64, 0.6)',
                    pointHoverBorderColor: 'rgba(64, 64, 64, 0.6)',
                    fill: false
                });
            }
            ticks = {
                min: 0,
                stepSize: 0,
                callback: function (value) {
                    return value
                }
            };
            scaleLabel = {
                display: true,
                labelString: "Number of Listings"
            }
        }

        this.state = {
            lineData: {
                labels: dateLabels[0],
                datasets: traces
            }
        };

        return (
            <div className="TrendChart">
                <Line
                    data={this.state.lineData}
                    options={{
                        maintainAspectRatio: true,
                        responsive: true,
                        tooltips: {
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            borderColor: 'rgba(0, 0, 0, 0.9)',
                            borderWidth: '1',
                            titleFontColor: '#000',
                            bodyFontColor: '#000'
                        },
                        scales: {
                            xAxes: [{
                                type: 'time',
                                time: {
                                    unit: this.state.period
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: "Dates"
                                }
                            }],
                            yAxes: [{
                                ticks: ticks,
                                scaleLabel: scaleLabel
                            }]
                        }
                    }}
                />
            </div>
        )
    }
}