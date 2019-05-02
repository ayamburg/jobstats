import React from 'react';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ClippedDrawer from './MapSideBar.js';
import axios from 'axios';
import GoogleMapsContainer from './MapContainer.js';


class MapAndSideBar extends React.Component {
 constructor(props){
    super(props);
    this.state = {
        cities: [],
        city_names: [],
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

 render(){
    return(
        <div>
            <ClippedDrawer  citynames={this.state.city_names}> </ClippedDrawer>
            <p></p>
            <span>
                <GoogleMapsContainer city_names={this.state.city_names} cities={this.state.cities}></GoogleMapsContainer>
            </span>
        </div>
    )
 }
}
export default GoogleApiWrapper({
    apiKey: 'AIzaSyDtOudqRRf_cjgHfaM8qQQ4WwheBlGG0og'
})(MapAndSideBar);

