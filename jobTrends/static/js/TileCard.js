// returns a single tile to be used in the tile view menu
// routing, color, and title can be set via the path, backcolor, and cardTtile props

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { ButtonBase } from '@material-ui/core';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


var styles = {
  card: {
    minWidth: 210,
    minHeight: 210,
    maxWidth: 210,
    maxHeight: 210,
    //height: '10vw',
    // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

function TileCard(props) {
  const { classes } = props; 
  const bull = <span className={classes.bullet}>•</span>;

  return ( 
    <Link style={{ textDecoration: 'none' }} to={props.path}>
      <CardActionArea className={classes.card}>
        <Card className={classes.card} style={props.backColor}>
          <CardContent align="center">
              <Typography align="center" variant="h5">{props.cardTitle}</Typography>
              <CardMedia
                style={{height: 0, width: 130, paddingBottom: '70.25%'}}
                image={props.image}
              >
              </CardMedia>
          </CardContent>
        </Card>
      </CardActionArea> 
    </Link>   
  );
}

TileCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TileCard);
