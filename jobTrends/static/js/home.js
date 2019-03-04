import React from 'react'
import ReactDOM from 'react-dom'
import GraphForm from './jobs.js';
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
                        <Link to="/jobs">Jobs</Link>
                    </nav>
                    <Route path="/jobs" component={GraphForm}/>
                </div>
            </Router>
        );
    }
}

export default Home;

