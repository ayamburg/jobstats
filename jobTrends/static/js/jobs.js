import React from 'react'
import BlockCard from './BlockCard';
import RankedList from './RankedList';
import HorizontalBarGraph from './bar_graph.js'
import TrendChart from './trend_chart.js'
import axios from 'axios'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class GraphForm extends React.Component {
    constructor(props) {
        super(props);
        let raw_check = false;
        this.state = {
            keywords: ["Java", "Python"],
            filters: "machine learning",
            period: "week",
            age: "all_time",
            raw_bool: raw_check,
            data_component: 'trend_chart',
            graph_data: {
                keywords: "",
                filters: "",
                period: "week",
                raw: false,
                x: [[]],
                y: [[]]
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.reloadData = this.reloadData.bind(this);
    }

    componentDidMount() {
        this.reloadData(this.state);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        let state_params = this.state;

        state_params[name] = value;
        this.reloadData(state_params);
    }

    reloadData(state_params) {
        let raw = '0';
        let start = -1;
        let week = 604800000;
        let month = 2592000000;
        switch(state_params.age) {
            case 'all_time':
                start = 0;
                break;
            case 'past_week':
                start = Date.now() - week;
                break;
            case 'past_month':
                start = Date.now() - month;
                break;
            case 'past_six_months':
                start = Date.now() - (month * 6);
                break;
        }
        start = Math.floor(start);
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
                        start: start,
                        raw: raw,
                    }
                })
                    .then(response => {
                        this.setState({
                            keywords: state_params.keywords,
                            filters: state_params.filters,
                            period: state_params.period,
                            age: state_params.age,
                            raw_bool: state_params.raw_bool,
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
                        start: start,
                        raw: raw,
                    }
                })
                    .then(response => {
                        this.setState({
                            keywords: state_params.keywords,
                            filters: state_params.filters,
                            period: state_params.period,
                            age: state_params.age,
                            raw_bool: state_params.raw_bool,
                            data_component: state_params.data_component,
                            graph_data: response.data
                        });
                    });
                break;
            case 'list':
                if (state_params.raw_bool)
                    raw = '1';
                axios.get('/api/bar_data', {
                    responseType: 'json',
                    params: {
                        keywords: state_params.keywords.toString(),
                        filters: state_params.filters.toString(),
                        start: start,
                        raw: raw,
                    }
                })
                    .then(response => {
                        this.setState({
                            keywords: state_params.keywords,
                            filters: state_params.filters,
                            period: state_params.period,
                            age: state_params.age,
                            raw_bool: state_params.raw_bool,
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
                return (<BlockCard 
                    payload={<TrendChart data={this.state.graph_data}/>}
                    actions={this.createDropDowns()}/>
                );
            case 'bar_graph':
            return (<BlockCard 
                payload={<HorizontalBarGraph data={this.state.graph_data}/>}
                actions={this.createDropDowns()}/>
            );
            case 'list':
                return (<BlockCard 
                    payload={<RankedList keys={this.state.keywords}/>}
                    actions={this.createDropDowns()}/>
                );
        }
    }

    createDropDowns() {
        let periodButton = null;
        let rawButton = null;
        if(this.state.data_component === 'trend_chart') {
            periodButton = 
            <Grid item xs>
                <Select
                    value={this.state.period}
                    onChange={this.handleChange}
                    displayEmpty
                    name="period"
                >
                    <MenuItem value={'week'}>Weekly</MenuItem>
                    <MenuItem value={'month'}>Monthly</MenuItem>
                    <MenuItem value={'day'}>Daily</MenuItem>
                </Select>
            </Grid>
        }

        if(this.state.data_component === 'trend_chart' || this.state.data_component === 'bar_graph') {
            rawButton =
            <Grid item xs>
            <FormControlLabel
                control={
                    <Checkbox
                        name="raw_bool" 
                        type="checkbox" 
                        checked={this.state.raw_bool}
                        onChange={this.handleChange}
                    />
                }
                label="Raw"
            />
            </Grid>
        }

        return (
            <Grid 
                container 
                spacing={24}
                alignItems="center"
                justify="center"
            >
                <Grid item xs></Grid>
                <Grid item xs>
                    <Select
                        value={this.state.data_component}
                        onChange={this.handleChange}
                        displayEmpty
                        name="data_component"
                    >
                        <MenuItem value={'trend_chart'}>Trend Chart</MenuItem>
                        <MenuItem value={'bar_graph'}>Bar Graph</MenuItem>
                        <MenuItem value={'list'}>List</MenuItem>
                    </Select>
                </Grid>
                {periodButton}
                <Grid item xs>
                    <Select
                        value={this.state.age}
                        onChange={this.handleChange}
                        displayEmpty
                        name="age"
                    >
                        <MenuItem value={'all_time'}>All Time</MenuItem>
                        <MenuItem value={'past_week'}>Past Week</MenuItem>
                        <MenuItem value={'past_month'}>Past Month</MenuItem>
                        <MenuItem value={'past_six_months'}>Past 6 Months</MenuItem>
                    </Select>
                </Grid>
                {rawButton}
                <Grid item xs></Grid>
            </Grid>
        );
    }

    render() {
        return (
            <div>
                <nav>
                    <Link to="/">Index</Link>
                </nav>
                {this.getDataComponent()}
            </div>
        );
    }
}

// const App = () => (
//     <div>
//         <nav>
//             <a href="/">Index</a>
//         </nav>
//         <GraphForm data={window.props}/>
//     </div>
// );


// ReactDOM.render(
//     <App/>,
//     window.react_mount
// );

export default GraphForm;
