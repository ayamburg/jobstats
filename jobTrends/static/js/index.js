import React from 'react'
import ReactDOM from 'react-dom'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { Typography } from '@material-ui/core';
import {Paper} from '@material-ui/core';
import TileCard from './TileCard.js'
import { ButtonBase } from '@material-ui/core';

// const styles = {
//     Card: {
//         minWidth: 275,
//         maxWidth: 500,
//     }
// }

const App = () => (
    <Grid 
        style={{
        margin: 0,
        width: '100%',
        }}
        container 
        spacing={16}
        alignItems="flex-start"
        justify="center"
    >
        <Grid item xs={3.9}>
            <TileCard cardTitle="Amazon" backColor={{background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'}}/>
        </Grid>
        <Grid item xs={3.9}>
            <TileCard cardTitle="Apple">
                
            </TileCard>
        </Grid>
        <Grid item xs={3.9}>
            <TileCard cardTitle="Google">
                    
            </TileCard>
        </Grid>
        <Grid item xs={3.9}>
            <TileCard cardTitle="Microsoft">
                
            </TileCard>
        </Grid>
        <Grid item xs={3.9}>
            <TileCard cardTitle="Front End Developer">
                
            </TileCard>  
        </Grid>
        <Grid item xs={3.9}>
            <TileCard cardTitle="Back End Developer">
                
            </TileCard>  
        </Grid>
        <Grid item xs={3.9}>
            <TileCard cardTitle="By Location">
                
            </TileCard>  
        </Grid>
        <Grid item xs={3.9}>
            <TileCard cardTitle="Near You">
                
            </TileCard>  
        </Grid>
        <Grid item xs={3.9}>
            <TileCard cardTitle="Management">
                
            </TileCard>  
        </Grid>
        <Grid item xs={3.9}>
            <TileCard cardTitle="Distributed Systems">
                
            </TileCard>  
        </Grid>
        <Grid item xs={3.9}>
            <TileCard cardTitle="Machine Learning">
                
            </TileCard>  
        </Grid>
        <Grid item xs={3.9}>
            <TileCard cardTitle="Natural Language Processing">
                
            </TileCard>  
        </Grid>
    </Grid>
    
);


ReactDOM.render(
    <App/>,
    window.react_mount
);
