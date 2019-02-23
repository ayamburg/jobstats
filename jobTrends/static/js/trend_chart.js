import React from 'react';
import {Line} from 'react-chartjs-2';

var colorArray = [
    'rgba(255, 99, 132, 0.6)',
    'rgba(54, 162, 235, 0.6)',
    'rgba(255, 206, 86, 0.6)',
    'rgba(190, 100, 150, 0.6)',
    'rgba(178, 120, 100, 0.6)',
    'rgba(64, 250, 20, 0.6)',
    'rgba(4, 0, 140, 0.6)',
    'rgba(0, 0, 0, 0.6)',
    'rgba(30, 251, 255, 0.6)'
];

function colorSelector(colorArray, count) {
    if (count <= 10) {
        return colorArray[count];
    } else {
        return 'rgba(189, 195, 199, 1)';
    }
}

export default class TrendChart extends React.Component {
    render() {
        let traces = [];
        var percentData = [],
            cols = 3;

        //init the grid matrix
        for (var i = 0; i < cols; i++) {
            percentData[i] = [];
        }

        for (let i = 0; i < this.props.data.y.length; i++) {
            for (let j = 0; j < this.props.data.y[i].length; j++) {
                percentData[i][j] = this.props.data.y[i][j] * 100;
            }
        }

        for (let i = 0; i < this.props.data.keywords.length; i++) {
            traces.push({
                data: percentData[i],
                label: this.props.data.keywords[i],
                borderColor: [
                    colorSelector(colorArray, i)
                ],
                fill: false
            });
        }

        this.state = {
            lineData: {
                labels: this.props.data.x[0],
                datasets: traces
            }
        };

        return (
            <div className="TrendChart">
                <Line
                    data={this.state.lineData}
                    options={{
                        maintainAspectRatio: false,
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
                                ticks: {
                                    min: 0,
                                    stepSize: 10,
                                    callback: function (value) {
                                        return value + "%"
                                    }
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: "Percentage"
                                }
                            }]
                        }
                    }}
                />
            </div>
        )
    }
}