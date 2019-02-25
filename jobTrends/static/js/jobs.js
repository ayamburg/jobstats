import React from 'react'
import ReactDOM from 'react-dom'
import TrendGraph from './trend_graph.js'
import BlockCard from './BlockCard';
import RankedList from './RankedList';

const App = () => (
    <div>
        <div>
            <h1>test</h1>
        </div>
        <div>
        <BlockCard payload={
            <RankedList
                keys={[
                    "Python",
                    "Java",
                    "C++",
                    "Scrum",
                    "JavaScript",
                    "Golang",
                ]}
            />
        }/>
        </div>
        <nav>
            <a href="/">Index</a>
        </nav>
        <TrendGraph data={window.props}/>
    </div>
);


ReactDOM.render(
    <App/>,
    window.react_mount
);
