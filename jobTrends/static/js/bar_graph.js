import React from 'react';
import {HorizontalBar, Bar} from 'react-chartjs-2';

export default class HorizontalBarGraph extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            chartData:{
                labels: ['Boston', 'New York', 'San Francisco'],
                datasets:[
                    {
                        data:[
                            11111,
                            22222,
                            33333
                        ],
                        backgroundColor:[
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                            'rgba(69, 140, 86, 0.6)',
                            'rgba(255, 206, 86, 0.6)'
                        ]
                    }
                ]
            }
        }
    }
    render(){
        console.log(this.state.chartData);
        return (
            <div className="HorizontalBarGraph">
                <HorizontalBar
                    data={this.state.chartData}
                    options={{
                        maintainAspectRatio: false
                    }}
                />
            </div>
        )
    }
}
