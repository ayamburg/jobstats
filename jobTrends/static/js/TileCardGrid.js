//renders a grid of tile cards

import React from 'react'
import Grid from '@material-ui/core/Grid';
import TileCard from './TileCard.js'

class TileCardGrid extends React.Component {
    loadCustomTiles() {
        let custom_tiles = this.props.custom_tiles;
        let custom_tile_cards = [];

        for (let i = 0; i < custom_tiles.length; i++) {
            let title = custom_tiles[i].title;
            let path = "/" + custom_tiles[i].name;
            custom_tile_cards.push(
                <Grid item xs={"auto"} key={i}>
                    <TileCard path={path} cardTitle={title}
                              backColor={{background: 'linear-gradient(45deg, #ffffff 17%, #ffffff 90%)'}}>

                    </TileCard>
                </Grid>
            )
        }
        return custom_tile_cards;
    }

    getAddButton() {
        if (this.props.signed_in) {
            return (
                <TileCard image="/static/images/baseline-add-24px.svg" path="/custom" cardTitle="Add Custom Tile"
                          backColor={{background: 'linear-gradient(45deg, #ffffff 17%, #ffffff 90%)'}}>
                </TileCard>
            )
        } else {
            return (
                <TileCard image="/static/images/baseline-add-24px.svg" cardTitle="Sign in to add custom tiles"
                          backColor={{background: 'linear-gradient(45deg, #ffffff 17%, #ffffff 90%)'}}
                >
                </TileCard>
            )
        }
    }

    render() {
        return (
            <Grid
                style={{
                    width: '100%',
                }}
                container
                spacing={16}
                alignContent="flex-end"
                alignItems="flex-end"
                justify="center"
            >
                <Grid item xs={"auto"}>
                    <TileCard image="/static/images/amazonlogo.png" path="/amazon" cardTitle="Top Skills for Amazon"
                              backColor={{background: 'linear-gradient(45deg, #ffffff 17%, ##ffffff 100%)'}}/>
                </Grid>
                <Grid item xs={"auto"}>
                    <TileCard image="/static/images/applelogo.svg" path="/apple" cardTitle="Top Skills for Apple"
                              backColor={{background: 'linear-gradient(to top right, #ffffff -21%, #ffffff 100%)'}}>

                    </TileCard>
                </Grid>
                <Grid item xs={"auto"}>
                    <TileCard image="/static/images/googlelogo.svg" path="/google" cardTitle="Top Skills for Google"
                              backColor={{background: 'linear-gradient(45deg, #ffffff 17%, #ffffff 90%)'}}>

                    </TileCard>
                </Grid>
                <Grid item xs={"auto"}>
                    <TileCard image="/static/images/microsoftlogo.svg" path="/microsoft"
                              cardTitle="Top Skills for Microsoft"
                              backColor={{background: 'linear-gradient(45deg, #ffffff 17%, #ffffff 100%)'}}>

                    </TileCard>
                </Grid>
                <Grid item xs={"auto"}>
                    <TileCard path="/frontend" cardTitle="Top Front End Skills"
                              backColor={{background: 'linear-gradient(45deg, #ffffff 17%, #ffffff 90%)'}}>

                    </TileCard>
                </Grid>
                <Grid item xs={"auto"}>
                    <TileCard path="/backend" cardTitle="Top Back End Skills"
                              backColor={{background: 'linear-gradient(45deg, #ffffff 17%, #ffffff 90%)'}}>

                    </TileCard>
                </Grid>
                <Grid item xs={"auto"}>
                    <TileCard path="/fullstack" cardTitle="Top Full Stack Skills"
                              backColor={{background: 'linear-gradient(45deg, #ffffff 17%, #ffffff 90%)'}}>

                    </TileCard>
                </Grid>
                <Grid item xs={"auto"}>
                    <TileCard path="/cybersecurity" cardTitle="Top Cyber Security Skills"
                              backColor={{background: 'linear-gradient(45deg, #ffffff 17%, #ffffff 90%)'}}>

                    </TileCard>
                </Grid>
                {this.loadCustomTiles()}
                <Grid item xs={"auto"}>
                    {this.getAddButton()}
                </Grid>
            </Grid>
        );
    }
}

export default TileCardGrid
