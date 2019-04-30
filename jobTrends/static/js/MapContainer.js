import React from 'react';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ClippedDrawer from './MapSideBar.js';
import axios from 'axios';


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
  onMapClick(props) {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }
  componentDidMount() {
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
  createMarkers() {
    var markers = [];
    for(var city in this.state.cities) {
      var marker = <Marker
        onClick = { this.onMarkerClick }
        title = { city }
        position_lat = {city.Location.Lat}
        position_long = {city.Location.Long}
        name = { city }
      />
      markers.push(marker);
    }
    return markers;
  }
  render() {
    const style = {
      width: '50vw',
      height: '75vh',
      'marginLeft': 'auto',
      'marginRight': 'auto'
    }
    return (
      <div>
          <ClippedDrawer citynames={this.state.city_names}>
                  
          </ClippedDrawer>

          <Map
              item
              xs = { 12 }
              style = { style }
              google = { this.props.google }
              onClick = { this.onMapClick }
              zoom = { 14 }
              initialCenter = {{ lat: 48.648209, lng: 122.711185 }}
          >
              <Marker
              onClick = { this.onMarkerClick }
              title = { 'Changing Colors Garage' }
              position = {{ lat: 39.648209, lng: -75.711185 }}
              name = { 'Changing Colors Garage' }
              />

              {/* <Marker
              onClick = { this.onMarkerClick }
              title = { this.state.city_names["Bellingham, WA"] }
              position = {this.state.city_names["Bellingham, WA"].location}
              name = { this.state.city_names["Bellingham, WA"] }
              /> */}

              {this.createMarkers()}

              <InfoWindow
              marker = { this.state.activeMarker }
              visible = { this.state.showingInfoWindow }
              >
              <Paper>
                  <Typography
                  variant = 'headline'
                  component = 'h4'
                  >
                  Changing Colors Garage
                  </Typography>
                  <Typography
                  component = 'p'
                  >
                  98G Albe Dr Newark, DE 19702 <br />
                  302-293-8627
                  </Typography>
              </Paper>
              </InfoWindow>
          </Map>
      </div>
    );
  }
}
export default GoogleApiWrapper({
    // api: ('pAIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo')
})(GoogleMapsContainer)