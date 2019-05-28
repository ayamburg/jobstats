import React from 'react'
import BlockCard from './BlockCard';
import DynamicForm from './DynamicForm';
import RankedList from './RankedList';
import HorizontalBarGraph from './bar_graph.js'
import TrendChart from './trend_chart.js'
import axios from 'axios'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {Typography, CardActions} from '@material-ui/core';
import InsightCards from './InsightCards.js';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import Card from '@material-ui/core/Card';
import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile,
    isMobileOnly
  } from "react-device-detect";

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.headers.common = {
    "Content-Type": "application/json"
};

var cardStyle = {
    display: 'block',
    justifyContent: 'center',
    justify: 'center',
    width: '65vw',
    transitionDuration: '0.3s',
}

const TextStyle = {
    marginLeft: '2vw',
}

class EditForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filtersField: "",
            locationsField: "",
            companiesField: "",
            jobTitlesField: "",
            filters: this.props.filters,
            locations: this.props.locations,
            companies: this.props.companies,
            jobTitles: this.props.titles,
            title: this.props.title,
            name: this.props.name,
        };
        this.handleArrayChange = this.handleArrayChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
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

    handleUpdate() {
        axios.put('custom_tiles', {
            filters: this.state.filters,
            locations: this.state.locations,
            companies: this.state.companies,
            titles: this.state.titles,
            blacklists: this.state.blacklists,
            whitelists: this.state.whitelists,
            title: this.state.title,
            name: this.state.name
        }, {
            responseType: 'json'
        }).then(response => {
            if (response.data.success) {
                this.props.history.push('/');
                window.location.reload();
                this.props.history.push('/');
            } else {
                console.log(response);
            }
        });
    }

    handleDelete() {
        axios.delete('custom_tiles', {
            data: {name: this.state.name}
        }).then(response => {
            if (response.data.success) {
                this.props.history.push('/');
                window.location.reload();
                this.props.history.push('/');
            } else {
                console.log(response);
            }
        });
    }

    render() {
    if(isMobileOnly){
        return (
            <div>
                <div align="center">
                    <Typography align="center" variant="h4">{this.props.title}</Typography>
                </div>
                <form noValidate>
                <Grid
                container
                justify = 'center'
                    alignContent='center'
                >
                <Grid item xs={12}>
                    <TextField
                        label="Title"
                        value={this.state.title}
                        onChange={this.handleTextChange}
                        margin="normal"
                        variant="outlined"
                        name="title"
                    />
                </Grid>
                <Grid item xs={12}>
                    <DynamicForm
                        style={TextStyle}
                        label="Filter by Keyword"
                        value={this.state.filters}
                        onChange={this.handleArrayChange}
                        margin="normal"
                        variant="outlined"
                        name="filters"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Locations"
                        value={this.state.locations}
                        onChange={this.handleArrayChange}
                        margin="normal"
                        variant="outlined"
                        name="locations"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Companies"
                        value={this.state.companies}
                        onChange={this.handleArrayChange}
                        margin="normal"
                        variant="outlined"
                        name="companies"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Titles"
                        value={this.state.titles}
                        onChange={this.handleArrayChange}
                        margin="normal"
                        variant="outlined"
                        name="titles"
                    />
                </Grid>
                <CardActions style={{justifyContent: 'center'}}>
                <Button justify = "right" variant="contained" color="primary" size="large" onClick={this.handleUpdate}>
                    Update
                </Button>
                <Button justify = "right" variant="contained" color="primary" size="large" onClick={this.handleDelete}>
                    Delete
                </Button>
                </CardActions>
                </Grid>
                </form>
            </div>
        );

    }
    else{
        return (
            <div>
                <div align="center">
                    <Typography align="center" variant="h4">{this.props.title}</Typography>
                </div>
                <form noValidate>
                <Grid
                container
                justify = 'center'
                    alignContent='center'
                >
                <Card style={cardStyle}>
                <Grid item xs={12}>
                    <TextField
                        label="Title"
                        value={this.state.title}
                        onChange={this.handleTextChange}
                        margin="normal"
                        variant="outlined"
                        name="title"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Filter by Keyword"
                        value={this.state.filters}
                        onChange={this.handleArrayChange}
                        margin="normal"
                        variant="outlined"
                        name="filters"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Locations"
                        value={this.state.locations}
                        onChange={this.handleArrayChange}
                        margin="normal"
                        variant="outlined"
                        name="locations"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Companies"
                        value={this.state.companies}
                        onChange={this.handleArrayChange}
                        margin="normal"
                        variant="outlined"
                        name="companies"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Titles"
                        value={this.state.titles}
                        onChange={this.handleArrayChange}
                        margin="normal"
                        variant="outlined"
                        name="titles"
                    />
                </Grid>
                <CardActions style={{justifyContent: 'center'}}>
                <Button justify = "right" variant="contained" color="primary" size="large" onClick={this.handleUpdate}>
                    Update
                </Button>
                <Button justify = "right" variant="contained" color="primary" size="large" onClick={this.handleDelete}>
                    Delete
                </Button>
                </CardActions>
                </Card>
                </Grid>
                </form>
            </div>
        );
    }
    }
}

export default EditForm;