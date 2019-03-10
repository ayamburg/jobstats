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
                    <TileCard image = "/static/images/amazonlogo.png" path="/frontend" cardTitle="Top Skills for Amazon" backColor={{background: 'linear-gradient(45deg, #ff6600 17%, #ffff99 100%)'}}/>
                </Grid>
                <Grid item xs={"auto"}>
                    <TileCard image="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" path="/frontend" cardTitle="Top Skills for Apple" backColor={{background: 'linear-gradient(to top right, #242424 -21%, #ffffff 100%)'}}>
                        
                    </TileCard>
                </Grid>
                <Grid item xs={"auto"}>
                    <TileCard image="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" path="/frontend" cardTitle="Top Skills for Google" backColor={{background: 'linear-gradient(45deg, #0033cc 17%, #00ff99 90%)'}}>
                            
                    </TileCard>
                </Grid>
                <Grid item xs={"auto"}>
                    <TileCard path="/frontend" cardTitle="Microsoft">
                        
                    </TileCard>
                </Grid>
                <Grid item xs={"auto"}>
                    <TileCard path="/frontend" cardTitle="Front End Developer">
                        
                    </TileCard>  
                </Grid>
                <Grid item xs={"auto"}>
                    <TileCard path="/frontend" cardTitle="Back End Developer">
                        
                    </TileCard>  
                </Grid>
                <Grid item xs={"auto"}>
                    <TileCard path="/frontend" cardTitle="By Location">
                        
                    </TileCard>  
                </Grid>
                <Grid item xs={"auto"}>
                    <TileCard path="/frontend" cardTitle="Near You">
                        
                    </TileCard>  
                </Grid>
                <Grid item xs={"auto"}>
                    <TileCard path="/frontend" cardTitle="Management">
                        
                    </TileCard>  
                </Grid>
                <Grid item xs={"auto"}>
                    <TileCard path="/frontend" cardTitle="Distributed Systems">
                        
                    </TileCard>  
                </Grid>
                <Grid item xs={"auto"}>
                    <TileCard path="/frontend" cardTitle="Machine Learning">
                        
                    </TileCard>  
                </Grid>
                <Grid item xs={"auto"}>
                    <TileCard path="/frontend" cardTitle="Natural Language Processing">
                        
                    </TileCard>  
                </Grid>
            </Grid>
        );
    }
}

export default TileCardGrid