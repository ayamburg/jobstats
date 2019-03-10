import React from 'react'
import ReactDOM from 'react-dom'
import FrontendGraphForm from './frontend.js';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Switch } from 'react-router'
import TileCardGrid from './TileCardGrid.js';

class Home extends React.Component {
    //state = {};
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Router>
                <div>
                    <nav>
                        <Link to="/frontend">Top Frontend Skills</Link>
                    </nav>
                    <Switch>
                        <Route path="/frontend" component={FrontendGraphForm}/>
                        <Route path="/" component={TileCardGrid}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default Home;

