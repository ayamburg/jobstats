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

const mapGradient = [
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

const testPositions = [
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

const testPositions2 = [
  { lat: 37.774929, lng: -122.419418}
];


class GoogleMapsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      cities: [],
      city_names: [],
      top_cities: [],
    }
    // binding this to event-handler functions
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
    this.createHeatMap = this.createHeatMap.bind(this);
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

  createHeatMap() {
    let positions = [];
    axios.get('/api/top_locations', {
        responseType: 'json',
        params: {
            // filters: this.props.filters.toString(),
            // companies: this.props.companies.toString(),
            // titles: this.props.titles.toString(),
            filters: [],
            companies: [],
            titles: ["frontend"],
        }
    }).then(response => {
        console.log("below is op city data");
        console.log(response.top_locations);

        for(var city in response.data.top_locations) {
            //console.log("below is a city in top city");
            //console.log(response.data.top_locations[city]["city"]);
            let x = response.data.top_locations[city]["city"];
            positions.push(this.props.cities[x].Location);

            // var i=0
            // for(i=0; i<= 5; i++) {
            //   positions.push({
            //     lat: this.props.cities[x].Location.lat - (i / 10),
            //     lng: this.props.cities[x].Location.lng - (i / 10),
            //   });
            // }
        }

        this.setState({
          top_cities: positions 
        })
    });
    console.log("below is positions");
    console.log(positions);

    // return( 
    //   <HeatMap
    //       gradient={gradient}
    //       opacity={0.3}
    //       positions={positions}
    //       radius={20}
    //   />
    // );
}

componentDidMount() {
   this.createHeatMap();
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
    const pos = (this.state.top_cities.slice())
    console.log("below is state top_cities")
    console.log(pos)
    console.log(testPositions)
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

          <HeatMap
            gradient={mapGradient}
            opacity={1.0}
            positions={pos}
            radius={200}
          />

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