import React from 'react'
import DynamicForm from './DynamicForm';
import Card from '@material-ui/core/Card';
import axios from 'axios'
import Grid from '@material-ui/core/Grid';
import {Typography, CardActions} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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
            error: "",
            loading: false
        };
        this.handleArrayChange = this.handleArrayChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleUpdate() {
        this.setState({loading: true, error: ""});
        axios.put('custom_tiles', {
            filters: this.state.filters.concat(this.state.filtersField),
            locations: this.state.locations.concat(this.state.locationsField),
            companies: this.state.companies.concat(this.state.companiesField),
            titles: this.state.jobTitles.concat(this.state.jobTitlesField),
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
        }).catch(error => {
            this.setState({loading: false, error: error.response.data.error});
        })
    }

    handleDelete() {
        axios.delete('custom_tiles', {
            data: {name: this.state.name}
        }).then(response => {
            if (response.data.success) {
                this.props.history.push('/');
                window.location.reload();
                this.props.history.push('/');
            }
        });
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
        if (newVal !== "") {
            val.push(newVal);
            this.setState({[name + "Field"]: "", [name]: val});
        }
    }

    handleRemove(index, name) {
        const val = this.state[name];
        val.splice(index, 1);
        this.setState({[name]: val});
    }

    render() {
        if (isMobileOnly) {
            return (
                <div>
                    <div align="center">
                        <Typography align="center" variant="h4">{this.props.title}</Typography>
                    </div>
                    <form noValidate>
                        <Grid
                            container
                            justify='center'
                            alignContent='center'
                        >
                            <Grid item xs={12}>
                                <TextField
                                    style={TextStyle}
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
                                    label="Skills"
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
                                    style={TextStyle}
                                    label="Locations"
                                    fieldValue={this.state.locationsField}
                                    value={this.state.locations}
                                    onChange={this.handleFormChange}
                                    onAdd={this.handleAdd}
                                    onRemove={this.handleRemove}
                                    name="locations"
                                    plus="+ Locations"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <DynamicForm
                                    style={TextStyle}
                                    label="Companies"
                                    fieldValue={this.state.companiesField}
                                    value={this.state.companies}
                                    onChange={this.handleFormChange}
                                    onAdd={this.handleAdd}
                                    onRemove={this.handleRemove}
                                    name="companies"
                                    plus="+ Companies"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <DynamicForm
                                    style={TextStyle}
                                    label="Job Titles"
                                    fieldValue={this.state.jobTitlesField}
                                    value={this.state.jobTitles}
                                    onChange={this.handleFormChange}
                                    onAdd={this.handleAdd}
                                    onRemove={this.handleRemove}
                                    name="jobTitles"
                                    plus="+ Job Titles"
                                />
                            </Grid>
                            <Typography align='center'
                                        style={{color: "#ff0000"}}
                            >
                                {this.state.error}
                            </Typography>
                            <CardActions style={{justifyContent: 'center'}}>
                                <Button justify="right" variant="contained" color="primary" size="large"
                                        onClick={this.handleUpdate}>
                                    Update
                                </Button>
                                <Button justify="right" variant="contained" color="primary" size="large"
                                        onClick={this.handleDelete}>
                                    Delete
                                </Button>
                            </CardActions>

                            {/* </CardActions> */}
                        </Grid>
                    </form>
                </div>
            );
        } else {
            return (
                <div>
                    <div align="center">
                        <Typography align="center" variant="h4">{this.props.title}</Typography>
                    </div>
                    <form noValidate>
                        <Grid
                            container
                            justify='center'
                            alignContent='center'
                        >
                            <Card style={cardStyle}>
                                {/* <CardActions style={{justifyContent: 'center'}}> */}
                                <Grid item xs={12}>
                                    <TextField
                                        style={TextStyle}
                                        label="Tile Name"
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
                                        label="Skills"
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
                                        style={TextStyle}
                                        label="Locations"
                                        fieldValue={this.state.locationsField}
                                        value={this.state.locations}
                                        onChange={this.handleFormChange}
                                        onAdd={this.handleAdd}
                                        onRemove={this.handleRemove}
                                        name="locations"
                                        plus="+ Locations"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <DynamicForm
                                        style={TextStyle}
                                        label="Companies"
                                        fieldValue={this.state.companiesField}
                                        value={this.state.companies}
                                        onChange={this.handleFormChange}
                                        onAdd={this.handleAdd}
                                        onRemove={this.handleRemove}
                                        name="companies"
                                        plus="+ Companies"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <DynamicForm
                                        style={TextStyle}
                                        label="Job Titles"
                                        fieldValue={this.state.jobTitlesField}
                                        value={this.state.jobTitles}
                                        onChange={this.handleFormChange}
                                        onAdd={this.handleAdd}
                                        onRemove={this.handleRemove}
                                        name="jobTitles"
                                        plus="+ Job Titles"
                                    />
                                </Grid>
                                <Typography align='center'
                                            style={{color: "#ff0000"}}
                                >
                                    {this.state.error}
                                </Typography>
                                <CardActions style={{justifyContent: 'center'}}>
                                    <Button justify="right" variant="contained" color="primary" size="large"
                                            onClick={this.handleUpdate}>
                                        Update
                                    </Button>
                                    <Button justify="right" variant="contained" color="primary" size="large"
                                            onClick={this.handleDelete}>
                                        Delete
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
}

export default EditForm;