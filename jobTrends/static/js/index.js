import React from 'react'
import ReactDOM from 'react-dom'
// import GraphForm from './frontend.js';
import Home from './home.js';

const App = () => (
    <div>
        <Home/>
        {/* <GraphForm data={window.props}/> */}
    </div>
);


ReactDOM.render(
    <App/>,
    window.react_mount,
);