import React from 'react'
import ReactDOM from 'react-dom'
import HorizontalBarGraph from './bar_graph.js'
import TrendChart from './trend_chart.js'
import axios from 'axios'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

class GraphForm extends React.Component {
    constructor(props) {
        super(props);
        let raw_check = false;
        if (window.props.raw === '1')
            raw_check = true;
        this.state = {
            keywords: window.props.keywords,
            filters: window.props.filters,
            period: window.props.period,
            raw_bool: raw_check,
            data_component: 'trend_chart',
            graph_data: {
                keywords: window.props.keywords,
                filters: window.props.filters,
                period: window.props.period,
                raw: window.props.raw,
                x: window.props.x,
                y: window.props.y
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.reloadData = this.reloadData.bind(this);
    }


    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        let state_params = this.state;

        state_params[name] = value;
        this.reloadData(state_params);
        if (name !== 'data_component') {
            this.setState({
                [name]: value
            });
        }
    }

    reloadData(state_params) {
        let raw = '0';
        switch (state_params.data_component) {
            case 'trend_chart':
                if (state_params.raw_bool)
                    raw = '1';
                axios.get('/api/trend_data', {
                    responseType: 'json',
                    params: {
                        keywords: state_params.keywords.toString(),
                        filters: state_params.filters.toString(),
                        period: state_params.period,
                        raw: raw,
                    }
                })
                    .then(response => {
                        this.setState({
                            data_component: state_params.data_component,
                            graph_data: response.data
                        });
                    });
                break;
            case 'bar_graph':
                if (state_params.raw_bool)
                    raw = '1';
                axios.get('/api/bar_data', {
                    responseType: 'json',
                    params: {
                        keywords: state_params.keywords.toString(),
                        filters: state_params.filters.toString(),
                        raw: raw,
                    }
                })
                    .then(response => {
                        this.setState({
                            data_component: state_params.data_component,
                            graph_data: response.data
                        });
                    });
                break;
        }
    }

    getDataComponent() {
        switch (this.state.data_component) {
            case 'trend_chart':
                return (<TrendChart data={this.state.graph_data}/>);
            case 'bar_graph':
                return (<HorizontalBarGraph data={this.state.graph_data}/>);
        }
    }

    render() {
        return (
            <div>
                <Select
                    value={this.state.data_component}
                    onChange={this.handleChange}
                    displayEmpty
                    name="data_component"
                >
                    <MenuItem value={'trend_chart'}>Trend Chart</MenuItem>
                    <MenuItem value={'bar_graph'}>Bar Graph</MenuItem>
                </Select>
                <br/>
                <Select
                    value={this.state.period}
                    onChange={this.handleChange}
                    displayEmpty
                    name="period"
                >
                    <MenuItem value={'week'}>Week</MenuItem>
                    <MenuItem value={'month'}>Month</MenuItem>
                    <MenuItem value={'day'}>Day</MenuItem>
                </Select>
                <br/>
                <label>
                    Raw:
                    <input name="raw_bool" type="checkbox" checked={this.state.raw_bool}
                           onChange={this.handleChange}/>
                </label>
                {this.getDataComponent()}
            </div>
        );
    }
}

const App = () => (
    <div>
        <nav>
            <a href="/">Index</a>
        </nav>
        <GraphForm/>
    </div>
);


ReactDOM.render(
    <App/>,
    window.react_mount
);
