import React from 'react'
import ReactDOM from 'react-dom'
import BlockCard from './BlockCard';
import RankedList from './RankedList';
import HorizontalBarGraph from './bar_graph.js'
import TrendChart from './trend_chart.js'
import axios from 'axios'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import DropDown from './DropDown.js';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import SvgIcon from '@material-ui/core/SvgIcon';
import FourKIcon from '@material-ui/icons/FourK';
import TrendingUp from '@material-ui/icons/TrendingUp';
import TrendingDown from '@material-ui/icons/TrendingDown';
import TrendingFlat from '@material-ui/icons/TrendingFlat';
import FiberNew from '@material-ui/icons/FiberNew';
import FindReplace from '@material-ui/icons/FindReplace';
import { Typography } from '@material-ui/core';

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
            age: "all_time",
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
        
        //state_params[age] = Date.now();
        state_params[name] = value;
        this.reloadData(state_params);
    }

    reloadData(state_params) {
        let raw = '0';
        let start = -1;
        let week = 604800;
        let month = 2592000;
        console.log(state_params.age);
        switch(state_params.age) {
            case 'all_time':
                start = 0;
                break;
            case 'past_week':
                start = (Date.now()/1000) - week;
                break;
            case 'past_month':
                start = (Date.now()/1000) - month;
                break;
            case 'past_six_months':
                start = (Date.now()/1000) - (month * 6);
                break;
        }
        start = Math.floor(start);
        var date = new Date(start*1000);
        console.log(date);

        switch (state_params.data_component) {
            case 'trend_chart':
                if (state_params.age == "")
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
                <Grid item xs></Grid>
            </Grid>
        );
    }

    createInsightCards(insightsValue) {

        let genCards = [];
        for (let i = 0; i < insightsValue.length; i++) {
            console.log(insightsValue[i].type)
            let iconType 
                switch (insightsValue[i].type){
                    case 'Up':
                        iconType = <TrendingUp fontSize = "large" nativeColor= "#00e676" />
                        break
                    case 'Down':
                        iconType = <TrendingDown fontSize = "large" nativeColor = "#f44336" />
                        break
                    case 'Flat':
                        iconType = <TrendingFlat fontSize = "large" nativeColor = "#607d8b"/>
                        break
                    case 'New':
                        iconType = <FiberNew fontSize = "large" nativeColor = "#2196f3"/>
                        break
                    case 'Replace':
                        iconType = <FindReplace fontSize = "large" nativeColor = "#ffea00"/>
                        break
                }

            let insightCard =
                    <Grid key={i} item xs={4}>
                        <BlockCard 
                            payload={<Typography align="center" >{insightsValue[i].text} </Typography>}
                            actionsTop={iconType}
                        />
                    </Grid>

            genCards.push(insightCard);
        }

        let insightGrid = 
            <Grid 
                container 
                spacing={24}
                alignItems="center"
                justify="center"
            >
            {genCards}
            </Grid>
        return insightGrid;
    }

    render() {
        let testInsights =
            [
                {text: "React is going up!", type: "Up"},
                {text: "Angular is going down!", type: "Down"},
                {text: "Flutter has entered the top ten!", type: "New"},
                {text: "React has replaced Angular in the top ten list!", type: "Replace"},
                {text: "Python has seen no significant change, however it has remained very popular!", type: "Flat"},
            ]
        return (
            <div>
                <div align="center">
                    <Typography align = "center" variant = "h4">Skeleton Page Title</Typography>
                </div>
                {/* <Select
                    value={this.state.data_component}
                    onChange={this.handleChange}
                    displayEmpty
                    name="data_component"
                >
                    <MenuItem value={'trend_chart'}>Trendz Chart</MenuItem>
                    <MenuItem value={'bar_graph'}>Bar Graph</MenuItem>
                    <MenuItem value={'list'}>List</MenuItem>
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
                </label> */}
                {this.getDataComponent()}

                {this.createInsightCards(testInsights)}

                {/* <Grid 
                container 
                spacing={24}
                alignItems="center"
                justify="center"
            >
                <Grid item xs></Grid>
                <Grid item xs={4}>
                    <BlockCard 
                        payload={"Hello Dylan"}
                    />
                </Grid>
                <Grid item xs={4}>
                    <BlockCard 
                        payload={"Hello Andrey"}
                    />
                </Grid>
                <Grid item xs={4}>
                    <BlockCard 
                        payload={"Hello Chandler"}
                    />
                </Grid>
                <Grid item xs={4}>
                    <BlockCard 
                        payload={"Hello Faisal"}
                    />
                </Grid>
                <Grid item xs={4}>
                <BlockCard
                    payload={<ArrowUpward />}
                />    
                </Grid>
                <Grid item xs></Grid>
            </Grid> */}
            </div>
        );
    }
}

const App = () => (
    <div>
        <nav>
            <a href="/">Index</a>
        </nav>
        <GraphForm data={window.props}/>
    </div>
);


ReactDOM.render(
    <App/>,
    window.react_mount
);
