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
import { HeatMap } from 'google-maps-react';
import Grid from '@material-ui/core/Grid';


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
        width: '90vw',
        height: '90vh',
        float: 'left',
        margin: '0 auto',
        // 'marginLeft': 'auto',
        // 'marginRight': 'auto',
        // justifyContent: 'center'
    }
    const mapStyle = {
        float: 'left',
        width: '90vw',
        height: '90vh',
        // 'marginLeft': 'auto',
        // 'marginRight': 'auto',
    }
    const gradient = [
        'rgba(0, 255, 255, 0)',
        'rgba(0, 255, 255, 1)',
        'rgba(0, 191, 255, 1)',
        'rgba(0, 127, 255, 1)',
        'rgba(0, 63, 255, 1)',
        'rgba(0, 0, 255, 1)',
        'rgba(0, 0, 223, 1)',
        'rgba(0, 0, 191, 1)',
        'rgba(0, 0, 159, 1)',
        'rgba(0, 0, 127, 1)',
        'rgba(63, 0, 91, 1)',
        'rgba(127, 0, 63, 1)',
        'rgba(191, 0, 31, 1)',
        'rgba(255, 0, 0, 1)'
      ];
    
      const positions = [
        { lat: 37.782551, lng: -122.445368 },
        { lat: 37.782745, lng: -122.444586 },
        { lat: 37.782842, lng: -122.443688 },
        { lat: 37.782919, lng: -122.442815 },
        { lat: 37.782992, lng: -122.442112 },
        { lat: 37.7831, lng: -122.441461 },
        { lat: 37.783206, lng: -122.440829 },
        { lat: 37.783273, lng: -122.440324 },
        { lat: 37.783316, lng: -122.440023 },
        { lat: 37.783357, lng: -122.439794 },
        { lat: 37.783371, lng: -122.439687 },
        { lat: 37.783368, lng: -122.439666 },
        { lat: 37.783383, lng: -122.439594 },
        { lat: 37.783508, lng: -122.439525 },
        { lat: 37.783842, lng: -122.439591 },
        { lat: 37.784147, lng: -122.439668 }
      ];

    const heatmap = <HeatMap
        gradient={gradient}
        opacity={0.3}
        positions={positions}
        radius={20}
    />
    return(
        <div style= {this.props.stylep}>
            <Grid 
                container
            >
                <Grid item>
                    <Paper style={ this.props.listStylep }>
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
                    <GoogleMapsContainer style = { this.props.mapStylep } 
                    city_names = {this.state.city_names}
                    cities = {this.state.cities}
                    center = {this.state.mapCenter}
                    heatmap = {heatmap}
                    stylep = { this.props.innerMapStylep }
                    />
                </Grid>
            </Grid>
        </div>
        
    )
 }
}
export default MapAndSideBar;

