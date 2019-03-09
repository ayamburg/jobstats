import React from 'react'
import ReactDOM from 'react-dom'
import GraphForm from './frontend.js';
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
                        <Link to="/frontend">Top Frontend Skills</Link>
                    </nav>
                    <Route
                        path="/frontend"
                        render={
                            (props) =>
                                <GraphForm
                                    {...props}
                                    keywords={[]}
                                    filters={[]}
                                    period={"week"}
                                    age={"all_time"}
                                    raw_bool={false}
                                    locations={""}
                                    companies={""}
                                    titles={["frontend", "front end"]}
                                    data_component={"trend_chart"}
                                    name={"frontend"}
                                    title={"Top Frontend Skills"}
                                />
                        }
                    />
                </div>
            </Router>
        );
    }
}

export default Home;

