import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
//import classes from '*.module.css';


const styles = {
    avatar: {
      margin: 10,
    },
    bigAvatar: {
      margin: 10,
      width: 60,
      height: 60,
    },
};
  
  

class TopTenItem extends React.Component {
    //state = {}
    constructor() {
      super(props);
      this.state = {};
    }

    render() {
        //const bull = <span className={classes.bullet}>•</span>;
        const li = this;

        return (
        <ListItem alignItems="flex-start">
            <h2>
              {li.props.alt}
            </h2>
            <ListItemText
              primary={li.props.primary}
            />
            <ListItemAvatar>
              <Avatar alt={li.props.alt} src={li.props.src} className={styles.bigAvatar} />
            </ListItemAvatar>
        </ListItem>
        )
    }
}

export default TopTenItem;