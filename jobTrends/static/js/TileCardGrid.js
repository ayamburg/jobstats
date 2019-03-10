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
                    <TileCard cardTitle="Amazon" backColor={{background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'}}/>
                </Grid>
                <Grid item xs={"auto"}>
                    <TileCard cardTitle="Apple">
                        
                    </TileCard>
                </Grid>
                <Grid item xs={"auto"}>
                    <TileCard cardTitle="Google">
                            
                    </TileCard>
                </Grid>
                <Grid item xs={"auto"}>
                    <TileCard cardTitle="Microsoft">
                        
                    </TileCard>
                </Grid>
                <Grid item xs={"auto"}>
                    <TileCard cardTitle="Front End Developer">
                        
                    </TileCard>  
                </Grid>
                <Grid item xs={"auto"}>
                    <TileCard cardTitle="Back End Developer">
                        
                    </TileCard>  
                </Grid>
                <Grid item xs={"auto"}>
                    <TileCard cardTitle="By Location">
                        
                    </TileCard>  
                </Grid>
                <Grid item xs={"auto"}>
                    <TileCard cardTitle="Near You">
                        
                    </TileCard>  
                </Grid>
                <Grid item xs={"auto"}>
                    <TileCard cardTitle="Management">
                        
                    </TileCard>  
                </Grid>
                <Grid item xs={"auto"}>
                    <TileCard cardTitle="Distributed Systems">
                        
                    </TileCard>  
                </Grid>
                <Grid item xs={"auto"}>
                    <TileCard cardTitle="Machine Learning">
                        
                    </TileCard>  
                </Grid>
                <Grid item xs={"auto"}>
                    <TileCard cardTitle="Natural Language Processing">
                        
                    </TileCard>  
                </Grid>
            </Grid>
        );
    }
}

export default TileCardGrid