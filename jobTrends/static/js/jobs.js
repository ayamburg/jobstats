import React from 'react'
import ReactDOM from 'react-dom'
import TrendGraph from './trend_graph.js'

class MLTrendGraph extends React.Component {
    render() {
        return <TrendGraph data={window.props}/>;
    }
}

const App = () => (
    <div>
        <nav>
            <a href="/">Jobs</a>
        </nav>
        <MLTrendGraph/>
    </div>
);


ReactDOM.render(
    <App/>,
    window.react_mount
);
