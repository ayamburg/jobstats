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

const drawerWidth = '100%';
const drawerHeight = '100%';

// const styles = theme => ({
//   root: {
//     width: drawerWidth,
//     height: drawerHeight,
//     display: 'flex',
//   },
//   appBar: {
//     zIndex: theme.zIndex.drawer + 1,
//   },
//   drawer: {
//     width: drawerWidth,
//     height: drawerHeight,
//     flexShrink: 0,
//   },
//   drawerPaper: {
//     width: drawerWidth,
//     height: drawerHeight,
//   },
//   content: {
//     flexGrow: 1,
//     padding: theme.spacing.unit * 3,
//   },
//   toolbar: theme.mixins.toolbar,
// });

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

class ClippedDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
      city_names: [],
    }
  }

  // componentDidMount() {
  //   axios.get('/api/get_json_file', {
  //       responseType: 'json',
  //       params: {
  //           category: "location_data",
  //           name: 'col',
  //       }
  //   }).then(response => {
  //       //console.log(response)
  //       //let new_state = this.state;
  //       //console.log(response.data);
  //       //new_state.cities = response.data.dataSet;

  //       let citynames = [];
  //       for(var city in response.data) {
  //         //console.log(city);
  //         citynames.push(city);
  //       }
  //       //console.log(citynames);

  //       this.setState({
  //         cities: response.data,
  //         city_names: citynames,
  //       })
  //   });
  // }

  render() {
    //console.log(this.state.cities);
    //console.log(this.state.city_names);
    const style = {

    }
    const classes = this.props;
    //let city_names = [];
    return (
      <List width="25%">
        {this.props.citynames.map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
     </List>
    );
  }
  
}

ClippedDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default ClippedDrawer;