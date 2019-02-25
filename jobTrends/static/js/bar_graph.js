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
                    displayData[i] = this.props.data.y[i]* 100;
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
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(190, 100, 150, 0.6)',
                        'rgba(178, 120, 100, 0.6)',
                        'rgba(64, 250, 20, 0.6)',
                        'rgba(4, 0, 140, 0.6)',
                        'rgba(0, 0, 0, 0.6)',
                        'rgba(30, 251, 255, 0.6)'
                    ]
                }
            ]
        };
        return (
            <div className="HorizontalBarGraph">
                <HorizontalBar
                    data={bar_data}
                    options={{
                        maintainAspectRatio: false,
                        legend: { display: false },
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