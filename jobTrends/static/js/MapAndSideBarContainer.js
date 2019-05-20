import React from 'react';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import GoogleMapsContainer from './MapContainer.js';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import LocationOn from '@material-ui/icons/LocationOn';
import Grid from '@material-ui/core/Grid';


class MapAndSideBarContainer extends React.Component {
 constructor(props){
     super(props);
     this.state = {
        cities: [],
        city_names: [],
        top_cities: [],
        mapCenter: { lat: 36.9741, lng: -122.0308 },
    }
    this.handleSideBarClick = this.handleSideBarClick.bind(this);
    this.getCitiesAndCityNames = this.getCitiesAndCityNames.bind(this);
 }
 
 handleSideBarClick(location) {
    this.setState({
        mapCenter: location
    })
 }

 componentDidMount() {
    this.createTopCities()
    this.getCitiesAndCityNames()
 }

 createTopCities() {
    var top_cities_latlng_objects = [];
    axios.get('/api/top_locations', {
        responseType: 'json',
        params: {
            filters: [],
            companies: [],
            titles: ["frontend"],
        }
    }).then(response => {
        for(let city_object in response.data.top_locations) {
          var cities_name = response.data.top_locations[city_object]["city"];
          top_cities_latlng_objects.push(this.props.cities[cities_name].Location);
        }
        console.log("createTopCities api request succeeded, here is top_cities:", top_cities_latlng_objects )
        this.setState({
          top_cities: top_cities_latlng_objects 
        })
        this.forceUpdate();
    });
 }

 getCitiesAndCityNames() {
    axios.get('/api/get_json_file', {
        responseType: 'json',
        params: {
            category: "location_data",
            name: 'col',
        }
    }).then(response => {
        var citynames = [];
        for(let city_name in response.data) {
          citynames.push(city_name);
        }
        console.log("getCitiesAndCityNames api request succeeded, here is response.data:", response.data)
        console.log("getCitiesAndCityNames api request succeeded, here is citynames:", citynames )
        this.setState({
          cities: response.data,
          city_names: citynames,
        })
    });
 }

 render(){
    return(
        <div style= {this.props.style_prop}>
            <Grid 
                container
            >
                <Grid item>
                    <Paper style={ this.props.list_style_prop }>
                        <List>
                            {this.state.city_names.map((text, index) => (
                                <Link key={text} style={{ textDecoration: 'none' }} to={'/google'}>
                                <ListItem button onClick={() => this.handleSideBarClick(this.state.cities[text].Location)}>
                                <LocationOn fontSize = "large" nativeColor = "#add8e6"/>
                                <ListItemText primary={text} />
                                </ListItem>
                                </Link>
                            ))}
                        </List>
                    </Paper>
                </Grid>
                <Grid item>
                    <GoogleMapsContainer style = { this.props.map_style_prop } 
                        city_names = {this.state.city_names}
                        cities = {this.state.cities}
                        center = {this.state.mapCenter}
                        map_style = {this.props.inner_map_style_prop}
                        top_cities = {this.state.top_cities}
                    />
                </Grid>
            </Grid>
        </div>
        
    )
 }
}
export default MapAndSideBarContainer;

