import React from 'react'
import DynamicForm from './DynamicForm';
import Card from '@material-ui/core/Card';
import axios from 'axios'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {Typography, CardActions} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Search from 'react-search'
import {BrowserRouter as Router, Route, Link} from "react-router-dom";


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

class CustomGraphForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filtersField: "",
            locationsField: "",
            companiesField: "",
            jobTitlesField: "",
            filters: [],
            locations: [],
            companies: [],
            jobTitles: [],
            whitelists: [],
            title: ""
        };
        this.handleArrayChange = this.handleArrayChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
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

    handleFormChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({[name]: value});
    };

     handleAdd(event) {
        const target = event.currentTarget;
        const name = target.name;
        const val = this.state[name];
        const newVal = this.state[name + "Field"];
        if(newVal !== ""){
            val.push(newVal);
            this.setState({[name + "Field"]: "", [name]: val });
        }
    }

    handleRemove(index, name) {
        const val = this.state[name];
        val.splice(index, 1);
        this.setState({[name]: val});
    }

    handleSubmit() {
        axios.post('custom_tiles', {
            filters: this.state.filters,
            locations: this.state.locations,
            companies: this.state.companies,
            titles: this.state.jobTitles,
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
                <form noValidate>
                <Grid
                container
                justify = 'center'
                alignContent='center'
                >
                    <Card style={cardStyle}>
                    {/* <CardActions style={{justifyContent: 'center'}}> */}
                    
                        <Grid item xs ={12}>
                            <DynamicForm
                            label = "Filters"
                            fieldValue={this.state.filtersField}
                            value={this.state.filters}
                            onChange={this.handleFormChange}
                            onAdd={this.handleAdd}
                            onRemove={this.handleRemove}
                            name="filters"
                            plus="+ Filters"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <DynamicForm
                            label = "Locations"
                            fieldValue={this.state.locationsField}
                            value={this.state.locations}
                            onChange={this.handleFormChange}
                            onAdd={this.handleAdd}
                            onRemove={this.handleRemove}
                            name="locations"
                            plus = "+ Locations"
                            />
                        </Grid>
                        <Grid item xs ={12}>
                            <DynamicForm
                            label = "Companies"
                            fieldValue={this.state.companiesField}
                            value={this.state.companies}
                            onChange={this.handleFormChange}
                            onAdd={this.handleAdd}
                            onRemove={this.handleRemove}
                            name="companies"
                            plus = "+ Companies"
                            />
                        </Grid>
                        <Grid item xs ={12}>
                            <DynamicForm
                            label = "Job Titles"
                            fieldValue={this.state.jobTitlesField}
                            value={this.state.jobTitles}
                            onChange={this.handleFormChange}
                            onAdd={this.handleAdd}
                            onRemove={this.handleRemove}
                            name="jobTitles"
                            plus = "+ Job Titles"
                            />
                        </Grid>
                        <Grid item xs ={12}>
                            <TextField
                                label="Whitelists"
                                value={this.state.whitelists}
                                onChange={this.handleArrayChange}
                                margin="normal"
                                variant="outlined"
                                name="whitelists"
                            />
                        </Grid>
                        <Grid item xs ={12}>
                            <TextField
                                label="Title"
                                value={this.state.title}
                                onChange={this.handleTextChange}
                                margin="normal"
                                variant="outlined"
                                name="title"
                            />
                        </Grid>
                        <CardActions style={{justifyContent: 'center'}}>
                        <Button justify = "right" variant="contained" color="primary" size="large" onClick={this.handleSubmit}>
                            Submit
                        </Button>
                        </CardActions> 
                    
                    {/* </CardActions> */}
                    </Card> 
                </Grid>  
                </form>                             
            </div>
        );
    }
}

export default CustomGraphForm;