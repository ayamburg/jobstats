//ListItem produces one entry for a top ten list

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
//import 'typeface-roboto';
//import classes from '*.module.css';


const styles = {
    avatar: {
      margin: 10,
    },
    bigAvatar: {
      margin: 10,
      width: 80,
      height: 80,
    },
};
  
  

class TopTenItem extends React.Component {
    //state = {}
    constructor(props) {
      super(props);
      this.state = {};
    }

    render() {
        //const bull = <span className={classes.bullet}>•</span>;
        const li = this;

        return (
        <ListItem alignItems="flex-start">
            <Typography variant="h4" gutterBottom>
              {li.props.alt}
            </Typography>
            <ListItemText
              primary={
                <Typography variant="h3" align="center" gutterBottom>
                  {li.props.primary}
                </Typography>
              }
            />
            <ListItemAvatar>
              <Avatar alt={li.props.alt} src={li.props.src} className={styles.bigAvatar} onError={(e) => e.target.src="/static/images/default-icon.svg"} />
            </ListItemAvatar>
        </ListItem>
        )
    }
}

export default TopTenItem;
