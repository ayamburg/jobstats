import React from 'react';
import { GoogleApiWrapper, InfoWindow, Map, Marker, HeatMap } from 'google-maps-react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ClippedDrawer from './MapSideBar.js';
import axios from 'axios';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Column, Row } from 'simple-flexbox';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';




class GoogleMapsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      cities: [],
      city_names: [],
    }
    // binding this to event-handler functions
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
  }
  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  // onClose = props => {
  //   if (this.state.showingInfoWindow) {
  //     this.setState({
  //       showingInfoWindow: false,
  //       activeMarker: null
  //     });
  //   }
  // };

  onMapClick(props) {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }
  createMarkers() {
    var markers = [];
    //console.log(this.props.cities)
    for(var city in this.props.cities) {
      //console.log("This is city's COL: " + this.props.cities[city].COL)      
      var marker = <Marker
        key = { city }
        onClick = { this.onMarkerClick }
        title = { city }
        position = {this.props.cities[city].Location}
        name = { city }
        COL = {this.props.cities[city].COL}
        annual_wage = {this.props.cities[city]["Annual mean wage"]}
        />
      markers.push(marker);
      // markers.push(info)
    }
    return markers;
  }
  render() {
    console.log("below is props center")
    console.log(this.props.center)
    const style = {
      width: '90vw',
      height: '90vh',
    }
    var markers = this.createMarkers()
    console.log("Requesting gmaps API")
    console.log("below is state.cities")
    console.log(this.props.cities)
    return (
        <Map
          item
          xs = { 12 }
          style = { this.props.stylep }
          google = { this.props.google }
          onClick = { this.onMapClick }
          zoom = { 14 }
          // initialCenter = {this.props.center}
          center = {this.props.center}
        >

          {this.props.heatmap}

          <Marker
          onClick = { this.onMarkerClick }
          title = { 'Changing Colors Garage' }
          position = {{ lat: 36.9741, lng: -122.0308 }}
          name = { 'Changing Colors Garage' }
          />

          {/* <Marker
          onClick = { this.onMarkerClick }
          title = { this.props.city_names["Bellingham, WA"] }
          position = {this.props.city_names["Bellingham, WA"].location}
          name = { this.props.city_names["Bellingham, WA"] }
          /> */}

          {markers}

          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
          >

                <div>
                  <h1>{this.state.selectedPlace.name}</h1>
                  <h2>Cost of Living Index: {this.state.selectedPlace.COL}</h2>
                  <h4>Mean Salary for Computing Industry: {this.state.selectedPlace.annual_wage}</h4>
                  <Router>
                    <Link style={{ textDecoration: 'none' }} to={'/google'}>
                      <Button variant="outlined">
                        Click for more info
                      </Button>
                    </Link>
                  </Router>
                </div>
          </InfoWindow>
        </Map>
      
    );
  }
}
export default GoogleApiWrapper({
    apiKey: 'AIzaSyDtOudqRRf_cjgHfaM8qQQ4WwheBlGG0og',
    libraries: ['visualization']
})(GoogleMapsContainer);