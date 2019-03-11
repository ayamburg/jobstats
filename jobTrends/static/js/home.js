import React from 'react'
import ReactDOM from 'react-dom'
import GraphForm from './GraphForm.js';
import ManualGraphForm from './ManualGraphForm.js';
import {BrowserRouter as Router, Link} from "react-router-dom";
import { Switch, Route } from 'react-router'
import TileCardGrid from './TileCardGrid.js';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';

const styles = {
    root: {
      flexGrow: 1,
      top: 0,
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
};

class Home extends React.Component {
    //state = {};
    constructor(props) {
        super(props);
        this.state = {};
        this.createAppBar.bind(this);
    }

    createAppBar() {
        return (
            <div className={this.props.root}>
                <AppBar position="static">
                    <Toolbar>
                            <Link to="/" style={{ textDecoration: 'none' }}>
                                <IconButton 
                                    className={this.props.menuButton} 
                                    color="inherit" 
                                >
                                <HomeIcon />
                                </IconButton>
                            </Link>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }

    render() {
        return (
            <Router>
                <div>
                    {this.createAppBar()}
                    <Switch>
                        <Route exact path="/" component={TileCardGrid}/>
                        <Route
                            path="/frontend" 
                            render={
                                (props) =>
                                    <GraphForm
                                        {...props}
                                        filters={[]}
                                        period={"week"}
                                        age={"all_time"}
                                        raw_bool={false}
                                        locations={""}
                                        companies={""}
                                        titles={["frontend", "front end"]}
                                        data_component={"bar_graph"}
                                        name={"frontend"}
                                        title={"Top Frontend Skills"}
                                    />
                            }
                        />
                        <Route
                            path="/manual"
                            component={ManualGraphForm}
                        />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default Home;

