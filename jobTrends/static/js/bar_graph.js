import React from 'react';
import {HorizontalBar, Bar} from 'react-chartjs-2';


export default class HorizontalBarGraph extends React.Component {
    render() {
        let bar_data = {
            labels: this.props.data.keywords,
            datasets: [
                {
                    data: this.props.data.y,
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
                        maintainAspectRatio: false
                    }}
                />
            </div>
        )
    }
}