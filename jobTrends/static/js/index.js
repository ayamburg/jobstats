import React from 'react'
import ReactDOM from 'react-dom'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { Typography } from '@material-ui/core';
import {Paper} from '@material-ui/core';
import TileCard from './TileCard.js'
import { ButtonBase } from '@material-ui/core';
import Home from './home.js';
import TileCardGrid from './TileCardGrid.js';

// const styles = {
//     Card: {
//         minWidth: 275,
//         maxWidth: 500,
//     }
// }

const App = () => (

    <Home/>

);


ReactDOM.render(
    <App/>,
    window.react_mount,
);