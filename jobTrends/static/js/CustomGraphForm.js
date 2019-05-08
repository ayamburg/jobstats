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
import {Typography} from '@material-ui/core';
import InsightCards from './InsightCards.js';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.headers.common = {
  "Content-Type": "application/json"
};

class CustomGraphForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filters: [],
            locations: [],
            companies: [],
            titles: [],
            blacklists: [],
            whitelists: [],
            title: ""
        };
        this.handleArrayChange = this.handleArrayChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleTextChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({[name]: value});
    }

    handleArrayChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value.split(',');
        this.setState({[name]: value});
    }

    handleSubmit() {
        axios.post('custom_tiles', {
            filters: this.state.filters,
            locations: this.state.locations,
            companies: this.state.companies,
            titles: this.state.titles,
            blacklists: this.state.blacklists,
            whitelists: this.state.whitelists,
            title: this.state.title
        }, {
            responseType: 'json'
        }).then(response => {
            if(response.data.success) {
                this.props.history.push('/');
                window.location.reload();
                this.props.history.push('/');
            }else{
                console.log(response);
            }
        });
    }

    render() {
        return (
            <div>
                <div align="center">
                    <Typography align="center" variant="h4">{this.props.title}</Typography>
                </div>
                <form noValidate>
                    <TextField
                        label="Filters"
                        value={this.state.filters}
                        onChange={this.handleArrayChange}
                        margin="normal"
                        variant="outlined"
                        name="filters"
                    />
                    <TextField
                        label="Locations"
                        value={this.state.locations}
                        onChange={this.handleArrayChange}
                        margin="normal"
                        variant="outlined"
                        name="locations"
                    />
                    <TextField
                        label="Companies"
                        value={this.state.companies}
                        onChange={this.handleArrayChange}
                        margin="normal"
                        variant="outlined"
                        name="companies"
                    />
                    <TextField
                        label="Titles"
                        value={this.state.titles}
                        onChange={this.handleArrayChange}
                        margin="normal"
                        variant="outlined"
                        name="titles"
                    />
                    <TextField
                        label="Blacklists"
                        value={this.state.blacklists}
                        onChange={this.handleArrayChange}
                        margin="normal"
                        variant="outlined"
                        name="blacklists"
                    />
                    <TextField
                        label="Whitelists"
                        value={this.state.whitelists}
                        onChange={this.handleArrayChange}
                        margin="normal"
                        variant="outlined"
                        name="whitelists"
                    />
                    <TextField
                        label="Title"
                        value={this.state.title}
                        onChange={this.handleTextChange}
                        margin="normal"
                        variant="outlined"
                        name="title"
                    />
                </form>
                <Button variant="contained" color="primary" size="large" onClick={this.handleSubmit}>
                    Submit
                </Button>
            </div>
        );
    }
}

export default CustomGraphForm;