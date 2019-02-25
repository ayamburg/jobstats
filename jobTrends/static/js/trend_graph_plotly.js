import React from 'react'
import Plot from 'react-plotly.js'

export default class TrendGraph extends React.Component {
    render() {
        let traces = [];
        let max_percent = 0;

        //Create traces from data
        for (let i = 0; i < this.props.data.keywords.length; i++) {
            let current_max_percent = Math.max.apply(Math, this.props.data.y[i]);
            if (current_max_percent > max_percent)
                max_percent = current_max_percent;
            traces.push({
                x: this.props.data.x[i],
                y: this.props.data.y[i],
                name: this.props.data.keywords[i],
                mode: 'lines+markers',
            })
        }

        // display raw data if requested
        let y_settings = {};
        if (this.props.data.raw !== '1')
            y_settings = {tickformat: ".2%", range: [0, max_percent + 0.03]};

        // plotly settings
        let x_settings = {
            type: 'date'
        };
        let button_config = {
            displaylogo: false,
            modeBarButtonsToRemove: [
                'sendDataToCloud',
                'zoomOut2d',
                'zoomIn2d',
                'zoom2d',
                'select2d',
                'lasso2d',
                'autoScale2d']
        };
        let layout = {showlegend: true, yaxis: y_settings, xaxis: x_settings};

        //Plot graph
        return (
            <Plot
                data={traces}
                layout={layout}
                config={button_config}
            />
        );
    }
}