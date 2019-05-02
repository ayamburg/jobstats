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
 } 
 render(){
    return(
        <ClippedDrawer  citynames={this.state.city_names}> </ClippedDrawer>
        <GoogleMapsContainer></GoogleMapsContainer>
    )
 }
}
export default GoogleApiWrapper({
    apiKey: 'AIzaSyDtOudqRRf_cjgHfaM8qQQ4WwheBlGG0og'
})(MapAndSideBar);

