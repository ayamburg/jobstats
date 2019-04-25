import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import axios from 'axios'

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  toolbar: theme.mixins.toolbar,
});

function createList() {
  const rc = this;
  let list = [];
  for (let i = 0; i < rc.props.keys.length; i++) {
      let file_path = "/static/images/" + rc.props.keys[i] + "-icon.png";
      let listItem =
          <div key={i}>
              <TopTenItem
                  alt={(i + 1).toString()}
                  src={file_path}
                  primary={rc.props.keys[i]}
              />
              <Divider/>
          </div>;
      list.push(listItem);
  }

  return list;
}

function GenerateButtons(props) {
    axios.get('/api/get_json_file', {
      responseType: 'json',
      params: {
          category: "location_data",
          name: 'col',
      }
  }).then(response => {
      console.log(response)
  });

  for (let i = 0; i < rc.props.keys.length; i++) {
    
  }

}

class ClippedDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
      city_names: [],
    }
  }

  componentDidMount() {
    axios.get('/api/get_json_file', {
        responseType: 'json',
        params: {
            category: "location_data",
            name: 'col',
        }
    }).then(response => {
        //console.log(response)
        //let new_state = this.state;
        console.log(response.data.dataSet);
        //new_state.cities = response.data.dataSet;

        let citynames = [];
        for(var city in response.data.dataSet) {
          console.log(city);
          citynames.push(city.City)
        }

        this.setState({
          cities: response.data.dataSet,
          city_names: citynames,
        })

    });
  }

  render() {
    //console.log(this.state.cities);
    //console.log(this.state.city_names);
    const classes = this.props;
    let city_names = [];
    return (
      <div className={classes.root}>
        <CssBaseline />
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.toolbar} />
          <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
        </main>
      </div>
    );
  }
  
}

ClippedDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClippedDrawer);