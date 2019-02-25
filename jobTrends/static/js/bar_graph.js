import React from 'react';
import {HorizontalBar, Bar} from 'react-chartjs-2';

export default class HorizontalBarGraph extends React.Component {
    render() {
        var displayData = this.props.data.y
        let ticks = {
            min: 0
        }

        if (this.props.data.raw !== '1')
        {
            for (let i = 0; i < this.props.data.y.length; i++) 
            {
                    displayData[i] = (this.props.data.y[i]* 100).toFixed(2);
            }
            ticks = {
                min: 0,
                stepSize: 10,
                callback: function (value) {
                    return value + "%"
                }
            }
        }

        let bar_data = {
            labels: this.props.data.keywords,
            datasets: [
                {
                    data: displayData,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(190, 100, 150, 0.2)',
                        'rgba(178, 120, 100, 0.2)',
                        'rgba(64, 250, 20, 0.2)',
                        'rgba(4, 0, 140, 0.2)',
                        'rgba(0, 0, 0, 0.2)',
                        'rgba(30, 251, 255, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(190, 100, 150, 1)',
                        'rgba(178, 120, 100, 1)',
                        'rgba(64, 250, 20, 1)',
                        'rgba(4, 0, 140, 1)',
                        'rgba(0, 0, 0, 1)',
                        'rgba(30, 251, 255, 1)'
                    ],
                    borderWidth: '1.5'
                }
            ]
        };
        return (
            <div className="HorizontalBarGraph">
                <HorizontalBar
                    data={bar_data}
                    options={{
                        legend: { display: false },
                        tooltips: {
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            borderColor: 'rgba(0, 0, 0, 0.9)',
                            borderWidth: '1',
                            titleFontColor: '#000',
                            bodyFontColor: '#000'
                        },
                        scales: {
                            xAxes: [{
                                ticks: ticks,
                                scaleLabel: {
                                    display: true
                                }
                            }]
                        }
                    }}
                />
            </div>
        )
    }
}