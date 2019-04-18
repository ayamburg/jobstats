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
import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile,
    isMobileOnly
  } from "react-device-detect";

const styles = {
    root: {
      flexGrow: 1,
      top: 0,
      background: 'linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)',
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
                <AppBar position="static" style={{background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'}}>
                    <Toolbar>
                            <Link to="/" style={{ textDecoration: 'none' }}>
                                <IconButton
                                    className={this.props.menuButton}  
                                >
                                <HomeIcon style={{color: '#424242'}}/>
                                </IconButton>
                            </Link>
                    </Toolbar>
                </AppBar>
                <Typography paragraph></Typography>
            </div>
        );
    }

    render() {
        let initial_data_component = "bar_graph"
        if (isMobileOnly) {
            initial_data_component = "list"
        }
        return (
            <Router>
                <div>
                    {this.createAppBar()}
                    <Switch>
                        <Route exact path="/" component={TileCardGrid}/>

                        <Route
                            path="/amazon" 
                            render={
                                (props) =>
                                    <GraphForm
                                        {...props}
                                        filters={[]}
                                        period={"week"}
                                        age={"all_time"}
                                        raw_bool={false}
                                        locations={""}
                                        companies={"amazon.com"}
                                        titles={""}
                                        data_component={initial_data_component}
                                        name={"amazon"}
                                        title={"Top Skills for Amazon"}
                                    />
                            }
                        />

                        <Route
                            path="/apple" 
                            render={
                                (props) =>
                                    <GraphForm
                                        {...props}
                                        filters={[]}
                                        period={"week"}
                                        age={"all_time"}
                                        raw_bool={false}
                                        locations={""}
                                        companies={"apple"}
                                        titles={""}
                                        data_component={initial_data_component}
                                        name={"apple"}
                                        title={"Top Skills for Apple"}
                                    />
                            }
                        />

                        <Route
                            path="/google" 
                            render={
                                (props) =>
                                    <GraphForm
                                        {...props}
                                        filters={[]}
                                        period={"week"}
                                        age={"all_time"}
                                        raw_bool={false}
                                        locations={""}
                                        companies={"google"}
                                        titles={""}
                                        data_component={initial_data_component}
                                        name={"google"}
                                        title={"Top Skills for Google"}
                                    />
                            }
                        />

                        <Route
                            path="/microsoft" 
                            render={
                                (props) =>
                                    <GraphForm
                                        {...props}
                                        filters={[]}
                                        period={"week"}
                                        age={"all_time"}
                                        raw_bool={false}
                                        locations={""}
                                        companies={"microsoft"}
                                        titles={""}
                                        data_component={initial_data_component}
                                        name={"microsoft"}
                                        title={"Top Skills for Microsoft"}
                                    />
                            }
                        />

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
                                        data_component={initial_data_component}
                                        name={"frontend"}
                                        title={"Top Front End Skills"}
                                    />
                            }
                        />

                        <Route
                            path="/backend" 
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
                                        titles={["backend", "back end"]}
                                        data_component={initial_data_component}
                                        name={"backend"}
                                        title={"Top Back End Skills"}
                                    />
                            }
                        />

                        <Route
                            path="/fullstack" 
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
                                        titles={["fullstack", "full stack"]}
                                        data_component={initial_data_component}
                                        name={"fullstack"}
                                        title={"Top Full Stack Skills"}
                                    />
                            }
                        />

                        <Route
                            path="/cybersecurity" 
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
                                        titles={['cyber security', 'malware', 'infosec', 'security', 'penetration', 'pen tester']}
                                        data_component={initial_data_component}
                                        name={"cybersecurity"}
                                        title={"Top Cyber Security Skills"}
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

