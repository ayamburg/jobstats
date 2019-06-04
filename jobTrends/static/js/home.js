// adds the navbar and react router routing

import React from 'react'
import axios from 'axios'
import GraphForm from './GraphForm.js';
import ManualGraph from './ManualGraph.js';
import CustomGraphForm from './CustomGraphForm.js';
import CustomGraph from './CustomGraph.js';
import EditForm from './EditForm.js';
import {BrowserRouter as Router, Link} from "react-router-dom";
import {Switch, Route} from 'react-router'
import TileCardGrid from './TileCardGrid.js';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import MapAndSideBarContainer from './MapAndSideBarContainer.js';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile,
    isMobileOnly
} from "react-device-detect";

//import citynames from './citynames.js';
import Grid from "./TileCardGrid";

const citynames = [
    "Mountain View, CA",
    "Cupertino, CA",
    "Palo Alto, CA",
    "Sunnyvale, CA",
    "Charlotte, NC",
    "Tulsa, OK",
    "Milwaukee, WI",
    "Madison, WI",
    "Seattle, WA",
    "San Antonio, TX",
    "Cincinnati, OH",
    "New York, NY",
    "Raleigh, NC",
    "Jacksonville, FL",
    "Baltimore, MD",
    "Indianapolis, IN",
    "Rochester, NY",
    "Richmond, VA",
    "Minneapolis, MN",
    "St. Louis, MO",
    "Sacramento, CA",
    "San Diego, CA",
    "Knoxville, TN",
    "Dallas, TX",
    "Tampa, FL",
    "Reno, NV",
    "Pittsburgh, PA",
    "Nashville, TN",
    "Salt Lake City, UT",
    "Albany, NY",
    "Atlanta, GA",
    "Kansas City, MO",
    "Oakland, CA",
    "Los Angeles, CA",
    "Austin, TX",
    "Tucson, AZ",
    "San Jose, CA",
    "San Francisco, CA",
    "Miami, FL",
    "Boston, MA",
    "Columbus, OH",
    "Philadelphia, PA",
    "Memphis, TN",
    "Louisville, KY",
    "Brooklyn, NY",
    "Las Vegas, CA",
    "Denver, CO",
    "Washington, DC",
    "Albuquerque, NM",
    "Phoenix, AZ",
    "Detroit, MI",
    "Bellingham, WA",
    "Chicago, IL",
    "Fort Worth, TX",
    "Fresno, CA",
    "Boise, ID",
    "Bakersfield, CA",
    "Little Rock, AR",
    "Portland, OR",
    "Buffalo, NY",
    "Cleveland, OH",
    "Houston, TX",
    "Orlando, FL",
]

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
        this.state = {
            signed_in: false,
            user_name: '',
            custom_tiles: [],
            menuAnchorEl: null
        };
        this.createAppBar = this.createAppBar.bind(this);
        this.handleMenuClose = this.handleMenuClose.bind(this);
        this.handleMenuOpen = this.handleMenuOpen.bind(this);
        this.handleSignOut = this.handleSignOut.bind(this);
    }

    componentDidMount() {
        axios.get('user_info', {
            responseType: 'json'
        }).then(response => {
            if (response.data.signed_in) {
                this.setState({signed_in: true, user_name: response.data.first + ' ' + response.data.last});
            } else {

            }
        });

        axios.get('custom_tiles', {
            responseType: 'json'
        }).then(response => {
            this.setState({custom_tiles: response.data.custom_tiles});
        });
    }

    loadCustomTileRoutes() {
        let custom_tiles = this.state.custom_tiles;
        let custom_tile_cards = [];

        let initial_data_component = "bar_graph";
        if (isMobileOnly) {
            initial_data_component = "list"
        }

        for (let i = 0; i < custom_tiles.length; i++) {
            let path = "/" + custom_tiles[i].name;
            custom_tile_cards.push(
                <Route
                    key={i}
                    path={path + '/edit'}
                    render={
                        (props) =>
                            <EditForm
                                {...props}
                                filters={custom_tiles[i].filters}
                                locations={custom_tiles[i].locations}
                                companies={custom_tiles[i].companies}
                                titles={custom_tiles[i].titles}
                                whitelists={custom_tiles[i].whitelists}
                                blacklists={custom_tiles[i].blacklists}
                                name={custom_tiles[i].name}
                                title={custom_tiles[i].title}
                            />
                    }
                />
            );
            custom_tile_cards.push(
                <Route
                    key={i}
                    path={path}
                    render={
                        (props) =>
                            <CustomGraph
                                {...props}
                                filters={custom_tiles[i].filters}
                                period={"week"}
                                age={"past_six_months"}
                                raw_bool={false}
                                locations={custom_tiles[i].locations}
                                companies={custom_tiles[i].companies}
                                titles={custom_tiles[i].titles}
                                data_component={initial_data_component}
                                name={custom_tiles[i].name}
                                title={custom_tiles[i].title}
                            />
                    }
                />
            )
        }
        return custom_tile_cards;
    }

    handleMenuClose() {
        this.setState({menuAnchorEl: null})
    }

    handleSignOut() {
        axios.post('logout', {
            responseType: 'json'
        }).then(response => {
            window.location.reload();
            this.setState({menuAnchorEl: null})
        });
    }

    handleMenuOpen(event) {
        this.setState({menuAnchorEl: event.currentTarget})
    };

    createSignIn() {
        if (this.state.signed_in) {
            return (
                <div align="right">
                    <Button
                        aria-haspopup="true"
                        onClick={this.handleMenuOpen}

                    >
                        <Typography variant="BUTTONTEXT"
                                    style={{color: "#ffffff"}}>{this.state.user_name}{this.state.menuAnchorEl ?
                            <ArrowDropUp/> : <ArrowDropDown/>}</Typography>
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={this.state.menuAnchorEl}
                        open={Boolean(this.state.menuAnchorEl)}
                        onClose={this.handleMenuClose}
                        anchorOrigin={{horizontal: 'right'}}
                    >
                        <MenuItem onClick={this.handleSignOut}>Sign Out</MenuItem>
                    </Menu>
                </div>
            );
        } else {
            if (isMobileOnly){
                return (
                    <div align="right">
                        <a href="/accounts/linkedin_oauth2/login/?process=login">
                            <img src="/static/images/signin-buttonMobile.png"/>
                        </a>
                    </div>
                );
            }
            else{
                return (
                    <div align="right">
                        <a href="/accounts/linkedin_oauth2/login/?process=login">
                            <img src="/static/images/signin-button.png"/>
                        </a>
                    </div>
                );
            }
        }
    }

    createAppBar() {
        return (
            <div className={this.props.root}>
                <AppBar position="static" style={{background: 'linear-gradient(45deg, #696969 30%, #708090 90%)'}}>
                    <Toolbar>
                        <Link to="/" style={{textDecoration: 'none'}}>
                            <IconButton
                                className={this.props.menuButton}
                            >
                                <HomeIcon style={{color: '#fffafa'}}/>
                            </IconButton>
                        </Link>
                        <Link to="/map" style={{textDecoration: 'none'}}>
                            <Button>
                                <Typography variant="BUTTONTEXT" style={{color: "#ffffff"}}>Map</Typography>
                            </Button>
                        </Link>
                        <Link to="/sandbox" style={{textDecoration: 'none'}}>
                            <Button>
                                <Typography variant="BUTTONTEXT" style={{color: "#ffffff"}}>Sandbox</Typography>
                            </Button>
                        </Link>
                        <Link to="/about" style={{textDecoration: 'none'}}>
                            <Button>
                                <Typography variant="BUTTONTEXT" style={{color: "#ffffff"}}>About</Typography>
                            </Button>
                        </Link>
                        <div style={{flex: 1}}>{this.createSignIn()}</div>
                    </Toolbar>
                </AppBar>
                <Typography paragraph></Typography>
            </div>
        );
    }

    render() {
        const listStyle = {
            overflow: 'auto',
            height: '90vh',
            float: 'left',
        }
        const style = {
            display: 'flex',
            flexDirection: 'row',
            width: '90vw',
            height: '90vh',
            float: 'none',
            margin: '0 auto',
        }
        const mapStyle = {
            float: 'left',
            width: '90vw',
            height: '90vh',
        }
        const innerMapStyle = {
            width: '90vw',
            height: '90vh',
        }
        const MapAndSideBarStyle = {
            float: 'none',
            margin: '0 auto',
        }
        let initial_data_component = "bar_graph";
        if (isMobileOnly) {
            initial_data_component = "list"
        }
        return (
            <Router>
                <div>
                    {this.createAppBar()}
                    <Switch>
                        <Route exact path="/"
                               render={
                                   (props) =>
                                        <TileCardGrid
                                            {...props}
                                            signed_in={this.state.signed_in}
                                            custom_tiles={this.state.custom_tiles}
                                        />
                               }
                        />

                        <Route exact path="/map"
                               render={
                                   (props) =>
                                       <div style={MapAndSideBarStyle}>
                                           <MapAndSideBarContainer
                                               {...props}
                                               style_prop={style}
                                               list_style_prop={listStyle}
                                               map_style_prop={mapStyle}
                                               inner_map_style_prop={innerMapStyle}
                                               Top_locations_filters={[]}
                                               Top_locations_companies={[]}
                                               Top_locations_titles={[]}
                                           />
                                       </div>
                               }
                        />

                        <Route
                            path="/amazon"
                            render={
                                (props) =>
                                    <GraphForm
                                        {...props}
                                        filters={[]}
                                        period={"week"}
                                        age={"past_six_months"}
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
                                        age={"past_six_months"}
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
                                        age={"past_six_months"}
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
                                        age={"past_six_months"}
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
                                        age={"past_six_months"}
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
                                        age={"past_six_months"}
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
                                        age={"past_six_months"}
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
                                        age={"past_six_months"}
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

                        {/*generate Location tiles routes*/}
                        {citynames.map((cityname, index) => (
                            <Route path={"/" + cityname.replace(/\W/g, '')}
                                   key={index}
                                   render={
                                       (props) =>
                                           <GraphForm
                                               {...props}
                                               filters={[]}
                                               period={"week"}
                                               age={"past_six_months"}
                                               raw_bool={false}
                                               locations={cityname}
                                               companies={""}
                                               titles={""}
                                               data_component={initial_data_component}
                                               name={cityname.replace(/\W/g, '')}
                                               title={cityname}
                                           />
                                   }
                            />
                        ))}

                        <Route
                            path="/oakland"
                            render={
                                (props) =>
                                    <GraphForm
                                        {...props}
                                        filters={[]}
                                        period={"week"}
                                        age={"past_six_months"}
                                        raw_bool={false}
                                        locations={"oakland"}
                                        companies={""}
                                        titles={""}
                                        data_component={initial_data_component}
                                        name={"oakland"}
                                        title={"Oakland, CA"}
                                    />
                            }
                        />

                        <Route
                            path="/custom"
                            component={CustomGraphForm}
                        />

                        <Route
                            path="/sandbox"
                            component={ManualGraph}
                        />

                        <Route
                            path="/about"
                            component={AboutPage}
                        />

                        {this.loadCustomTileRoutes()}
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default Home;

