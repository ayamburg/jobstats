import React from 'react'
import ReactDOM from 'react-dom'
import FrontendGraphForm from './frontend.js';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

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
                        <Link to="/frontend">Jobs</Link>
                    </nav>
                    <Route path="/frontend" component={FrontendGraphForm}/>
                </div>
            </Router>
        );
    }
}

export default Home;

