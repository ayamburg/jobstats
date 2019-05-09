import React from 'react';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ClippedDrawer from './MapSideBar.js';
import axios from 'axios';
import GoogleMapsContainer from './MapContainer.js';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import LocationOn from '@material-ui/icons/LocationOn';


class MapAndSideBar extends React.Component {
 constructor(props){
     super(props);
     this.state = {
        cities: [],
        city_names: [],
        mapCenter: { lat: 36.9741, lng: -122.0308 }
    }
    this.handleSideBarClick = this.handleSideBarClick.bind(this);
 }
 
 handleSideBarClick(location) {
    this.setState({
        mapCenter: location
    })
    console.log("logging location")
    console.log(location)
 }

 componentDidMount() {
    console.log("doing api request")
    axios.get('/api/get_json_file', {
        responseType: 'json',
        params: {
            category: "location_data",
            name: 'col',
        }
    }).then(response => {
        let citynames = [];
        for(var city in response.data) {
          //console.log(city);
          citynames.push(city);
        }
        //console.log(citynames);

        this.setState({
          cities: response.data,
          city_names: citynames,
        })
    });
  }

 render(){
    const listStyle = {
        // height: '75vh',
        overflow: 'auto',
        float: 'left'
    }
    const style = {
        display: 'flex',
        flexDirection: 'row',
        width: '50vw',
        height: '75vh',
        float: 'none',
        margin: '0 auto',
        // 'marginLeft': 'auto',
        // 'marginRight': 'auto',
        // justifyContent: 'center'
    }
    const mapStyle = {
        float: 'left',
        width: '50vw',
        height: '75vh',
        // 'marginLeft': 'auto',
        // 'marginRight': 'auto',
    }
    return(
        <div style= {style}>
            <Paper style={ listStyle }>
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
            <GoogleMapsContainer style = { mapStyle } 
            city_names = {this.state.city_names}
            cities = {this.state.cities}
            center = {this.state.mapCenter}
            />
        </div>
        
    )
 }
}
export default MapAndSideBar;

