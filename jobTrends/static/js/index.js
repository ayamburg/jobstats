import React from 'react'
import ReactDOM from 'react-dom'
import TrendGraph from './trend_graph.js'

class Test extends React.Component {
    render() {
        var list = window.props;
        return <div>{list.map(item => <TestChild key={item.pk}
                                                 job={item.title}/>)}</div>;
    }
}

class TestChild extends React.Component {
    render() {
        return <li><b>{this.props.job}</b></li>;
    }
}

class MLTrendGraph extends React.Component {
    render() {
        return <TrendGraph x={window.props}
                           y={window.props}/>;
    }
}

ReactDOM.render(
    <MLTrendGraph />,
    window.react_mount,
);
