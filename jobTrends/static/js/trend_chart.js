import React from 'react';
import {Line} from 'react-chartjs-2';

export default class TrendChart extends React.Component{
    constructor(props){
        super(props);
        let traces = [];
        for (let i = 0; i < this.props.data.y.length; i++)
        {
            for(let j = 0; j < this.props.data.y[i].length; j++){
                this.props.data.y[i][j]= this.props.data.y[i][j] * 100;
            }
        }
        for (let i = 0; i < this.props.data.keywords.length; i++) {
            traces.push({
                data: this.props.data.y[i],
                label: this.props.data.keywords[i],
                borderColor: "#3e95cd",
                fill: false
            })
        }
        this.state = {
            lineData: {
                labels: this.props.data.x[0],
                datasets: traces
            }
        }
    }
    render(){
        console.log(this.state.lineData);
        return (
            <div className="TrendChart">
                <Line
                    data={this.state.lineData}
                    options={{
                        maintainAspectRatio: false,
                        scales:{
                            xAxes:[{
                                type: 'time',
                                time: {
                                    unit: 'week'
                                }
                            }],
                            yAxes: [{
                                ticks: {
                                    min: 0,
                                    stepSize: 10,
                                    callback: function(value) {
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