// GraphForm generates the graphs and insights corresponding to a given data set
// It dynamicly changes the displayed graphic based on the values of the Select components
// It updates the displayed data via api calls made in reloadData()

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
import { Typography } from '@material-ui/core';
import InsightCards from './InsightCards.js';
import MapAndSideBarContainer from './MapAndSideBarContainer.js';
import JobListingTable from './JobListingTable.js';

const listStyle = {
    overflow: 'auto',
    height: '90vh',
}
const style = {
    marginLeft: '2%'
}
const mapStyle = {
}
const innerMapStyle = {
    width: '65vw',
    height: '90vh'
}

class GraphForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keywords: [],
            filters: this.props.filters,
            period: this.props.period,
            age: this.props.age,
            raw_bool: this.props.raw_bool,
            locations: this.props.locations,
            companies: this.props.companies,
            titles: this.props.titles,
            data_component: this.props.data_component,
            insights: [],
            graph_data: {
                keywords: [],
                filters: [],
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
        axios.get('/api/get_json_file', {
            responseType: 'json',
            params: {
                category: "top_skills",
                name: this.props.name,
            }
        }).then(response => {
            let state_params = this.state;
            state_params['keywords'] = response.data.skills.map(skill => skill.key);
            this.reloadData(state_params);
        });
        axios.get('/api/get_json_file', {
            responseType: 'json',
            params: {
                category: "insights",
                name: this.props.name,
            }
        }).then(response => {
            this.setState({insights: response.data.insights});
        });
    }

    // reload data on selector change
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
        switch (state_params.age) {
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
                        locations: state_params.locations.toString(),
                        companies: state_params.companies.toString(),
                        titles: state_params.titles.toString(),
                        start: start,
                        raw: raw,
                    }
                }).then(response => {
                    this.setState({
                        keywords: state_params.keywords,
                        filters: state_params.filters,
                        period: state_params.period,
                        age: state_params.age,
                        raw_bool: state_params.raw_bool,
                        locations: state_params.locations,
                        companies: state_params.companies,
                        titles: state_params.titles,
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
                        locations: state_params.locations.toString(),
                        companies: state_params.companies.toString(),
                        titles: state_params.titles.toString(),
                        start: start,
                        raw: raw,
                    }
                }).then(response => {
                    this.setState({
                        keywords: state_params.keywords,
                        filters: state_params.filters,
                        period: state_params.period,
                        age: state_params.age,
                        raw_bool: state_params.raw_bool,
                        locations: state_params.locations,
                        companies: state_params.companies,
                        titles: state_params.titles,
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
                        locations: state_params.locations.toString(),
                        companies: state_params.companies.toString(),
                        titles: state_params.titles.toString(),
                        start: start,
                        raw: raw,
                    }
                }).then(response => {
                    function compare_keywords(a,b) {
                        let a_index = response.data.keywords.indexOf(a);
                        let b_index = response.data.keywords.indexOf(b);
                        if (response.data.y[a_index] < response.data.y[b_index])
                            return -1;
                        if (response.data.y[b_index] < response.data.y[a_index])
                            return 1;
                        return 0;
                    }
                    response.data.keywords.sort(compare_keywords).reverse();
                    response.data.y.sort().reverse();
                    this.setState({
                        keywords: state_params.keywords,
                        filters: state_params.filters,
                        period: state_params.period,
                        age: state_params.age,
                        raw_bool: state_params.raw_bool,
                        locations: state_params.locations,
                        companies: state_params.companies,
                        titles: state_params.titles,
                        data_component: state_params.data_component,
                        graph_data: response.data
                    });
                });
                break;
             case 'map':    
                    this.setState({
                        data_component: state_params.data_component
                    });
                    break;
        }
    }
    
    // display jsx for apropriate graphic type
    getDataComponent() {
        // array empty or does not exist
        console.log(this.state.data_component)
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
                        payload={<RankedList keys={this.state.graph_data.keywords}/>}
                        actions={this.createDropDowns()}/>
                );
            case 'map':
                return(
                    <BlockCard
                        payload={<MapAndSideBarContainer 
                            style_prop={ style } 
                            list_style_prop={ listStyle} 
                            map_style_prop={ mapStyle } 
                            inner_map_style_prop={ innerMapStyle }
                            Top_locations_filters={ this.state.filters }
                            Top_locations_companies={ this.state.companies }
                            Top_locations_titles={ this.state.titles }
                            />
                        }
                        actions={this.createDropDowns()}/>
                    
                );
        }
    }

    // render the ui
    createDropDowns() {
        let periodButton = null;
        let rawButton = null;
        if (this.state.data_component === 'trend_chart') {
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

        if (this.state.data_component === 'trend_chart' || this.state.data_component === 'bar_graph') {
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
                spacing={16}
                alignItems="flex-start"
                justify="flex-start"
            >
                <Grid item xs></Grid>
                <Grid item xs={4}>
                    <Select
                        value={this.state.data_component}
                        onChange={this.handleChange}
                        displayEmpty
                        name="data_component"
                    >
                        <MenuItem value={'trend_chart'}>Trend Chart</MenuItem>
                        <MenuItem value={'bar_graph'}>Bar Graph</MenuItem>
                        <MenuItem value={'list'}>List</MenuItem>
                        <MenuItem value={'map'}>Map</MenuItem>
                    </Select>
                </Grid>
                {periodButton}
                <Grid item xs={4}>
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
                <div align="center">
                    <Typography paragraph></Typography>
                    <Typography paragraph align = "center" variant = "h4">{this.props.title}</Typography>
                </div>
                {this.getDataComponent()}
            
                <InsightCards InsightsValues={this.state.insights}/>
                <BlockCard payload={<JobListingTable
                    job_listings_filters={this.state.filters}
                    job_listings_companies={this.state.companies}
                    job_listings_titles={this.state.titles}
                    job_listings_locations={this.state.locations}
                />}/>
            </div>
        );
    }
}

export default GraphForm;
