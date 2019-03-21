//renders a grid of tile cards

import React from 'react'
import Grid from '@material-ui/core/Grid';
import TileCard from './TileCard.js'

class TileCardGrid extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        return(
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
                <Grid item xs={"auto"}>
                    <TileCard image = "/static/images/amazonlogo.png" path="/amazon" cardTitle="Top Skills for Amazon" backColor={{background: 'linear-gradient(45deg, #ffffff 17%, ##ffffff 100%)'}}/>
                </Grid>
                <Grid item xs={"auto"}>
                    <TileCard image="/static/images/applelogo.svg" path="/apple" cardTitle="Top Skills for Apple" backColor={{background: 'linear-gradient(to top right, #ffffff -21%, #ffffff 100%)'}}>
                        
                    </TileCard>
                </Grid>
                <Grid item xs={"auto"}>
                    <TileCard image="/static/images/googlelogo.svg" path="/google" cardTitle="Top Skills for Google" backColor={{background: 'linear-gradient(45deg, #ffffff 17%, #ffffff 90%)'}}>
                            
                    </TileCard>
                </Grid>
                <Grid item xs={"auto"}>
                    <TileCard image="/static/images/microsoftlogo.svg" path="/microsoft" cardTitle="Top Skills for Microsoft" backColor={{background: 'linear-gradient(45deg, #ffffff 17%, #ffffff 100%)'}}>
                        
                    </TileCard>
                </Grid>
                <Grid item xs={"auto"}>
                    <TileCard path="/frontend" cardTitle="Top Front End Skills" backColor={{background: 'linear-gradient(45deg, #ffffff 17%, #ffffff 90%)'}}>
                        
                    </TileCard>  
                </Grid>
                <Grid item xs={"auto"}>
                    <TileCard path="/backend" cardTitle="Top Back End Skills" backColor={{background: 'linear-gradient(45deg, #ffffff 17%, #ffffff 90%)'}}>
                        
                    </TileCard>  
                </Grid>
                <Grid item xs={"auto"}>
                    <TileCard path="/fullstack" cardTitle="Top Full Stack Skills" backColor={{background: 'linear-gradient(45deg, #ffffff 17%, #ffffff 90%)'}}>
                        
                    </TileCard>  
                </Grid>
                <Grid item xs={"auto"}>
                    <TileCard path="/cybersecurity" cardTitle="Top Cyber Security Skills" backColor={{background: 'linear-gradient(45deg, #ffffff 17%, #ffffff 90%)'}}>
                        
                    </TileCard>  
                </Grid>
            </Grid>
        );
    }
}

export default TileCardGrid
