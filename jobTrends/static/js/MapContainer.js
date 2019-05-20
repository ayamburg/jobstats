import React from 'react';
import { GoogleApiWrapper, InfoWindow, Map, Marker, HeatMap } from 'google-maps-react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
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

var MARKERS = [];


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
    // this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
  }

  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onMapClick(props) {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }

  createMarkers() {
    let markers = [];
    for(var city in this.props.cities) {     
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
    }
    return markers;
  }

  componentDidUpdate(prevProps) {
    if(prevProps.cities !== this.props.cities || prevProps.city_names !== this.props.city_names || prevProps.top_cities !== this.props.top_cities) {
      console.log("updated state in MapContainer from componentDidUpdate")
      if(prevProps.top_cities !== this.props.top_cities) {
        console.log("updated top_cities state in MapContainer from componentDidUpdate")
      }
      this.setState({ 
        cities: this.props.cities,
        city_names: this.props.city_names,
        top_cities: this.props.top_cities,
      });
      this.forceUpdate();
    }
  }

  componentDidMount(){
    console.log("below 2 lines are props cities and top_cities in MapContainer during componentDidMount")
    console.log(this.props.cities)
    console.log(this.props.top_cities)
  }

  // static getDerivedStateFromProps(nextProps, prevState){
  //   if(nextProps.cities != prevState.cities || nextProps.city_names != prevState.city_names || nextProps.top_cities != prevState.top_cities) {
  //     return ({
  //       cities: nextProps.cities,
  //       city_names: nextProps.city_names,
  //       top_cities: nextProps.top_cities,
  //     });
  //   }  
  // }

  render() {
    MARKERS = this.createMarkers();
    //this if statchecks to see if top_cities and cities have been filled by their api requests in MapAndSideBarContainer.js
    if(/*this.props.top_cities.length == 0 || this.props.cities.length == 0*/ 1 != 1) {
      return ( <span> Loading... </span>);
    } else {
      return (
        <Map
          item
          xs = { 12 }
          style = { this.props.map_style }
          google = { this.props.google }
          onClick = { this.onMapClick }
          zoom = { 14 }
          center = {this.props.center}
        >

          <HeatMap
            gradient={mapGradient}
            opacity={1.0}
            positions={this.props.top_cities}
            radius={200}
          />

          {MARKERS}

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
}

export default GoogleApiWrapper({
    //apiKey: 'AIzaSyDtOudqRRf_cjgHfaM8qQQ4WwheBlGG0og',
    libraries: ['visualization']
})(GoogleMapsContainer);