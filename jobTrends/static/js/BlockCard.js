// Blockcard takes an actions topaction and payload prop
// it uses these props to generate a card containing the payload prop

import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

// const styles = {
//     card: {
//       maxWidth: 345,
//     },
//     bullet: {
//       display: 'inline-block',
//       margin: '0 2px',
//       transform: 'scale(0.8)',
//     },
//     title: {
//       fontSize: 14,
//     },
//     pos: {
//       marginBottom: 12,
//     },
// };

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});


class BlockCard extends React.Component {
    //state = {};
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {classes} = this.props;
        var bc = this;
        //const { classes } = this.props;
        //const bull = <span className={classes.bullet}>•</span>;
        //const bod = this.props.payload;

        return (

            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item xs></Grid>
                    <Grid item xs={10}>
                            <Card className={styles.card} size="50">
                                <CardActions disableActionSpacing={false}>
                                    {bc.props.actionsTop}
                                </CardActions>
                                <CardContent>
                                    <div className="payload">
                                        {bc.props.payload}
                                    </div>
                                </CardContent>
                                <CardActions disableActionSpacing={false}>
                                    {bc.props.actions}
                                </CardActions>
                            </Card>
                    </Grid>
                    <Grid item xs></Grid>
                </Grid>
            </div>
        );
    }
}

// SimpleCard.propTypes = {
//     classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(BlockCard);
