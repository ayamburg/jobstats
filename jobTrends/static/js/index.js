import React from 'react'
import ReactDOM from 'react-dom'

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


ReactDOM.render(
    <Test/>,
    window.react_mount,
);
