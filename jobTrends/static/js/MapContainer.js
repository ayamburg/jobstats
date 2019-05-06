import React from 'react';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';
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
    console.log(this.state.cities)
    for(var city in this.state.cities) {
      console.log("This is city's COL: " + this.state.cities[city].COL)      
      var marker = <Marker
        onClick = { this.onMarkerClick }
        title = { city }
        position = {this.state.cities[city].Location}
        name = { city }
        COL = {this.state.cities[city].COL}
        annual_wage = {this.state.cities[city]["Annual mean wage"]}
        />
      //   var info = <InfoWindow
      //   marker={this.state.activeMarker}
      //   visible={this.state.showingInfoWindow}
      //   onClose={this.onClose}
      // >
      //   <div>
      //     <h4>{this.state.selectedPlace.name}</h4>
      //     <h4>{this.state.selectedPlace.title}</h4>
      //   </div>
      // </InfoWindow>
      markers.push(marker);
      // markers.push(info)
    }
    return markers;
  }
  render() {
    const style = {
      width: '50vw',
      height: '75vh',
      'marginLeft': 'auto',
      'marginRight': 'auto',
      // display: 'flex',
      // flexDirection: 'row',
    }
    const mapStyle = {
      width: '50vw',
      height: '75vh',
      // 'marginLeft': 'auto',
      // 'marginRight': 'auto',
      // alignSelf: 'flex-end'
    }
    const listStyle = {
      // height: '75vh',
      maxHeight: 200,
      overflow: 'auto'
    }
    console.log("Requesting gmaps API")
    var markers = this.createMarkers()
    return (
      <div style={ style }>
        <Column flexGrow={1}>
          <Row horizontal='center'>
            test
          </Row>
          <Row vertical='center'>
            <Column flexGrow={1} horizontal='center'>
              <Paper style={ listStyle }>
                <List>
                  {this.state.city_names.map((text, index) => (
                    <ListItem button key={text}>
                      <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Column>
            <Column flexGrow={1} horizontal='center'>
                <Map
                  item
                  xs = { 12 }
                  style = { mapStyle }
                  google = { this.props.google }
                  onClick = { this.onMapClick }
                  zoom = { 14 }
                  initialCenter = {{ lat: 36.9741, lng: -122.0308 }}
                >

                  <Marker
                  onClick = { this.onMarkerClick }
                  title = { 'Changing Colors Garage' }
                  position = {{ lat: 36.9741, lng: -122.0308 }}
                  name = { 'Changing Colors Garage' }
                  />

                  {/* <Marker
                  onClick = { this.onMarkerClick }
                  title = { this.state.city_names["Bellingham, WA"] }
                  position = {this.state.city_names["Bellingham, WA"].location}
                  name = { this.state.city_names["Bellingham, WA"] }
                  /> */}

                  {markers}

                  <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.onClose}
                  >
                    <div>
                      <h1>{this.state.selectedPlace.name}</h1>
                      <h2>Cost of Living: {this.state.selectedPlace.COL}</h2>
                      <h4>Mean Salary for Computing Industry: {this.state.selectedPlace.annual_wage}</h4>
                    </div>
                  </InfoWindow>
                </Map>
            </Column>
          </Row>
        </Column>

      </div>
    );
  }
}
export default GoogleApiWrapper({
    apiKey: 'AIzaSyDtOudqRRf_cjgHfaM8qQQ4WwheBlGG0og'
})(GoogleMapsContainer);