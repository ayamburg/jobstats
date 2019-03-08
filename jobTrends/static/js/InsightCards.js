import React from 'react'
import BlockCard from './BlockCard';
import Grid from '@material-ui/core/Grid';
import TrendingUp from '@material-ui/icons/TrendingUp';
import TrendingDown from '@material-ui/icons/TrendingDown';
import TrendingFlat from '@material-ui/icons/TrendingFlat';
import FiberNew from '@material-ui/icons/FiberNew';
import FindReplace from '@material-ui/icons/FindReplace';
import { Typography } from '@material-ui/core';


class InsightCards extends React.Component {
    constructor(props) {
        super(props)
        this.createInsightCard.bind(this)
        this.createInsightCards.bind(this)

    }

    createInsightCard(i) {
        var iconType
        switch (this.props.InsightsValues[i].type){
            case 'Up':
                iconType = <TrendingUp fontSize = "large" nativeColor= "#00e676" />
                break
            case 'Down':
                iconType = <TrendingDown fontSize = "large" nativeColor = "#f44336" />
                break
            case 'Flat':
                iconType = <TrendingFlat fontSize = "large" nativeColor = "#607d8b"/>
                break
            case 'New':
                iconType = <FiberNew fontSize = "large" nativeColor = "#2196f3"/>
                break
            case 'Replace':
                iconType = <FindReplace fontSize = "large" nativeColor = "#ffea00"/>
                break
        }

        let insightCard =
            <Grid key={i} item xs={4}>
                <BlockCard 
                    payload={<Typography align="center" >{this.props.InsightsValues[i].text} </Typography>}
                    actionsTop={iconType}
                />
            </Grid>
        return insightCard
    }

    createInsightCards() {

        let genCards = [];
        for (let i = 0; i < this.props.InsightsValues.length; i++) {
            let insightCard = this.createInsightCard(i)
            genCards.push(insightCard);
        }

        let insightGrid = 
            <Grid 
                container 
                spacing={24}
                alignItems="center"
                justify="center"
            >
            {genCards}
            </Grid>
        return insightGrid;
    }

    render() {
        return (
            <div>
                {this.createInsightCards()}
            </div>
        );
    }
}

export default InsightCards